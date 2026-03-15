"""
HuggingFace Papers API Client
==============================
HTTP client for querying the PaperCircle Papers API hosted on HuggingFace Spaces.
Used by both the community papers router and the offline search engine (pca.py).
"""

import os
import time
from typing import Optional, List, Dict, Any

import httpx


HF_PAPERS_API_URL = os.getenv("HF_PAPERS_API_URL", "")


class HFPapersClient:
    """Client for the HuggingFace Spaces Papers API."""

    def __init__(self, base_url: Optional[str] = None):
        self.base_url = (base_url or HF_PAPERS_API_URL).rstrip("/")
        if not self.base_url:
            raise ValueError(
                "HF Papers API URL not configured. "
                "Set HF_PAPERS_API_URL environment variable."
            )
        self._client = httpx.Client(timeout=60.0)

    def _request(self, method: str, path: str, **kwargs) -> Any:
        """Make HTTP request with retry for cold starts."""
        url = f"{self.base_url}{path}"

        for attempt in range(3):
            try:
                resp = self._client.request(method, url, **kwargs)
                resp.raise_for_status()
                return resp.json()
            except (httpx.TimeoutException, httpx.ConnectError) as e:
                if attempt < 2:
                    wait = 5 * (attempt + 1)
                    print(f"[HF Client] Request to {path} failed (attempt {attempt + 1}): {e}. Retrying in {wait}s...")
                    time.sleep(wait)
                else:
                    print(f"[HF Client] Request to {path} failed after 3 attempts: {e}")
                    raise
            except httpx.HTTPStatusError as e:
                if e.response.status_code == 503 and attempt < 2:
                    print(f"[HF Client] Service loading (503), retrying in 10s...")
                    time.sleep(10)
                else:
                    raise

    def health_check(self) -> bool:
        """Check if the HF Spaces API is healthy."""
        try:
            data = self._request("GET", "/health")
            return data.get("ready", False)
        except Exception:
            return False

    def get_community_papers(
        self,
        page: int = 1,
        limit: int = 20,
        year: Optional[int] = None,
        conference: Optional[str] = None,
        source: Optional[str] = None,
        track: Optional[str] = None,
        status: Optional[str] = None,
        primary_area: Optional[str] = None,
        min_rating: Optional[float] = None,
        keywords: Optional[str] = None,
        sort_by: str = "year",
    ) -> Dict[str, Any]:
        """Get paginated community papers with filters."""
        params = {"page": page, "limit": limit, "sort_by": sort_by}
        if year is not None:
            params["year"] = year
        if conference:
            params["conference"] = conference
        if source:
            params["source"] = source
        if track:
            params["track"] = track
        if status:
            params["status"] = status
        if primary_area:
            params["primary_area"] = primary_area
        if min_rating is not None:
            params["min_rating"] = min_rating
        if keywords:
            params["keywords"] = keywords

        return self._request("GET", "/api/community/papers", params=params)

    def get_paper(self, paper_id: str) -> Dict[str, Any]:
        """Get a single paper by ID."""
        return self._request("GET", f"/api/community/papers/{paper_id}")

    def get_filter_options(self) -> Dict[str, Any]:
        """Get available filter options."""
        return self._request("GET", "/api/community/filters")

    def search_papers(
        self,
        query: str,
        conferences: Optional[List[str]] = None,
        start_year: Optional[int] = None,
        end_year: Optional[int] = None,
        limit: int = 50,
        offset: int = 0,
    ) -> List[Dict[str, Any]]:
        """Full-text search for papers."""
        params: Dict[str, Any] = {"query": query, "limit": limit, "offset": offset}
        if conferences:
            params["conferences"] = ",".join(conferences)
        if start_year is not None:
            params["start_year"] = start_year
        if end_year is not None:
            params["end_year"] = end_year

        data = self._request("GET", "/api/search", params=params)
        return data.get("papers", [])

    def close(self):
        self._client.close()


# Singleton instance
_client: Optional[HFPapersClient] = None


def get_hf_papers_client() -> Optional[HFPapersClient]:
    """Get or create the singleton HF Papers client. Returns None if not configured."""
    global _client
    if _client is None and HF_PAPERS_API_URL:
        try:
            _client = HFPapersClient()
        except ValueError:
            return None
    return _client
