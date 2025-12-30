"""
Multi-Agent Orchestrator for Paper Review
==========================================
Coordinates multiple specialized agents for comprehensive paper analysis.
"""

from smolagents import (
    LiteLLMModel,
    CodeAgent,
    ToolCallingAgent,
    tool
)
from dataclasses import dataclass, field
from typing import List, Dict, Any, Optional, Callable
from enum import Enum
from concurrent.futures import ThreadPoolExecutor, as_completed
import json
import time
from pathlib import Path

# Import our specialized agents
from paper_review_system import (
    download_pdf,
    extract_text_from_pdf,
    extract_paper_metadata,
    extract_citations,
    search_semantic_scholar,
    search_arxiv,
    Config,
)
from specialized_agents import (
    create_knowledge_graph_agent,
    create_contribution_agent,
    create_reproducibility_agent,
    build_citation_graph,
    extract_contributions,
    check_reproducibility,
    extract_experimental_setup,
)


# ============================================================================
# Agent Registry
# ============================================================================

class AgentRole(Enum):
    """Roles for different agents in the pipeline."""
    PDF_PROCESSOR = "pdf_processor"
    METADATA_EXTRACTOR = "metadata_extractor"
    DEEP_ANALYZER = "deep_analyzer"
    CRITIC = "critic"
    LITERATURE_EXPERT = "literature_expert"
    KNOWLEDGE_GRAPH = "knowledge_graph"
    CONTRIBUTION_ANALYZER = "contribution_analyzer"
    REPRODUCIBILITY_CHECKER = "reproducibility_checker"
    SUMMARIZER = "summarizer"
    ORCHESTRATOR = "orchestrator"


@dataclass
class AgentTask:
    """A task to be executed by an agent."""
    role: AgentRole
    prompt: str
    dependencies: List[str] = field(default_factory=list)
    timeout: int = 300  # seconds
    required: bool = True


@dataclass
class TaskResult:
    """Result from an agent task."""
    role: AgentRole
    success: bool
    result: Any
    error: Optional[str] = None
    duration: float = 0.0


# ============================================================================
# Multi-Agent Orchestrator
# ============================================================================

