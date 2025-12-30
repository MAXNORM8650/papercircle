"""
Refactored Research Discovery Pipeline
Deterministic retrieval + scoring + MMR diversity, with robust query handling.
"""

from dataclasses import dataclass, asdict
from typing import List, Dict, Optional, Tuple
from datetime import datetime
import json
import os
import subprocess
import re

import arxiv
import numpy as np
import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity


# ==================== CONFIG ====================

MODE_WEIGHTS = {
    "stable":   {"relevance": 0.5, "authority": 0.4, "novelty": 0.1},
    "discovery":{"relevance": 0.3, "authority": 0.1, "novelty": 0.6},
    "balanced": {"relevance": 0.4, "authority": 0.3, "novelty": 0.3}
}

DEFAULT_MAX_RESULTS = {
    "stable":  30,
    "discovery": 60,
    "balanced": 45,
}

CURRENT_YEAR = datetime.now().year


# ==================== DATA MODEL ====================

from dataclasses import dataclass, asdict
from typing import List, Dict, Optional, Any

@dataclass
class Paper:
    id: str                       # canonical internal ID
    title: str
    abstract: str
    year: Optional[int]
    authors: List[str]
    url: Optional[str]
    source: str                   # 'arxiv', 'scopus', 'ieee', etc
    doi: Optional[str] = None

    # New descriptive fields
    venue: Optional[str] = None          # journal or conference name if known
    journal: Optional[str] = None
    conference: Optional[str] = None
    publisher: Optional[str] = None

    # Raw provider metadata (for completeness)
    raw_source_metadata: Optional[Dict[str, Any]] = None

    # Scores (filled later)
    relevance_score: float = 0.0
    authority_score: float = 0.0
    novelty_score: float = 0.0
    final_score: float = 0.0

    def text_for_embedding(self) -> str:
        return (self.title or "") + " " + (self.abstract or "")

# ==================== QUERY BUILDING ====================

class QueryBuilder:
    """
    Robust-ish query builder for findpapers + arxiv.
    Assumes user_query is plain text, not raw boolean DSL.
    """

    def __init__(self, user_query: str):
        self.user_query = user_query.strip()

    def simple_tokens(self) -> List[str]:
        # Very simple tokenization – can be replaced with something smarter
        tokens = re.split(r"\s+", self.user_query)
        tokens = [t.strip(" ,.;:()[]\"'").lower() for t in tokens if t.strip()]
        return list(dict.fromkeys(tokens))  # dedupe, preserve order

    def build_for_arxiv(self, expanded_terms: Optional[List[str]] = None) -> str:
        """
        Build an arXiv-friendly query.
        Use OR between main keywords; keep it simple & robust.
        """
        if expanded_terms is None or len(expanded_terms) == 0:
            expanded_terms = [self.user_query]

        # Example: "efficient finetuning" OR "parameter-efficient" OR "LoRA"
        parts = [f'"{t}"' for t in expanded_terms]
        return " OR ".join(parts)

    def build_for_findpapers(self, expanded_terms: Optional[List[str]] = None) -> str:
        """
        Build a valid findpapers query: [termA] AND [termB] OR [termC] ...
        For now, we use OR between expanded terms to keep recall high.
        """
        if expanded_terms is None or len(expanded_terms) == 0:
            expanded_terms = [self.user_query]

        # Example: [efficient finetuning] OR [parameter-efficient] OR [LoRA]
        parts = [f"[{t}]" for t in expanded_terms]
        return " OR ".join(parts)


# ==================== RETRIEVAL ====================

def run_findpapers_cli(
    query_str: str,
    output_file: str = "findpapers_output.json",
    max_results: int = 50,
    extra_args: Optional[List[str]] = None,
) -> List[Dict]:
    """
    Calls `findpapers search` CLI and returns parsed JSON metadata.
    Assumes findpapers is already installed and configured.
    """
    if extra_args is None:
        extra_args = []

    command = [
        "findpapers", "search",
        output_file,
        "-q", query_str,
        "--limit", str(max_results),
        *extra_args,
    ]

    try:
        # Use a process group so we can kill all child processes
        result = subprocess.run(
            command,
            capture_output=True,
            text=True,
            check=True,
            start_new_session=True  # Create new process group
        )
        # Load JSON metadata written by findpapers
        if not os.path.exists(output_file):
            print(f"[WARN] Expected output file not found: {output_file}")
            return []

        with open(output_file, "r", encoding="utf-8") as f:
            data = json.load(f)

        # `data` format depends on findpapers schema
        # We'll assume it's a list of dicts
        if isinstance(data, dict):
            # Some tools wrap in an outer object; adapt if needed
            papers = data.get("papers", [])
        else:
            papers = data

        return papers

    except subprocess.CalledProcessError as e:
        print(f"[ERROR] findpapers CLI failed: {e.stderr}")
        return []


