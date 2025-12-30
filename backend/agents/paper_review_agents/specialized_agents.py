"""
Specialized Agents for Paper Review
====================================
Individual agent modules for specific review tasks.
"""

from smolagents import (
    LiteLLMModel,
    CodeAgent,
    ToolCallingAgent,
    tool,
)
from typing import List, Dict, Any, Optional
import json
import re


# ============================================================================
# Knowledge Graph Agent - For Paper Linkages
# ============================================================================

@tool
def build_citation_graph(paper_data: str) -> str:
    """
    Build a citation graph from paper data showing relationships.
    
    Args:
        paper_data: JSON string containing paper info and its citations
        
    Returns:
        JSON string representing the citation graph
    """
    try:
        data = json.loads(paper_data)
        
        graph = {
            "nodes": [],
            "edges": [],
            "clusters": {}
        }
        
        # Add main paper as central node
        main_paper = data.get("main_paper", {})
        graph["nodes"].append({
            "id": "main",
            "label": main_paper.get("title", "Main Paper")[:50],
            "type": "main",
            "year": main_paper.get("year", "")
        })
        
        # Add citations as nodes
        citations = data.get("citations", [])
        for i, cite in enumerate(citations):
            node_id = f"cite_{i}"
            graph["nodes"].append({
                "id": node_id,
                "label": cite.get("title", f"Citation {i}")[:50],
                "type": "citation",
                "year": cite.get("year", "")
            })
            graph["edges"].append({
                "source": "main",
                "target": node_id,
                "type": "cites"
            })
        
        # Add related papers
        related = data.get("related_papers", [])
        for i, paper in enumerate(related):
            node_id = f"related_{i}"
            graph["nodes"].append({
                "id": node_id,
                "label": paper.get("title", f"Related {i}")[:50],
                "type": "related",
                "year": paper.get("year", ""),
                "citations": paper.get("citations", 0)
            })
            graph["edges"].append({
                "source": "main",
                "target": node_id,
                "type": "related_to"
            })
        
        return json.dumps(graph, indent=2)
        
    except Exception as e:
        return json.dumps({"error": str(e)})


@tool
def identify_paper_clusters(papers_json: str) -> str:
    """
    Identify thematic clusters among a set of papers.
    
    Args:
        papers_json: JSON string with list of papers (title, abstract)
        
    Returns:
        JSON string with identified clusters
    """
    try:
        papers = json.loads(papers_json)
        
        # Simple keyword-based clustering
        keyword_groups = {
            "methodology": ["method", "approach", "algorithm", "technique", "framework"],
            "deep_learning": ["neural", "network", "deep", "learning", "transformer", "attention"],
            "optimization": ["optimization", "training", "loss", "gradient", "convergence"],
            "applications": ["application", "task", "benchmark", "dataset", "evaluation"],
            "theory": ["theoretical", "analysis", "bound", "proof", "theorem"],
            "vision": ["image", "visual", "vision", "pixel", "spatial"],
            "language": ["language", "text", "nlp", "token", "embedding"],
            "generative": ["generation", "generative", "diffusion", "gan", "vae"],
            "reinforcement": ["reinforcement", "reward", "policy", "agent", "environment"]
        }
        
        clusters = {k: [] for k in keyword_groups}
        
        for i, paper in enumerate(papers):
            text = f"{paper.get('title', '')} {paper.get('abstract', '')}".lower()
            
            for cluster_name, keywords in keyword_groups.items():
                if any(kw in text for kw in keywords):
                    clusters[cluster_name].append({
                        "index": i,
                        "title": paper.get("title", "")[:80]
                    })
        
        # Remove empty clusters
        clusters = {k: v for k, v in clusters.items() if v}
        
        return json.dumps(clusters, indent=2)
        
    except Exception as e:
        return json.dumps({"error": str(e)})