class MultiAgentOrchestrator:
    """
    Orchestrates multiple agents for comprehensive paper review.
    
    Features:
    - Parallel execution of independent tasks
    - Dependency management between tasks
    - Error handling and fallbacks
    - Progress tracking
    - Result aggregation
    """
    
    def __init__(self, config: Config = None):
        self.config = config or Config()
        self.model = LiteLLMModel(
            model_id=self.config.model_id,
            api_base=self.config.api_base,
            num_ctx=self.config.num_ctx
        )
        
        # Initialize all agents
        self._init_agents()
        
        # Task registry
        self.task_results: Dict[str, TaskResult] = {}
        self.paper_context: Dict[str, Any] = {}
        
    def _init_agents(self):
        """Initialize all specialized agents."""
        
        # Deep Analysis Agent
        self.analysis_agent = ToolCallingAgent(
            tools=[],
            model=self.model,
            name="deep_analyzer",
            instructions="""You are an expert ML researcher providing deep technical analysis.
            
Analyze papers focusing on:
1. Technical novelty and approach
2. Mathematical foundations
3. Experimental methodology
4. Key insights and findings

Be thorough but concise. Focus on what makes this paper interesting or important."""
        )
        
        # Critique Agent
        self.critique_agent = ToolCallingAgent(
            tools=[],
            model=self.model,
            name="paper_critic",
            instructions="""You are a senior reviewer for top ML conferences (NeurIPS, ICML, ICLR).

Provide balanced, constructive critique:
- Identify genuine strengths (not generic praise)
- Point out specific weaknesses with suggestions
- Ask probing questions
- Assess novelty, clarity, and significance

Be fair but rigorous. Your goal is to help authors improve."""
        )
        
        # Literature Agent (with tools)
        self.literature_agent = ToolCallingAgent(
            tools=[search_semantic_scholar, search_arxiv, extract_citations],
            model=self.model,
            name="literature_expert",
            instructions="""You are a literature review specialist.

For each paper:
1. Extract and analyze citations
2. Find highly relevant related work
3. Identify the paper's position in the field
4. Map connections to foundational papers

Focus on quality over quantity. Explain why papers are related."""
        )
        
        # Knowledge Graph Agent
        self.knowledge_graph_agent = create_knowledge_graph_agent(self.model)
        
        # Contribution Agent
        self.contribution_agent = create_contribution_agent(self.model)
        
        # Reproducibility Agent
        self.reproducibility_agent = create_reproducibility_agent(self.model)
        
        # Summary Agent
        self.summary_agent = ToolCallingAgent(
            tools=[],
            model=self.model,
            name="summarizer",
            instructions="""You are a technical writer creating accessible summaries.

Create summaries at multiple levels:
1. One-sentence summary (Twitter-style)
2. Abstract-length summary (1 paragraph)
3. Executive summary (key points for practitioners)
4. Technical summary (for researchers in the field)

Make complex ideas accessible without losing accuracy."""
        )
    
    def _execute_task(self, task: AgentTask, context: Dict[str, Any]) -> TaskResult:
        """Execute a single agent task."""
        start_time = time.time()
        
        try:
            # Select appropriate agent
            agent = self._get_agent_for_role(task.role)
            
            # Build prompt with context
            full_prompt = self._build_prompt(task.prompt, context)
            
            # Execute
            result = agent.run(full_prompt)
            
            duration = time.time() - start_time
            return TaskResult(
                role=task.role,
                success=True,
                result=result,
                duration=duration
            )
            
        except Exception as e:
            duration = time.time() - start_time
            return TaskResult(
                role=task.role,
                success=False,
                result=None,
                error=str(e),
                duration=duration
            )
    
    def _get_agent_for_role(self, role: AgentRole):
        """Get the agent for a specific role."""
        agent_map = {
            AgentRole.DEEP_ANALYZER: self.analysis_agent,
            AgentRole.CRITIC: self.critique_agent,
            AgentRole.LITERATURE_EXPERT: self.literature_agent,
            AgentRole.KNOWLEDGE_GRAPH: self.knowledge_graph_agent,
            AgentRole.CONTRIBUTION_ANALYZER: self.contribution_agent,
            AgentRole.REPRODUCIBILITY_CHECKER: self.reproducibility_agent,
            AgentRole.SUMMARIZER: self.summary_agent,
        }
        return agent_map.get(role)
    
    def _build_prompt(self, template: str, context: Dict[str, Any]) -> str:
        """Build prompt with context variables."""
        prompt = template
        for key, value in context.items():
            placeholder = f"{{{key}}}"
            if placeholder in prompt:
                prompt = prompt.replace(placeholder, str(value)[:self.config.max_paper_length])
        return prompt
    
    def run_pipeline(
        self,
        paper_url: str,
        parallel: bool = True,
        agents_to_run: Optional[List[AgentRole]] = None
    ) -> Dict[str, Any]:
        """
        Run the complete paper review pipeline.
        
        Args:
            paper_url: URL to the paper PDF
            parallel: Whether to run independent tasks in parallel
            agents_to_run: Specific agents to run (None = all)
            
        Returns:
            Complete review results
        """
        results = {
            "paper_url": paper_url,
            "status": "running",
            "stages": {},
            "final_report": None
        }
        
        # Stage 1: PDF Processing (always first)
        print("\n📥 Stage 1: Processing PDF...")
        try:
            pdf_path = download_pdf(paper_url)
            paper_text = extract_text_from_pdf(pdf_path)
            metadata_json = extract_paper_metadata(paper_text)
            metadata = json.loads(metadata_json)
            
            self.paper_context = {
                "pdf_path": pdf_path,
                "paper_text": paper_text,
                "metadata": metadata,
                "title": metadata.get("title", "Unknown"),
                "abstract": metadata.get("abstract", ""),
            }
            
            results["stages"]["pdf_processing"] = {
                "success": True,
                "text_length": len(paper_text),
                "metadata": metadata
            }
            print(f"   ✓ Processed: {metadata.get('title', 'Unknown')[:60]}...")
            
        except Exception as e:
            results["stages"]["pdf_processing"] = {"success": False, "error": str(e)}
            results["status"] = "failed"
            print(f"   ✗ Failed: {e}")
            return results
        
        # Define analysis tasks
        tasks = [
            AgentTask(
                role=AgentRole.DEEP_ANALYZER,
                prompt="""Analyze this research paper in depth:

Title: {title}
Abstract: {abstract}

Full Paper:
{paper_text}

Provide:
1. Summary of the main approach
2. Key technical innovations
3. Methodology breakdown
4. Main results and findings
5. Limitations mentioned by authors"""
            ),
            AgentTask(
                role=AgentRole.CRITIC,
                prompt="""Provide a critical review of this paper:

Title: {title}
Abstract: {abstract}

Full Paper:
{paper_text}

Assess:
1. Strengths (be specific)
2. Weaknesses (be constructive)
3. Missing elements
4. Questions for authors
5. Scores (1-10): Novelty, Clarity, Significance
6. Overall recommendation"""
            ),
            AgentTask(
                role=AgentRole.CONTRIBUTION_ANALYZER,
                prompt="""Analyze the contributions of this paper:

Paper text:
{paper_text}

Extract and evaluate:
1. Claimed contributions
2. Actual contributions (verified from content)
3. Comparison with baselines
4. Significance of improvements"""
            ),
            AgentTask(
                role=AgentRole.REPRODUCIBILITY_CHECKER,
                prompt="""Assess the reproducibility of this paper:

Paper text:
{paper_text}

Check for:
1. Code availability
2. Hyperparameter details
3. Training procedure
4. Dataset accessibility
5. Compute requirements
6. Reproducibility score"""
            ),
            AgentTask(
                role=AgentRole.SUMMARIZER,
                prompt="""Create summaries of this paper at multiple levels:

Title: {title}
Abstract: {abstract}

Paper text:
{paper_text}

Provide:
1. One-sentence summary (< 280 chars)
2. One-paragraph summary
3. Key takeaways for practitioners
4. Technical summary for researchers"""
            ),
        ]
        
        # Filter tasks if specific agents requested
        if agents_to_run:
            tasks = [t for t in tasks if t.role in agents_to_run]
        
        # Stage 2: Run analysis tasks
        print("\n🔬 Stage 2: Running Analysis Tasks...")
        
        if parallel:
            # Run independent tasks in parallel
            with ThreadPoolExecutor(max_workers=3) as executor:
                futures = {
                    executor.submit(self._execute_task, task, self.paper_context): task
                    for task in tasks
                }
                
                for future in as_completed(futures):
                    task = futures[future]
                    try:
                        result = future.result()
                        results["stages"][task.role.value] = {
                            "success": result.success,
                            "result": result.result,
                            "duration": result.duration
                        }
                        status = "✓" if result.success else "✗"
                        print(f"   {status} {task.role.value}: {result.duration:.1f}s")
                    except Exception as e:
                        results["stages"][task.role.value] = {
                            "success": False,
                            "error": str(e)
                        }
                        print(f"   ✗ {task.role.value}: {e}")
        else:
            # Sequential execution
            for task in tasks:
                print(f"   Running {task.role.value}...")
                result = self._execute_task(task, self.paper_context)
                results["stages"][task.role.value] = {
                    "success": result.success,
                    "result": result.result,
                    "duration": result.duration
                }
                status = "✓" if result.success else "✗"
                print(f"   {status} {task.role.value}: {result.duration:.1f}s")
        
        # Stage 3: Literature Search
        print("\n📚 Stage 3: Finding Related Work...")
        try:
            title = self.paper_context.get("title", "")
            if title:
                ss_results = search_semantic_scholar(title[:100], limit=5)
                arxiv_results = search_arxiv(title[:100], max_results=5)
                citations_json = extract_citations(self.paper_context.get("paper_text", ""))
                
                results["stages"]["literature"] = {
                    "success": True,
                    "semantic_scholar": json.loads(ss_results),
                    "arxiv": json.loads(arxiv_results),
                    "citations": json.loads(citations_json)
                }
                print("   ✓ Literature search complete")
        except Exception as e:
            results["stages"]["literature"] = {"success": False, "error": str(e)}
            print(f"   ✗ Literature search failed: {e}")
        
        # Stage 4: Generate Final Report
        print("\n📝 Stage 4: Generating Report...")
        results["final_report"] = self._generate_final_report(results)
        results["status"] = "complete"
        
        return results
    
    def _generate_final_report(self, results: Dict[str, Any]) -> str:
        """Generate the final consolidated report."""
        
        metadata = results.get("stages", {}).get("pdf_processing", {}).get("metadata", {})
        
        report = f"""# Paper Review Report

## 📄 Paper Information

**Title**: {metadata.get('title', 'Unknown')}
**arXiv ID**: {metadata.get('arxiv_id', 'N/A')}

### Abstract
{metadata.get('abstract', 'No abstract available')}

---

## 🔬 Deep Analysis

{results.get('stages', {}).get('deep_analyzer', {}).get('result', 'Analysis not available')}

---

## ⚖️ Critical Review

{results.get('stages', {}).get('critic', {}).get('result', 'Review not available')}

---

## 🎯 Contributions Analysis

{results.get('stages', {}).get('contribution_analyzer', {}).get('result', 'Not available')}

---

## 🔄 Reproducibility Assessment

{results.get('stages', {}).get('reproducibility_checker', {}).get('result', 'Not available')}

---

## 📝 Summaries

{results.get('stages', {}).get('summarizer', {}).get('result', 'Not available')}

---

## 📚 Related Work

### Semantic Scholar Results
"""
        
        lit = results.get('stages', {}).get('literature', {})
        for paper in lit.get('semantic_scholar', [])[:5]:
            if isinstance(paper, dict):
                report += f"- **{paper.get('title', 'Unknown')}** ({paper.get('year', '')}) - {paper.get('citations', 0)} citations\n"
        
        report += "\n### arXiv Results\n"
        for paper in lit.get('arxiv', [])[:5]:
            if isinstance(paper, dict):
                report += f"- **{paper.get('title', 'Unknown')}** ({paper.get('year', '')})\n"
        
        report += f"""
---

## 📊 Execution Summary

| Stage | Status | Duration |
|-------|--------|----------|
"""
        for stage_name, stage_data in results.get('stages', {}).items():
            if isinstance(stage_data, dict):
                status = "✓" if stage_data.get('success') else "✗"
                duration = stage_data.get('duration', 0)
                report += f"| {stage_name} | {status} | {duration:.1f}s |\n"
        
        report += """
---

*Generated by Open-Source Multi-Agent Paper Review System*
"""
        return report