def search_arxiv(
    arxiv_query: str,
    max_results: int
) -> List[Paper]:
    client = arxiv.Client()
    search_query = arxiv.Search(
        query=arxiv_query,
        max_results=max_results,
        sort_by=arxiv.SortCriterion.Relevance,
    )

    results: List[Paper] = []
    for r in client.results(search_query):
        pub_year = r.published.year if r.published else None
        paper_id = r.entry_id.split("/")[-1]
        venue = r.journal_ref or "arXiv"
        results.append(
            Paper(
                id=f"arxiv:{paper_id}",
                title=(r.title or "").replace("\n", " ").strip(),
                abstract=(r.summary or "").replace("\n", " ").strip(),
                year=pub_year,
                authors=[a.name for a in r.authors],
                url=r.pdf_url,
                source="arxiv",
                doi=getattr(r, "doi", None) if hasattr(r, "doi") else None,
                venue=venue,
                journal=r.journal_ref,
                conference=None,
                publisher=None,
                raw_source_metadata={
                    "arxiv_id": paper_id,
                    "primary_category": getattr(r, "primary_category", None),
                    "categories": getattr(r, "categories", None),
                    "entry_id": r.entry_id,
                },
            )
        )
    return results

def normalize_findpapers_entry(entry: Dict) -> Optional[Paper]:
    """
    Convert a raw findpapers entry into a Paper object.
    You may need to adapt field names based on actual findpapers JSON schema.
    """
    title = entry.get("title") or ""
    abstract = entry.get("abstract") or entry.get("summary") or ""
    year = entry.get("year")
    if isinstance(year, str):
        try:
            year = int(year[:4])
        except Exception:
            year = None

    url = entry.get("pdf_url") or entry.get("url") or entry.get("link")
    doi = entry.get("doi")

    # Try to guess venue / journal / conference
    venue = (
        entry.get("venue")
        or entry.get("journal")
        or entry.get("conference")
        or entry.get("booktitle")
    )
    journal = entry.get("journal")
    conference = entry.get("conference") or entry.get("booktitle")
    publisher = entry.get("publisher")

    source = entry.get("source") or "findpapers"

    authors_raw = entry.get("authors") or []
    if isinstance(authors_raw, str):
        authors = [a.strip() for a in authors_raw.split(",") if a.strip()]
    else:
        authors = [str(a) for a in authors_raw]

    if not title.strip():
        return None

    paper_id = entry.get("id") or doi or title.lower()[:80]
    return Paper(
        id=f"{source}:{paper_id}",
        title=title.strip(),
        abstract=abstract.strip(),
        year=year,
        authors=authors,
        url=url,
        source=source,
        doi=doi,
        venue=venue,
        journal=journal,
        conference=conference,
        publisher=publisher,
        raw_source_metadata=entry,  # keep everything
    )


def retrieve_papers_multi_source(
    user_query: str,
    mode: str = "balanced",
    expand_terms: Optional[List[str]] = None
) -> List[Paper]:
    """Run both findpapers + arxiv and return a combined, deduped list of Papers."""
    mode = mode if mode in MODE_WEIGHTS else "balanced"
    max_results = DEFAULT_MAX_RESULTS[mode]

    qb = QueryBuilder(user_query)

    # If caller didn't provide expanded terms, use the raw query as a single term
    if expand_terms is None or len(expand_terms) == 0:
        expand_terms = [user_query]

    arxiv_q = qb.build_for_arxiv(expand_terms)
    findpapers_q = qb.build_for_findpapers(expand_terms)

    # --- Retrieve from findpapers ---
    raw_findpapers = run_findpapers_cli(
        findpapers_q,
        output_file="findpapers_output.json",
        max_results=max_results
    )
    fp_papers: List[Paper] = []
    for entry in raw_findpapers:
        p = normalize_findpapers_entry(entry)
        if p is not None:
            fp_papers.append(p)

    # --- Retrieve from arxiv ---
    arxiv_papers = search_arxiv(arxiv_q, max_results=max_results)

    # --- Merge + dedupe ---
    all_papers = deduplicate_papers(fp_papers + arxiv_papers)
    return all_papers