@tool
def find_methodology_links(paper_text: str) -> str:
    """
    Extract and categorize methodological components from paper text.
    
    Args:
        paper_text: Full text of the paper
        
    Returns:
        JSON with methodology breakdown
    """
    methodology = {
        "model_architecture": [],
        "training_details": [],
        "loss_functions": [],
        "datasets": [],
        "baselines": [],
        "metrics": [],
        "hyperparameters": []
    }
    
    # Architecture patterns
    arch_patterns = [
        r"(?:use|employ|propose)\s+(?:a\s+)?(\w+(?:\s+\w+)?)\s+(?:architecture|model|network)",
        r"(?:transformer|resnet|bert|gpt|vit|unet|diffusion)\s*(?:\d+)?",
    ]
    
    # Dataset patterns
    dataset_patterns = [
        r"(?:ImageNet|CIFAR|MNIST|COCO|VOC|ADE20K|Cityscapes|LAION|CC3M|WebLI)",
        r"train(?:ed)?\s+on\s+(\w+(?:\s+\w+)?)\s+dataset",
    ]
    
    # Metric patterns
    metric_patterns = [
        r"(?:accuracy|precision|recall|F1|FID|IS|CLIP|BLEU|ROUGE|mAP|IoU|PSNR|SSIM)",
        r"(?:top-\d+|AUC|perplexity|loss)",
    ]
    
    text_lower = paper_text.lower()
    
    # Extract architectures
    for pattern in arch_patterns:
        matches = re.findall(pattern, text_lower)
        methodology["model_architecture"].extend(matches[:10])
    
    # Extract datasets
    for pattern in dataset_patterns:
        matches = re.findall(pattern, paper_text, re.IGNORECASE)
        methodology["datasets"].extend(matches[:10])
    
    # Extract metrics
    for pattern in metric_patterns:
        matches = re.findall(pattern, paper_text, re.IGNORECASE)
        methodology["metrics"].extend(matches[:10])
    
    # Clean up duplicates
    for key in methodology:
        methodology[key] = list(set(methodology[key]))
    
    return json.dumps(methodology, indent=2)


def create_knowledge_graph_agent(model: LiteLLMModel) -> ToolCallingAgent:
    """Create an agent for building paper knowledge graphs."""
    
    return ToolCallingAgent(
        tools=[build_citation_graph, identify_paper_clusters, find_methodology_links],
        model=model,
        name="knowledge_graph_builder",
        description="Builds knowledge graphs showing paper relationships, citations, and thematic clusters.",
        instructions="""You are a knowledge graph specialist for research papers. Your job is to:

1. Build citation graphs showing how papers relate
2. Identify thematic clusters among related papers
3. Extract methodology links and connections
4. Visualize the research landscape around a paper

Create structured representations that show:
- Direct citations (papers this work cites)
- Citing papers (papers that cite this work)
- Methodological connections (shared techniques)
- Thematic relationships (same research area)"""
    )


# ============================================================================
# Contribution Extractor Agent
# ============================================================================

@tool  
def extract_contributions(paper_text: str) -> str:
    """
    Extract claimed contributions from a paper.
    
    Args:
        paper_text: Full text of the paper
        
    Returns:
        JSON with extracted contributions
    """
    contributions = {
        "explicit_claims": [],
        "implicit_contributions": [],
        "artifacts": []
    }
    
    # Look for explicit contribution statements
    contrib_patterns = [
        r"(?:our|this)\s+(?:main\s+)?contributions?\s+(?:are|include)[:\s]*(.*?)(?:\n\n|\.\s+[A-Z])",
        r"we\s+(?:make\s+)?(?:the\s+following\s+)?contributions?[:\s]*(.*?)(?:\n\n|\.\s+[A-Z])",
        r"•\s*(.*?)(?:\n|$)",  # Bullet points
        r"(?:\d+\)|\(\d+\))\s*(.*?)(?:\n|$)",  # Numbered items
    ]
    
    for pattern in contrib_patterns:
        matches = re.findall(pattern, paper_text, re.IGNORECASE | re.DOTALL)
        for match in matches[:10]:
            if len(match) > 20 and len(match) < 500:
                contributions["explicit_claims"].append(match.strip())
    
    # Look for artifacts (code, datasets, models)
    artifact_patterns = [
        r"(?:code|implementation)\s+(?:is\s+)?available\s+at\s+(\S+)",
        r"(?:github|gitlab)\.com/\S+",
        r"(?:release|provide)\s+(?:our\s+)?(?:code|dataset|model|checkpoint)",
    ]
    
    for pattern in artifact_patterns:
        matches = re.findall(pattern, paper_text, re.IGNORECASE)
        contributions["artifacts"].extend(matches[:5])
    
    return json.dumps(contributions, indent=2)


