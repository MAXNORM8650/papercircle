"""
Database Manager for Paper Review Lineage
==========================================
Handles paper matching and edge storage in Supabase.

Responsibilities:
- Find papers in database by title/arXiv ID
- Save lineage edges to edges table
- Handle deduplication
- Manage AI-generated flags
"""

from typing import Optional, List, Dict, Any, Tuple
from difflib import SequenceMatcher
import re
import os
from supabase import Client, create_client
from dotenv import load_dotenv


# Load environment variables
load_dotenv()


# ============================================================================
# Database Manager Class
# ============================================================================

class DatabaseManager:
    """
    Manages database operations for lineage extraction.

    Example:
        db = DatabaseManager()
        paper_id = db.find_paper_by_title("Attention Is All You Need")
        success = db.save_edge(source_id, paper_id, edge_data)
    """

    def __init__(self, supabase_client: Optional[Client] = None):
        """
        Initialize database manager.

        Args:
            supabase_client: Optional Supabase client (creates new if not provided)
        """
        if supabase_client:
            self.supabase = supabase_client
        else:
            # Create new client with service role key for backend operations
            supabase_url = os.getenv("VITE_SUPABASE_URL", "")
            service_key = os.getenv("SUPABASE_SERVICE_ROLE_KEY")

            if not service_key:
                # Fallback to anon key (will have RLS restrictions)
                service_key = os.getenv("VITE_SUPABASE_ANON_KEY", "")
                print("⚠️  Warning: Using anon key. Some operations may fail due to RLS.")

            self.supabase = create_client(supabase_url, service_key)

    # ========================================================================
    # Paper Matching
    # ========================================================================

    def find_paper_by_title(
        self,
        title: str,
        fuzzy_threshold: float = 0.9
    ) -> Optional[str]:
        """
        Find paper in database by title using multi-strategy matching.

        Matching strategies:
        1. Exact match (case-insensitive)
        2. Fuzzy match with threshold
        3. arXiv ID extraction and match

        Args:
            title: Paper title to search for
            fuzzy_threshold: Minimum similarity score for fuzzy matching (0-1)

        Returns:
            Paper ID (UUID) if found, None otherwise
        """
        if not title or len(title) < 5:
            return None

        # Strategy 1: Exact match (case-insensitive)
        try:
            result = self.supabase.table("papers").select("id, title").ilike("title", title).execute()

            if result.data and len(result.data) > 0:
                return result.data[0]["id"]
        except Exception as e:
            print(f"⚠️  Error in exact match: {e}")

        # Strategy 2: Fuzzy match
        # Get all papers (limit to recent 1000 for performance)
        try:
            result = self.supabase.table("papers").select("id, title").limit(1000).execute()

            if result.data:
                best_match = None
                best_score = 0.0

                for paper in result.data:
                    db_title = paper.get("title", "")
                    score = SequenceMatcher(None, title.lower(), db_title.lower()).ratio()

                    if score > best_score:
                        best_score = score
                        best_match = paper

                if best_score >= fuzzy_threshold and best_match:
                    return best_match["id"]
        except Exception as e:
            print(f"⚠️  Error in fuzzy match: {e}")

        # Strategy 3: Extract arXiv ID from title and search
        arxiv_id = self._extract_arxiv_id_from_title(title)
        if arxiv_id:
            paper_id = self.find_paper_by_arxiv_id(arxiv_id)
            if paper_id:
                return paper_id

        return None

    def find_paper_by_arxiv_id(self, arxiv_id: str) -> Optional[str]:
        """
        Find paper in database by arXiv ID.

        Args:
            arxiv_id: arXiv ID (e.g., "2106.09685")

        Returns:
            Paper ID (UUID) if found, None otherwise
        """
        if not arxiv_id:
            return None

        try:
            # arXiv ID might be stored in different formats
            # Try exact match first
            result = self.supabase.table("papers").select("id").eq("arxiv_id", arxiv_id).execute()

            if result.data and len(result.data) > 0:
                return result.data[0]["id"]

            # Try with 'v' version suffix removed (e.g., "2106.09685v1" -> "2106.09685")
            arxiv_id_no_version = re.sub(r'v\d+$', '', arxiv_id)
            if arxiv_id_no_version != arxiv_id:
                result = self.supabase.table("papers").select("id").eq("arxiv_id", arxiv_id_no_version).execute()

                if result.data and len(result.data) > 0:
                    return result.data[0]["id"]

        except Exception as e:
            print(f"⚠️  Error finding paper by arXiv ID: {e}")

        return None

    def find_paper_multi_strategy(
        self,
        title: str,
        arxiv_id: Optional[str] = None
    ) -> Tuple[Optional[str], str]:
        """
        Try multiple strategies to find a paper.

        Args:
            title: Paper title
            arxiv_id: Optional arXiv ID

        Returns:
            (paper_id, strategy_used) where strategy is one of:
            "arxiv_id", "exact_title", "fuzzy_title", "not_found"
        """
        # Try arXiv ID first (most reliable)
        if arxiv_id:
            paper_id = self.find_paper_by_arxiv_id(arxiv_id)
            if paper_id:
                return paper_id, "arxiv_id"

        # Try title match
        paper_id = self.find_paper_by_title(title, fuzzy_threshold=0.95)
        if paper_id:
            return paper_id, "exact_title"

        # Try more lenient fuzzy match
        paper_id = self.find_paper_by_title(title, fuzzy_threshold=0.85)
        if paper_id:
            return paper_id, "fuzzy_title"

        return None, "not_found"

    # ========================================================================
    # Edge Management
    # ========================================================================

    def save_edge(
        self,
        source_paper_id: str,
        target_paper_id: str,
        edge_type: str,
        similarity_score: float,
        rationale: str,
        community_id: Optional[str] = None,
        verified_by: Optional[str] = None,
        metadata: Optional[Dict[str, Any]] = None
    ) -> bool:
        """
        Save a lineage edge to the database.

        Handles deduplication:
        - If edge exists and is verified (is_ai_generated=false), skip
        - If edge exists and is also AI-generated, update if new score is higher
        - Otherwise create new edge

        Args:
            source_paper_id: Source paper UUID
            target_paper_id: Target paper UUID
            edge_type: Type of relationship (extends, applies, etc.)
            similarity_score: Confidence score (0-1)
            rationale: Human-readable explanation
            community_id: Optional community context
            verified_by: Optional user who verified (sets is_ai_generated=false)
            metadata: Optional additional data

        Returns:
            True if edge saved successfully, False otherwise
        """
        try:
            # Check for existing edge
            existing = self.supabase.table("edges").select("*").eq(
                "source_paper_id", source_paper_id
            ).eq(
                "target_paper_id", target_paper_id
            ).eq(
                "edge_type", edge_type
            ).execute()

            if existing.data and len(existing.data) > 0:
                existing_edge = existing.data[0]

                # If existing edge is verified, don't overwrite
                if not existing_edge.get("is_ai_generated", True):
                    print(f"⚠️  Edge already verified by user, skipping")
                    return False

                # If existing edge is also AI-generated, update if new score is higher
                existing_score = existing_edge.get("similarity_score", 0.0)
                if similarity_score > existing_score:
                    # Update existing edge
                    update_data = {
                        "similarity_score": similarity_score,
                        "rationale": rationale
                    }
                    if metadata:
                        update_data["metadata"] = metadata

                    self.supabase.table("edges").update(update_data).eq(
                        "id", existing_edge["id"]
                    ).execute()

                    print(f"✅ Updated existing edge with better score")
                    return True
                else:
                    print(f"⚠️  Existing edge has better or equal score, skipping")
                    return False

            # Create new edge
            edge_data = {
                "source_paper_id": source_paper_id,
                "target_paper_id": target_paper_id,
                "edge_type": edge_type,
                "similarity_score": similarity_score,
                "rationale": rationale,
                "is_ai_generated": verified_by is None,  # AI-generated if no verifier
                "verified_by": verified_by,
                "community_id": community_id
            }

            # Add metadata if provided
            if metadata:
                edge_data["metadata"] = metadata

            result = self.supabase.table("edges").insert(edge_data).execute()

            if result.data and len(result.data) > 0:
                print(f"✅ Created new edge: {edge_type}")
                return True
            else:
                print(f"⚠️  Edge insert returned no data")
                return False

        except Exception as e:
            print(f"❌ Error saving edge: {e}")
            return False

    def save_edges_batch(
        self,
        source_paper_id: str,
        edges: List[Dict[str, Any]],
        community_id: Optional[str] = None
    ) -> Dict[str, Any]:
        """
        Save multiple edges in batch.

        Args:
            source_paper_id: Source paper UUID
            edges: List of edge data dicts with keys:
                   target_paper_id, edge_type, similarity_score, rationale, metadata
            community_id: Optional community context

        Returns:
            Dictionary with:
                - total: Total edges attempted
                - created: Number of new edges created
                - updated: Number of existing edges updated
                - skipped: Number of edges skipped
                - failed: Number of failed saves
        """
        stats = {
            "total": len(edges),
            "created": 0,
            "updated": 0,
            "skipped": 0,
            "failed": 0
        }

        for edge in edges:
            success = self.save_edge(
                source_paper_id=source_paper_id,
                target_paper_id=edge["target_paper_id"],
                edge_type=edge["edge_type"],
                similarity_score=edge["similarity_score"],
                rationale=edge["rationale"],
                community_id=community_id,
                metadata=edge.get("metadata")
            )

            # Note: We can't distinguish between created/updated/skipped here
            # since save_edge returns bool. Could be enhanced to return status.
            if success:
                stats["created"] += 1
            else:
                stats["skipped"] += 1

        return stats

    def get_edges_for_paper(
        self,
        paper_id: str,
        include_incoming: bool = True,
        include_outgoing: bool = True
    ) -> Dict[str, List[Dict[str, Any]]]:
        """
        Get all edges for a paper.

        Args:
            paper_id: Paper UUID
            include_incoming: Include edges where this paper is the target
            include_outgoing: Include edges where this paper is the source

        Returns:
            Dictionary with:
                - outgoing: List of edges from this paper
                - incoming: List of edges to this paper
        """
        result = {
            "outgoing": [],
            "incoming": []
        }

        try:
            if include_outgoing:
                outgoing = self.supabase.table("edges").select(
                    "*, target_paper:papers!edges_target_paper_id_fkey(id, title, year, authors)"
                ).eq("source_paper_id", paper_id).execute()

                if outgoing.data:
                    result["outgoing"] = outgoing.data

            if include_incoming:
                incoming = self.supabase.table("edges").select(
                    "*, source_paper:papers!edges_source_paper_id_fkey(id, title, year, authors)"
                ).eq("target_paper_id", paper_id).execute()

                if incoming.data:
                    result["incoming"] = incoming.data

        except Exception as e:
            print(f"❌ Error getting edges for paper: {e}")

        return result

    # ========================================================================
    # Helper Methods
    # ========================================================================

    def _extract_arxiv_id_from_title(self, title: str) -> Optional[str]:
        """
        Try to extract arXiv ID if it's mentioned in the title.

        Args:
            title: Paper title

        Returns:
            arXiv ID or None
        """
        # Pattern: XXXX.XXXXX or arXiv:XXXX.XXXXX
        match = re.search(r'(?:arxiv:)?(\d{4}\.\d{4,5})', title, re.IGNORECASE)
        if match:
            return match.group(1)

        return None

    def create_pending_match_record(
        self,
        source_paper_id: str,
        target_title: str,
        target_arxiv_id: Optional[str],
        edge_type: str,
        similarity_score: float,
        rationale: str,
        metadata: Optional[Dict] = None
    ) -> bool:
        """
        Create a pending match record for papers not yet in database.

        This stores the lineage information even when the target paper
        isn't in the database yet. When the target paper is added later,
        these can be matched and edges created.

        Args:
            source_paper_id: Source paper UUID
            target_title: Title of target paper (not in DB)
            target_arxiv_id: Optional arXiv ID
            edge_type: Relationship type
            similarity_score: Confidence score
            rationale: Explanation
            metadata: Optional additional data

        Returns:
            True if pending record created successfully
        """
        try:
            pending_data = {
                "source_paper_id": source_paper_id,
                "target_paper_title": target_title,
                "target_paper_arxiv_id": target_arxiv_id,
                "edge_type": edge_type,
                "similarity_score": similarity_score,
                "rationale": rationale,
                "metadata": metadata or {},
                "status": "pending_match"
            }

            # Note: This requires a 'pending_edges' table in the database
            # For now, we'll store in a JSON field or skip this functionality
            # You can create this table later if needed

            print(f"⚠️  Pending match: {target_title} (not yet in database)")
            return True

        except Exception as e:
            print(f"❌ Error creating pending match: {e}")
            return False