# ==================== DEDUPLICATION ====================

def deduplicate_papers(papers: List[Paper]) -> List[Paper]:
    """
    Deduplicate by DOI, then by normalized title.
    Preference: keep entries with more fields filled (heuristic).
    """
    by_doi: Dict[str, Paper] = {}
    no_doi_list: List[Paper] = []

    for p in papers:
        if p.doi:
            doi_norm = p.doi.lower().strip()
            if doi_norm not in by_doi:
                by_doi[doi_norm] = p
            else:
                # heuristic: prefer paper with abstract & URL
                existing = by_doi[doi_norm]
                if len(p.abstract) > len(existing.abstract) or (p.url and not existing.url):
                    by_doi[doi_norm] = p
        else:
            no_doi_list.append(p)

    # handle dedupe by title among no-DOI
    title_map: Dict[str, Paper] = {}
    for p in no_doi_list:
        key = re.sub(r"\s+", " ", p.title.lower()).strip()
        if key not in title_map:
            title_map[key] = p
        else:
            existing = title_map[key]
            if len(p.abstract) > len(existing.abstract) or (p.url and not existing.url):
                title_map[key] = p

    deduped = list(by_doi.values()) + list(title_map.values())
    return deduped


# ==================== SCORING ====================

def compute_relevance_scores(papers: List[Paper], user_query: str) -> np.ndarray:
    """
    Compute cosine similarity between TF-IDF(query) and TF-IDF(paper texts).
    Returns normalized scores in [0,1].
    """
    if not papers:
        return np.array([])

    texts = [p.text_for_embedding() for p in papers]
    corpus = [user_query] + texts

    vectorizer = TfidfVectorizer(max_features=5000, stop_words="english")
    X = vectorizer.fit_transform(corpus)
    query_vec = X[0:1]
    doc_vecs = X[1:]

    sims = cosine_similarity(query_vec, doc_vecs)[0]
    # Normalize to [0,1]
    sims = (sims - sims.min()) / (sims.max() - sims.min() + 1e-8)
    return sims


def compute_authority_scores(papers: List[Paper]) -> np.ndarray:
    """
    Heuristic authority score (deterministic):
      - Use recency (year) + source as proxy.
    """
    if not papers:
        return np.array([])

    years = np.array([p.year if p.year else CURRENT_YEAR - 15 for p in papers])
    # recency score: 1 for this year, decays over 15 years
    recency = 1.0 - np.clip((CURRENT_YEAR - years) / 15.0, 0.0, 1.0)

    # source weight (just a heuristic; adjust as needed)
    def source_weight(src: str) -> float:
        src = (src or "").lower()
        if "nature" in src or "science" in src:
            return 1.0
        if "neurips" in src or "iclr" in src or "icml" in src:
            return 0.9
        if "arxiv" in src:
            return 0.6
        return 0.7

    src_weights = np.array([source_weight(p.source) for p in papers])

    scores = 0.7 * recency + 0.3 * src_weights
    # Normalize to [0,1]
    scores = (scores - scores.min()) / (scores.max() - scores.min() + 1e-8)
    return scores


def compute_novelty_scores(papers: List[Paper]) -> np.ndarray:
    """
    Novelty defined as distance from corpus centroid in TF-IDF space.
    Papers that are 'far' from others are considered more novel.
    Deterministic, no randomness.
    """
    if not papers:
        return np.array([])

    texts = [p.text_for_embedding() for p in papers]
    vectorizer = TfidfVectorizer(max_features=5000, stop_words="english")
    X = vectorizer.fit_transform(texts).toarray()

    centroid = X.mean(axis=0, keepdims=True)
    dists = np.linalg.norm(X - centroid, axis=1)

    # Normalize to [0,1]
    dists = (dists - dists.min()) / (dists.max() - dists.min() + 1e-8)
    return dists


def score_papers(
    papers: List[Paper],
    user_query: str,
    mode: str = "balanced"
) -> List[Paper]:
    """
    Compute relevance / authority / novelty, then final_score per mode weights.
    """
    if not papers:
        return []

    mode = mode if mode in MODE_WEIGHTS else "balanced"
    w = MODE_WEIGHTS[mode]

    rel = compute_relevance_scores(papers, user_query)
    auth = compute_authority_scores(papers)
    nov = compute_novelty_scores(papers)

    final = (
        w["relevance"] * rel +
        w["authority"] * auth +
        w["novelty"]   * nov
    )

    # Attach scores to Paper objects
    for i, p in enumerate(papers):
        p.relevance_score = float(rel[i])
        p.authority_score = float(auth[i])
        p.novelty_score = float(nov[i])
        p.final_score = float(final[i])

    # Sort descending by final_score
    papers_sorted = sorted(papers, key=lambda x: x.final_score, reverse=True)
    return papers_sorted