# ============================================================================
# Convenience Functions
# ============================================================================

def quick_review(paper_url: str, config: Config = None) -> Dict[str, Any]:
    """
    Quick review of a paper with default settings.
    
    Args:
        paper_url: URL to the paper
        config: Optional configuration
        
    Returns:
        Review results
    """
    orchestrator = MultiAgentOrchestrator(config)
    return orchestrator.run_pipeline(paper_url)


def review_with_specific_agents(
    paper_url: str,
    agents: List[AgentRole],
    config: Config = None
) -> Dict[str, Any]:
    """
    Review paper with specific agents only.
    
    Args:
        paper_url: URL to the paper
        agents: List of agent roles to use
        config: Optional configuration
        
    Returns:
        Review results
    """
    orchestrator = MultiAgentOrchestrator(config)
    return orchestrator.run_pipeline(paper_url, agents_to_run=agents)


# ============================================================================
# CLI
# ============================================================================

if __name__ == "__main__":
    import argparse
    
    parser = argparse.ArgumentParser(description="Multi-Agent Paper Review")
    parser.add_argument("paper_url", help="URL to paper")
    parser.add_argument("--sequential", action="store_true", help="Run sequentially")
    parser.add_argument("--output", "-o", help="Output file")
    parser.add_argument("--agents", nargs="+", help="Specific agents to run")
    
    args = parser.parse_args()
    
    config = Config()
    orchestrator = MultiAgentOrchestrator(config)
    
    agents_to_run = None
    if args.agents:
        agents_to_run = [AgentRole(a) for a in args.agents]
    
    results = orchestrator.run_pipeline(
        args.paper_url,
        parallel=not args.sequential,
        agents_to_run=agents_to_run
    )
    
    if args.output:
        with open(args.output, 'w') as f:
            f.write(results.get("final_report", ""))
        print(f"\n✓ Report saved to {args.output}")
    else:
        print("\n" + "="*60)
        print(results.get("final_report", "No report generated"))