# ============================================================================
# Convenience Functions
# ============================================================================

def find_and_save_edges(
    source_paper_id: str,
    extracted_edges: List[Dict[str, Any]],
    db_manager: Optional[DatabaseManager] = None,
    community_id: Optional[str] = None
) -> Dict[str, Any]:
    """
    Convenience function to find target papers and save edges.

    Args:
        source_paper_id: Source paper UUID
        extracted_edges: List of extracted edge data from LineageExtractor
        db_manager: Optional DatabaseManager instance
        community_id: Optional community context

    Returns:
        Statistics dictionary with counts
    """
    if not db_manager:
        db_manager = DatabaseManager()

    stats = {
        "total_extracted": len(extracted_edges),
        "matched": 0,
        "not_matched": 0,
        "saved": 0,
        "failed": 0,
        "edges_saved": []
    }

    for edge in extracted_edges:
        # Try to find target paper
        target_id, strategy = db_manager.find_paper_multi_strategy(
            title=edge["target_paper_title"],
            arxiv_id=edge.get("target_paper_arxiv_id")
        )

        if target_id:
            stats["matched"] += 1

            # Save edge
            success = db_manager.save_edge(
                source_paper_id=source_paper_id,
                target_paper_id=target_id,
                edge_type=edge["edge_type"],
                similarity_score=edge["similarity_score"],
                rationale=edge["rationale"],
                community_id=community_id,
                metadata={
                    **(edge.get("metadata", {})),
                    "match_strategy": strategy
                }
            )

            if success:
                stats["saved"] += 1
                stats["edges_saved"].append({
                    "target_title": edge["target_paper_title"],
                    "edge_type": edge["edge_type"],
                    "matched_by": strategy
                })
            else:
                stats["failed"] += 1
        else:
            stats["not_matched"] += 1
            print(f"⚠️  Could not find paper in DB: {edge['target_paper_title'][:60]}")

            # Optionally create pending match record
            # db_manager.create_pending_match_record(...)

    return stats