# ==================== MMR DIVERSITY ====================

def mmr_diversity(
    papers: List[Paper],
    lambda_param: float = 0.5,
    top_k: int = 10
) -> List[Paper]:
    """
    Standard Maximal Marginal Relevance (MMR) on TF-IDF embeddings.
    Deterministic, uses Paper.final_score for relevance.
    """
    if not papers:
        return []

    if len(papers) <= top_k:
        return papers

    texts = [p.text_for_embedding() for p in papers]
    vectorizer = TfidfVectorizer(max_features=2000, stop_words="english")
    X = vectorizer.fit_transform(texts).toarray()

    scores = np.array([p.final_score for p in papers])

    selected = []
    candidate_indices = list(range(len(papers)))

    # Start with the best-scored paper
    first_idx = int(np.argmax(scores))
    selected.append(first_idx)
    candidate_indices.remove(first_idx)

    while len(selected) < top_k and candidate_indices:
        best_idx = None
        best_mmr = -1e9

        for idx in candidate_indices:
            # relevance
            rel = scores[idx]

            # diversity: max similarity to already selected
            sims = cosine_similarity(
                X[idx].reshape(1, -1),
                X[selected]
            )[0]
            max_sim = float(np.max(sims))

            mmr = lambda_param * rel - (1 - lambda_param) * max_sim
            if mmr > best_mmr:
                best_mmr = mmr
                best_idx = idx

        selected.append(best_idx)
        candidate_indices.remove(best_idx)

    return [papers[i] for i in selected]


# ==================== MAIN ORCHESTRATOR ====================

def run_research_discovery_refactored(
    query: str,
    mode: str = "balanced",
    apply_diversity: bool = True,
    expanded_terms: Optional[List[str]] = None,
    top_k_overall: int = 5,
    top_k_hidden_gems: int = 3,
    top_k_canonical: int = 3,
    full_json_path: Optional[str] = "papers_sorted_full.json",
) -> Dict:
    """
    Fully deterministic pipeline:
      1) Retrieve multi-source
      2) Deduplicate
      3) Score (relevance/authority/novelty)
      4) Optional MMR diversity
      5) Return:
         - full sorted list (all_papers_sorted)
         - sections: overall, hidden_gems, canonical
         - optional path to JSON file
    """
    print(f"\n{'='*70}")
    print(f"🔬 RESEARCH DISCOVERY (Refactored)")
    print(f"{'='*70}")
    print(f"Query: {query}")
    print(f"Mode: {mode}")
    print(f"Diversity: {'Enabled' if apply_diversity else 'Disabled'}")
    print(f"{'='*70}\n")

    papers = retrieve_papers_multi_source(
        user_query=query,
        mode=mode,
        expand_terms=expanded_terms
    )
    print(f"[INFO] Retrieved {len(papers)} deduplicated papers")

    if not papers:
        print("[WARN] No papers found.")
        return {
            "all_papers_sorted": [],
            "overall": [],
            "hidden_gems": [],
            "canonical": [],
            "full_json_path": None,
        }

    # 3) Score → returns sorted list by final_score (descending)
    papers_scored_sorted = score_papers(papers, query, mode=mode)

    # 4) Diversity for top_k_overall
    lambda_param = 0.7 if mode == "stable" else 0.5
    if apply_diversity:
        overall = mmr_diversity(
            papers_scored_sorted,
            lambda_param=lambda_param,
            top_k=top_k_overall
        )
    else:
        overall = papers_scored_sorted[:top_k_overall]

    hidden_gems = sorted(
        papers_scored_sorted,
        key=lambda p: p.novelty_score,
        reverse=True
    )[:top_k_hidden_gems]

    canonical = sorted(
        papers_scored_sorted,
        key=lambda p: p.authority_score,
        reverse=True
    )[:top_k_canonical]

    def paper_to_dict(p: Paper) -> Dict:
        # asdict handles nested fields (including raw_source_metadata)
        return asdict(p)

    result = {
        "all_papers_sorted": [paper_to_dict(p) for p in papers_scored_sorted],
        "overall": [paper_to_dict(p) for p in overall],
        "hidden_gems": [paper_to_dict(p) for p in hidden_gems],
        "canonical": [paper_to_dict(p) for p in canonical],
        "full_json_path": full_json_path,
    }

    # Optional: write full sorted list to disk
    if full_json_path is not None:
        with open(full_json_path, "w", encoding="utf-8") as f:
            json.dump(result["all_papers_sorted"], f, indent=2)
        print(f"[INFO] Full sorted list saved to {full_json_path}")

    # Pretty-print summary
    def print_section(name: str, items: List[Paper]):
        print(f"\n--- {name} ---")
        for i, p in enumerate(items, 1):
            print(f"{i}. {p.title} ({p.year}, {p.venue or p.source})")
            print(f"   URL: {p.url}")
            print(
                f"   Scores: rel={p.relevance_score:.3f}, "
                f"auth={p.authority_score:.3f}, "
                f"nov={p.novelty_score:.3f}, "
                f"final={p.final_score:.3f}"
            )

    print_section("Top Overall Recommendations", overall)
    print_section("Hidden Gems (High Novelty)", hidden_gems)
    print_section("Canonical Papers (High Authority)", canonical)

    return result
