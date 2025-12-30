"""
Research Discovery Agent using smolagents
An intelligent paper discovery system balancing exploitation and exploration
"""

from smolagents import CodeAgent, LiteLLMModel, tool, ToolCallingAgent
import arxiv
import pandas as pd
import numpy as np
from datetime import datetime
from typing import List, Dict, Tuple
import json
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
import subprocess
import os
# ==================== CONFIGURATION ====================
MODEL_ID = "ollama_chat/qwen3-coder:30b"  
API_BASE = "http://10.127.30.115:11434"
TEMPERATURE = 0.2
# Mode weights: [relevance, authority, novelty]
MODE_WEIGHTS = {
    "stable": {"relevance": 0.5, "authority": 0.4, "novelty": 0.1},
    "discovery": {"relevance": 0.3, "authority": 0.1, "novelty": 0.6},
    "balanced": {"relevance": 0.4, "authority": 0.3, "novelty": 0.3}
}

# ==================== TOOLS ====================
@tool
def findpapers_search_and_output(query: str, mode: str = "balanced", max_results: int = 25, output_file: str = "papers_metadata.json") -> str:
    """
    Executes the findpapers CLI to search multiple databases, ensuring full author and PDF details.
    
    Args:
        query: The search query string (will be formatted for findpapers CLI).
        mode: Used to determine search breadth ('stable', 'discovery', 'balanced').
        max_results: The maximum number of papers to retrieve.
        output_file: The temporary file to save the comprehensive JSON output.
    
    Returns:
        The file path of the comprehensive JSON output file for the agent to read.
    """
    # Findpapers requires specific query formatting (e.g., [term A] AND [term B])
    # The 'expand_query_concepts' tool can handle this formatting.
    
    # Construct the query string required by findpapers
    formatted_query = query.replace(" OR ", "\"] OR [").replace(" AND ", "\"] AND [")
    formatted_query = f"[{formatted_query}]"
    
    # Construct the CLI command
    command = [
        "findpapers", "search", 
        output_file,  # Output file path
        "-q", formatted_query,
        "--limit", str(max_results)
        # In a real environment, you would also add API tokens here, e.g.,
        # "--token-scopus", os.getenv("SCOPUS_TOKEN")
    ]
    
    # Execute the command
    try:
        # CodeAgent executes this via its interpreter
        result = subprocess.run(command, capture_output=True, text=True, check=True)
        
        # The agent now knows the JSON file exists and contains comprehensive data
        return f"SUCCESS: Paper metadata written to {output_file}. Contents: {result.stdout}"
    except subprocess.CalledProcessError as e:
        return f"ERROR: findpapers CLI failed. Stderr: {e.stderr}"
@tool
def search_arxiv_papers(query: str, mode: str = "balanced", max_results: int = None) -> str:
    """
    Searches ArXiv for papers based on query and mode.
    
    Args:
        query: Search query string
        mode: One of 'stable', 'discovery', or 'balanced'
        max_results: Override default max results (stable=10, discovery=25, balanced=15)
    
    Returns:
        JSON string of paper results with metadata
    """
    client = arxiv.Client()
    
    # Adjust search breadth based on mode
    if max_results is None:
        max_results = {
            "stable": 10,
            "discovery": 25,
            "balanced": 15
        }.get(mode, 15)
    
    search_query = arxiv.Search(
        query=query,
        max_results=max_results,
        sort_by=arxiv.SortCriterion.Relevance
    )
    
    results = []
    current_year = datetime.now().year
    
    for r in client.results(search_query):
        pub_year = r.published.year
        age_score = 1.0 - min((current_year - pub_year) / 10, 1.0)  # Decay over 10 years
        
        results.append({
            "id": r.entry_id.split('/')[-1],
            "title": r.title.replace("\n", " ").strip(),
            "summary": r.summary.replace("\n", " ").strip()[:500],  # Truncate for efficiency
            "year": pub_year,
            "authors": [a.name for a in r.authors][:3],  # Top 3 authors
            "url": r.pdf_url,
            "published": r.published.strftime("%Y-%m-%d"),
            "age_score": round(age_score, 3)
        })
    
    return json.dumps(results, indent=2)


@tool
def expand_query_concepts(base_query: str) -> str:
    """
    Expands a research query with related concepts and synonyms.
    In production, this would call an LLM. For now, uses rule-based expansion.
    
    Args:
        base_query: Original search query
    
    Returns:
        Expanded query string with OR operators
    """
    # Simple expansion dictionary (in production, use LLM)
    expansions = {
        "finetuning": ["fine-tuning", "parameter-efficient", "PEFT", "adaptation"],
        "llm": ["large language model", "transformer", "foundation model"],
        "efficient": ["low-rank", "adapter", "LoRA", "QLoRA", "lightweight"],
        "reinforcement learning": ["RL", "policy optimization", "reward modeling"],
        "diffusion": ["denoising", "score-based", "generative model"]
    }
    
    expanded_terms = [base_query]
    query_lower = base_query.lower()
    
    for key, synonyms in expansions.items():
        if key in query_lower:
            expanded_terms.extend(synonyms[:2])  # Add top 2 synonyms
    
    # ArXiv uses OR for multiple terms
    expanded_query = " OR ".join(f'"{term}"' for term in expanded_terms[:5])
    return expanded_query