@tool
def compare_to_baselines(paper_text: str) -> str:
    """
    Extract baseline comparisons from the paper.
    
    Args:
        paper_text: Full text of the paper
        
    Returns:
        JSON with baseline comparison info
    """
    comparisons = {
        "baselines_mentioned": [],
        "improvements_claimed": [],
        "tables_found": 0
    }
    
    # Find baseline methods mentioned
    baseline_patterns = [
        r"(?:compare|baseline|prior work|previous method)[:\s]+(\w+(?:\s+\w+)?)",
        r"(?:outperform|exceed|surpass|improve upon)\s+(\w+(?:\s+\w+)?)",
    ]
    
    for pattern in baseline_patterns:
        matches = re.findall(pattern, paper_text, re.IGNORECASE)
        comparisons["baselines_mentioned"].extend(matches[:20])
    
    # Find improvement claims
    improvement_patterns = [
        r"(\d+(?:\.\d+)?%?)\s+(?:improvement|better|higher|gain)",
        r"improve[sd]?\s+(?:by\s+)?(\d+(?:\.\d+)?%?)",
        r"achieve[sd]?\s+(?:a\s+)?(\d+(?:\.\d+)?%?)\s+(?:accuracy|score|performance)",
    ]
    
    for pattern in improvement_patterns:
        matches = re.findall(pattern, paper_text, re.IGNORECASE)
        comparisons["improvements_claimed"].extend(matches[:10])
    
    # Count tables
    table_count = len(re.findall(r"(?:Table|Tab\.)\s*\d+", paper_text))
    comparisons["tables_found"] = table_count
    
    # Deduplicate
    comparisons["baselines_mentioned"] = list(set(comparisons["baselines_mentioned"]))
    
    return json.dumps(comparisons, indent=2)


def create_contribution_agent(model: LiteLLMModel) -> ToolCallingAgent:
    """Create an agent for extracting and analyzing contributions."""
    
    return ToolCallingAgent(
        tools=[extract_contributions, compare_to_baselines],
        model=model,
        name="contribution_analyzer",
        description="Extracts and analyzes paper contributions, baselines, and comparative claims.",
        instructions="""You are a contribution analysis specialist. Your job is to:

1. Extract explicit contribution claims from papers
2. Identify implicit contributions (novel techniques, insights)
3. Analyze baseline comparisons and improvement claims
4. Assess the significance of contributions

Be critical and verify claims against the actual content. Flag:
- Overclaiming (weak evidence for strong claims)
- Missing baselines
- Cherry-picked comparisons
- Unverifiable claims"""
    )


# ============================================================================
# Reproducibility Checker Agent
# ============================================================================