"""
Multi-agent layer:
- QueryGenerationAgent: turns user story/statement into structured search spec
- Retrieval+Reranking module: uses run_research_discovery_refactored(...)
"""

from smolagents import ToolCallingAgent, LiteLLMModel
import json
import re

# Reuse your model config
MODEL_ID = "ollama_chat/gpt-oss:20b"  
API_BASE = "http://10.127.30.115:11434"
TEMPERATURE = 0.1  # even lower for more deterministic keyword generation


# ==================== QUERY AGENT PROMPT ====================

QUERY_AGENT_SYSTEM_PROMPT = """
You are a Query Generation Agent for a research discovery system.

The user may write:
- a story
- an emotional rant
- a vague research idea
- a long paragraph
- mixed notes

Your job is to infer what kind of academic papers they are actually looking for.

You must output a structured search specification AND a list of plausible paper titles.

CRITICAL:
- You MUST output **valid JSON only**, with no extra text.
- Use simple keyword phrases, not full sentences.
- Focus on technical terms, domains, methods, and tasks.

JSON SCHEMA (exact keys):

{
  "core_keywords": [string],          # 2-6 short phrases capturing main topic
  "must_include": [string],           # 0-4 phrases that are essential
  "nice_to_have": [string],           # 0-6 related concepts / synonyms
  "negative_keywords": [string],      # 0-4 things to AVOID)
  "suggested_mode": "stable" | "discovery" | "balanced",
  "plausible_paper_titles": [string]  # 3-8 hypothetical but realistic paper titles
}

Guidelines:
- "core_keywords" = main research idea.
- "must_include" = strict constraints.
- "nice_to_have" = related topics or synonyms.
- "negative_keywords" = topics definitely NOT desired; if none, use [].
- "suggested_mode":
    - "stable"    → user wants canonical / well-established results
    - "discovery" → user wants novel / cutting-edge ideas
    - "balanced"  → mix of both (default if unclear)
- "plausible_paper_titles":
    - 3 to 8 titles
    - should look like real paper titles
    - focus on what the user seems to care about, not their emotions

Return ONLY the JSON. No explanation, no markdown, nothing else.
"""

def create_query_agent() -> ToolCallingAgent:
    """Agent that turns messy user text into structured search JSON."""
    model = LiteLLMModel(
        model_id=MODEL_ID,
        api_base=API_BASE,
        temperature=TEMPERATURE,
        num_ctx=8192,
    )
    agent = ToolCallingAgent(
        model=model,
        tools=[],  # no tools: it's pure text-in → text-out
        instructions=QUERY_AGENT_SYSTEM_PROMPT,
    )
    return agent


def _extract_json(text: str) -> dict:
    """
    Robustly extract JSON object from model output.
    Assumes there is at least one {...} block.
    """
    # Find the first JSON-like block
    match = re.search(r"\{.*\}", text, flags=re.DOTALL)
    if not match:
        raise ValueError(f"Could not find JSON in: {text[:200]}")

    json_str = match.group(0)
    return json.loads(json_str)