@tool
def rate_paper_relevance(title: str, abstract: str, user_query: str) -> str:
    """
    Scores a paper on topic relevance, novelty indicators, and authority proxies.
    
    Args:
        title: Paper title
        abstract: Paper abstract
        user_query: Original user query for relevance scoring
    
    Returns:
        JSON string with scores
    """
    # Simulate LLM scoring (in production, call actual LLM with structured prompt)
    # Here we use heuristics for demonstration
    
    text = (title + " " + abstract).lower()
    query_terms = user_query.lower().split()
    
    # Topic relevance: keyword matching
    relevance = sum(1 for term in query_terms if term in text) / max(len(query_terms), 1)
    relevance = min(relevance * 0.5 + 0.3, 1.0)  # Scale to 0.3-1.0
    
    # Novelty indicators: look for keywords suggesting new approaches
    novelty_keywords = ["novel", "new", "first", "propose", "introduce", "breakthrough"]
    novelty = sum(1 for kw in novelty_keywords if kw in text) / 10
    novelty = min(novelty + np.random.uniform(0.2, 0.5), 1.0)
    
    # Authority proxy: random with bias (in production, fetch citation count)
    authority = np.random.beta(2, 5)  # Skewed toward lower values (realistic)
    
    scores = {
        "topic_relevance": round(float(relevance), 3),
        "novelty": round(float(novelty), 3),
        "authority_proxy": round(float(authority), 3)
    }
    
    return json.dumps(scores)


@tool
def calculate_mmr_diversity(papers_json: str, lambda_param: float = 0.5, top_k: int = 10) -> str:
    """
    Applies Maximal Marginal Relevance to re-rank papers for diversity.
    
    Args:
        papers_json: JSON string of papers with scores
        lambda_param: 1.0 = pure relevance, 0.0 = pure diversity
        top_k: Number of papers to return
    
    Returns:
        JSON string of re-ranked paper IDs
    """
    papers = json.loads(papers_json)
    if len(papers) <= top_k:
        return json.dumps([p['id'] for p in papers])
    
    # Create TF-IDF vectors from titles and abstracts
    texts = [p['title'] + " " + p.get('summary', '') for p in papers]
    vectorizer = TfidfVectorizer(max_features=100, stop_words='english')
    embeddings = vectorizer.fit_transform(texts).toarray()
    
    # MMR algorithm
    selected_indices = []
    remaining_indices = list(range(len(papers)))
    
    # Start with highest scored paper
    scores = [p.get('final_score', 0) for p in papers]
    first_idx = np.argmax(scores)
    selected_indices.append(first_idx)
    remaining_indices.remove(first_idx)
    
    # Iteratively select papers balancing relevance and diversity
    for _ in range(min(top_k - 1, len(remaining_indices))):
        mmr_scores = []
        
        for idx in remaining_indices:
            # Relevance component
            relevance = scores[idx]
            
            # Diversity component: max similarity to already selected
            similarities = cosine_similarity(
                embeddings[idx].reshape(1, -1),
                embeddings[selected_indices]
            )
            max_similarity = np.max(similarities)
            
            # MMR formula
            mmr = lambda_param * relevance - (1 - lambda_param) * max_similarity
            mmr_scores.append(mmr)
        
        # Select paper with highest MMR score
        best_idx = remaining_indices[np.argmax(mmr_scores)]
        selected_indices.append(best_idx)
        remaining_indices.remove(best_idx)
    
    selected_ids = [papers[i]['id'] for i in selected_indices]
    return json.dumps(selected_ids)


# ==================== SYSTEM PROMPT ====================