@tool
def check_reproducibility(paper_text: str) -> str:
    """
    Assess reproducibility based on paper content.
    
    Args:
        paper_text: Full text of the paper
        
    Returns:
        JSON with reproducibility assessment
    """
    assessment = {
        "code_available": False,
        "hyperparameters_provided": False,
        "training_details": False,
        "dataset_accessible": False,
        "compute_requirements": False,
        "random_seeds": False,
        "score": 0,
        "issues": [],
        "positive_aspects": []
    }
    
    text_lower = paper_text.lower()
    
    # Check for code availability
    if any(x in text_lower for x in ["github.com", "code available", "implementation available", "gitlab.com"]):
        assessment["code_available"] = True
        assessment["positive_aspects"].append("Code appears to be available")
        assessment["score"] += 2
    else:
        assessment["issues"].append("No code repository mentioned")
    
    # Check for hyperparameters
    hp_indicators = ["learning rate", "batch size", "epochs", "optimizer", "weight decay", "dropout"]
    found_hp = sum(1 for hp in hp_indicators if hp in text_lower)
    if found_hp >= 3:
        assessment["hyperparameters_provided"] = True
        assessment["positive_aspects"].append(f"Found {found_hp} hyperparameter specifications")
        assessment["score"] += 2
    else:
        assessment["issues"].append(f"Limited hyperparameter details (found {found_hp}/6 common ones)")
    
    # Check for training details
    if any(x in text_lower for x in ["training procedure", "we train", "trained for", "training process"]):
        assessment["training_details"] = True
        assessment["score"] += 1
    
    # Check for compute requirements
    if any(x in text_lower for x in ["gpu", "tpu", "a100", "v100", "hours", "compute"]):
        assessment["compute_requirements"] = True
        assessment["positive_aspects"].append("Compute requirements mentioned")
        assessment["score"] += 1
    else:
        assessment["issues"].append("No compute requirements specified")
    
    # Check for random seeds
    if any(x in text_lower for x in ["random seed", "seed=", "set_seed", "reproducib"]):
        assessment["random_seeds"] = True
        assessment["positive_aspects"].append("Random seeds/reproducibility mentioned")
        assessment["score"] += 1
    
    # Final score out of 10
    assessment["score"] = min(10, assessment["score"] * 2)
    
    return json.dumps(assessment, indent=2)


@tool
def extract_experimental_setup(paper_text: str) -> str:
    """
    Extract experimental setup details from the paper.
    
    Args:
        paper_text: Full text of the paper
        
    Returns:
        JSON with experimental setup details
    """
    setup = {
        "datasets": [],
        "metrics": [],
        "baselines": [],
        "ablations": [],
        "hardware": [],
        "software": []
    }
    
    # Common datasets
    datasets = [
        "ImageNet", "CIFAR-10", "CIFAR-100", "MNIST", "COCO", "VOC",
        "ADE20K", "Cityscapes", "LAION", "CC3M", "CC12M", "WebLI",
        "SQuAD", "GLUE", "SuperGLUE", "WMT", "WikiText"
    ]
    
    for ds in datasets:
        if ds.lower() in paper_text.lower():
            setup["datasets"].append(ds)
    
    # Common metrics
    metrics = [
        "accuracy", "top-1", "top-5", "FID", "IS", "CLIP score",
        "BLEU", "ROUGE", "F1", "precision", "recall", "mAP",
        "IoU", "PSNR", "SSIM", "perplexity"
    ]
    
    for metric in metrics:
        if metric.lower() in paper_text.lower():
            setup["metrics"].append(metric)
    
    # Hardware
    hardware = ["A100", "V100", "H100", "TPU", "RTX", "GPU"]
    for hw in hardware:
        if hw in paper_text:
            setup["hardware"].append(hw)
    
    # Software
    software = ["PyTorch", "TensorFlow", "JAX", "Hugging Face", "transformers"]
    for sw in software:
        if sw.lower() in paper_text.lower():
            setup["software"].append(sw)
    
    return json.dumps(setup, indent=2)


def create_reproducibility_agent(model: LiteLLMModel) -> ToolCallingAgent:
    """Create an agent for checking reproducibility."""
    
    return ToolCallingAgent(
        tools=[check_reproducibility, extract_experimental_setup],
        model=model,
        name="reproducibility_checker",
        description="Assesses paper reproducibility and extracts experimental setup details.",
        instructions="""You are a reproducibility assessment specialist. Your job is to:

1. Check if sufficient details are provided to reproduce results
2. Extract experimental setup information
3. Identify missing critical information
4. Rate overall reproducibility

Key aspects to check:
- Code availability and quality
- Hyperparameter specifications
- Training procedure details
- Dataset accessibility
- Compute requirements
- Random seeds and variance reporting

Provide actionable feedback on what's missing."""
    )


# ============================================================================
# Export all agents
# ============================================================================

__all__ = [
    'create_knowledge_graph_agent',
    'create_contribution_agent', 
    'create_reproducibility_agent',
    'build_citation_graph',
    'identify_paper_clusters',
    'find_methodology_links',
    'extract_contributions',
    'compare_to_baselines',
    'check_reproducibility',
    'extract_experimental_setup',
]