def generate_search_spec_from_user_text(user_text: str) -> dict:
    """
    Use the Query Agent to convert arbitrary user text into a search spec.
    Returns a dict with keys:
      core_keywords, must_include, nice_to_have,
      negative_keywords, suggested_mode, plausible_paper_titles
    """
    agent = create_query_agent()
    raw_output = agent.run(user_text)
    spec = _extract_json(raw_output)

    spec.setdefault("core_keywords", [])
    spec.setdefault("must_include", [])
    spec.setdefault("nice_to_have", [])
    spec.setdefault("negative_keywords", [])
    spec.setdefault("suggested_mode", "balanced")
    spec.setdefault("plausible_paper_titles", [])

    for key in ["core_keywords", "must_include", "nice_to_have",
                "negative_keywords", "plausible_paper_titles"]:
        if not isinstance(spec[key], list):
            spec[key] = [str(spec[key])]
        spec[key] = [str(x).strip() for x in spec[key] if str(x).strip()]

    if spec["suggested_mode"] not in ["stable", "discovery", "balanced"]:
        spec["suggested_mode"] = "balanced"

    return spec


# ==================== MULTI-AGENT ORCHESTRATOR ====================
def run_multi_agent_discovery(
    user_text: str,
    mode: str = None,
    apply_diversity: bool = True,
) -> dict:
    """
    High-level entrypoint:
    1. QueryGenerationAgent → structured search spec (+ plausible titles)
    2. Build search query + expanded terms
    3. Call refactored retrieval+reranking pipeline
    4. Return:
       - search_spec (with plausible titles)
       - mode used
       - full sorted list of all papers (with scores & metadata)
       - also sectioned results (overall / hidden_gems / canonical)
    """
    print("\n" + "=" * 70)
    print("🤝 MULTI-AGENT RESEARCH DISCOVERY")
    print("=" * 70)
    print("Raw user input:")
    print(user_text)
    print("=" * 70 + "\n")

    # 1) Query generation
    print("[STEP 1] Generating search specification from user text...")
    spec = generate_search_spec_from_user_text(user_text)
    print(json.dumps(spec, indent=2))

    core = spec["core_keywords"]
    must = spec["must_include"]
    nice = spec["nice_to_have"]
    predicted_titles = spec["plausible_paper_titles"]
    suggested_mode = spec["suggested_mode"]

    # 2) Decide mode
    final_mode = mode or suggested_mode
    if final_mode not in ["stable", "discovery", "balanced"]:
        final_mode = "balanced"

    # 3) Build query string and expanded terms
    user_query = " ".join(core + must) if (core or must) else " ".join(core + nice)
    if not user_query:
        user_query = " ".join(core + nice) or "general machine learning"

    # Use keywords + nice_to_have + predicted_titles as expanded terms
    expanded_terms = core + must + nice + predicted_titles

    print(f"\n[STEP 2] Final search parameters:")
    print(f"  Mode: {final_mode}")
    print(f"  user_query: {user_query}")
    print(f"  expanded_terms ({len(expanded_terms)}): {expanded_terms}")
    print(f"  plausible_paper_titles: {predicted_titles}")

    # 4) Retrieval + reranking
    print("\n[STEP 3] Running retrieval + reranking pipeline...\n")
    pipeline_result = run_research_discovery_refactored(
        query=user_query,
        mode=final_mode,
        apply_diversity=apply_diversity,
        expanded_terms=expanded_terms,
        top_k_overall=5,
        top_k_hidden_gems=3,
        top_k_canonical=3,
        full_json_path="papers_sorted_full.json",
    )

    # Compose final multi-agent result
    final_result = {
        "search_spec": spec,
        "mode_used": final_mode,
        "predicted_titles": predicted_titles,
        # full sorted flat list of all retrieved papers with all scores & metadata:
        "all_papers_sorted": pipeline_result["all_papers_sorted"],
        # convenient sections:
        "sections": {
            "overall": pipeline_result["overall"],
            "hidden_gems": pipeline_result["hidden_gems"],
            "canonical": pipeline_result["canonical"],
        },
        # where the full JSON list is stored (optional)
        "full_json_path": pipeline_result["full_json_path"],
    }

    return final_result

# ==================== EXAMPLE TOP-LEVEL USAGE ====================

if __name__ == "__main__":
    print("\n" + "🎯 MULTI-AGENT DEMO".center(70, "="))
    user_text = input(
        "\nDescribe what you're looking for (story / idea / paragraph):\n> "
    )
    mode_input = input("Preferred mode (stable/discovery/balanced) [auto]: ").strip().lower() or None

    final = run_multi_agent_discovery(
        user_text=user_text,
        mode=mode_input,
        apply_diversity=True,
    )

    # Optional: dump raw JSON to file
    with open("multi_agent_results.json", "w", encoding="utf-8") as f:
        json.dump(final, f, indent=2)
    print("\n[INFO] Saved full multi-agent result to multi_agent_results.json")