SYSTEM_PROMPT = """You are an intelligent Research Discovery Agent specializing in paper recommendations.

Your mission is to balance EXPLOITATION (finding authoritative, highly relevant papers) and EXPLORATION (discovering novel, hidden gem papers).

AVAILABLE TOOLS:
1. findpapers_search_and_output(query, mode, max_results, output_file) - **(NEW!)** Executes multi-source search (ArXiv, Scopus, IEEE, etc.) and saves the comprehensive metadata (including ALL authors and full PDF links) to a JSON file.
2. expand_query_concepts(base_query) - Generate query variations.
3. rate_paper_relevance(title, abstract, user_query, authority_data) - Score individual papers (now accepts authority data).
4. calculate_mmr_diversity(papers_json, lambda_param, top_k) - Ensure result diversity.
5. read_file(filepath) - A new tool/command the agent must use to read the output of findpapers.

MODES AND THEIR WEIGHTS:
- **stable**: relevance=0.5, authority=0.4, novelty=0.1 → Prioritize established, authoritative works
- **discovery**: relevance=0.3, authority=0.1, novelty=0.6 → Hunt for novel, cutting-edge research
- **balanced**: relevance=0.4, authority=0.3, novelty=0.3 → Mix of both approaches

ALGORITHM:
1. Optionally expand the user query if in 'discovery' mode
2. Call **findpapers_search_and_output()** to save results to a file (e.g., 'papers.json').
3. **READ THE FILE** into Python using a file-reading command.
4. Parse results into a pandas DataFrame.
5. For each paper, call rate_paper_relevance() to get scores (and use the actual citation count or source metadata as the authority score).
6. Sort by final_score
7. Apply MMR diversity (lambda=0.7 for stable, 0.5 for discovery)
8. Generate a report with:
   - Top 5 overall recommendations
   - "Hidden Gems" section (high novelty, sorted by novelty score)
   - "Canonical Papers" section (high authority, sorted by authority)

IMPORTANT:
- Use pandas for data manipulation
- Always show your scoring calculations
- Format output as a readable report with paper titles, scores, and reasoning
- Include paper URLs in the final output
"""

# ==================== AGENT INITIALIZATION ====================
def create_research_agent():
    """Creates and configures the research discovery agent"""
    model = LiteLLMModel(model_id=MODEL_ID, api_base=API_BASE, num_ctx=8192)
    
    # The agent is now configured with the new, powerful search tool
    agent = CodeAgent( # Reverting to CodeAgent as file manipulation is easier
        tools=[
            findpapers_search_and_output, # <-- NEW
            expand_query_concepts,
            rate_paper_relevance,
            calculate_mmr_diversity
        ],
        model=model,
        instructions=SYSTEM_PROMPT,
        additional_authorized_imports=["pandas", "numpy", "json", "os", "subprocess"]
    )
    
    return agent

# ==================== MAIN EXECUTION ====================

def run_research_discovery(query: str, mode: str = "balanced", apply_diversity: bool = True):
    """
    Runs the complete research discovery pipeline
    
    Args:
        query: Research query string
        mode: One of 'stable', 'discovery', or 'balanced'
        apply_diversity: Whether to apply MMR diversity re-ranking
    """
    print(f"\n{'='*70}")
    print(f"🔬 RESEARCH DISCOVERY AGENT")
    print(f"{'='*70}")
    print(f"Query: {query}")
    print(f"Mode: {mode.upper()}")
    print(f"Diversity: {'Enabled' if apply_diversity else 'Disabled'}")
    print(f"{'='*70}\n")
    
    agent = create_research_agent()
    
    # Construct the user prompt
    weights = MODE_WEIGHTS[mode]
    diversity_param = 0.7 if mode == "stable" else 0.5
    
    user_prompt = f"""
Execute a paper discovery search with these parameters:
- Query: "{query}"
- Mode: {mode}
- Weights: relevance={weights['relevance']}, authority={weights['authority']}, novelty={weights['novelty']}
- Apply MMR diversity: {apply_diversity} (lambda={diversity_param})

Steps to follow:
1. {"Expand the query using expand_query_concepts()" if mode == "discovery" else "Use the query as-is"}
2. Search papers using findpapers_search_and_output()
3. Score each paper using rate_paper_relevance()
4. Calculate final scores using the mode weights
5. {"Apply calculate_mmr_diversity() for diverse results" if apply_diversity else "Sort by final_score"}
6. Generate the final report with:
   - Top 5 Overall Recommendations
   - Top 3 Hidden Gems (highest novelty)
   - Top 3 Canonical Papers (highest authority)
   
Show all calculations and include paper URLs.
"""
    
    result = agent.run(user_prompt)
    return result


# ==================== EXAMPLE USAGE ====================

if __name__ == "__main__":
    # Example 1: Discovery mode for finding novel approaches
    print("\n" + "🎯 EXAMPLE 1: Discovery Mode".center(70, "="))
    # run_research_discovery(
    #     query="efficient finetuning methods for large language models",
    #     mode="discovery",
    #     apply_diversity=True
    # )
    
    # # Example 2: Stable mode for established work
    # print("\n" + "🎯 EXAMPLE 2: Stable Mode".center(70, "="))
    # run_research_discovery(
    #     query="reinforcement learning from human feedback",
    #     mode="stable",
    #     apply_diversity=True
    # )
    
    # Example 3: Custom query in balanced mode
    # Uncomment to test with your own query:
    custom_query = input("\n\nEnter your research query: ")
    custom_mode = input("Choose mode (stable/discovery/balanced): ").lower()
    run_research_discovery(custom_query, custom_mode)
