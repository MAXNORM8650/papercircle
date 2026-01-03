"""
Paper Mind Graph - Verification & Coverage
==========================================
Ensures nothing is silently dropped and provides coverage reports.
"""

from typing import List, Dict, Any, Set, Tuple
from dataclasses import dataclass, field
from enum import Enum

from .schema import (
    MindGraph, GraphNode, GraphEdge, NodeType, EdgeType,
    VerificationStatus, Figure, Table, Section, Equation
)


# ============================================================================
# Coverage Status
# ============================================================================

class CoverageStatus(str, Enum):
    """Status of coverage for an item."""
    FULLY_LINKED = "fully_linked"
    PARTIALLY_LINKED = "partially_linked"
    UNLINKED = "unlinked"
    MISSING = "missing"


@dataclass
class CoverageItem:
    """An item in the coverage report."""
    item_type: str  # "figure", "table", "section", "equation"
    item_id: str
    label: str
    status: CoverageStatus
    linked_to: List[str] = field(default_factory=list)
    issues: List[str] = field(default_factory=list)
    suggestions: List[str] = field(default_factory=list)


@dataclass
class CoverageReport:
    """Complete coverage report for a paper."""
    paper_id: str
    
    # Coverage items
    figures: List[CoverageItem] = field(default_factory=list)
    tables: List[CoverageItem] = field(default_factory=list)
    sections: List[CoverageItem] = field(default_factory=list)
    equations: List[CoverageItem] = field(default_factory=list)
    
    # Summary stats
    total_figures: int = 0
    linked_figures: int = 0
    total_tables: int = 0
    linked_tables: int = 0
    total_sections: int = 0
    sections_with_concepts: int = 0
    total_equations: int = 0
    linked_equations: int = 0
    
    # Auto-generated nodes
    auto_nodes: int = 0
    verified_nodes: int = 0
    
    # Issues
    critical_issues: List[str] = field(default_factory=list)
    warnings: List[str] = field(default_factory=list)
    
    def get_coverage_score(self) -> float:
        """Calculate overall coverage score (0-100)."""
        scores = []
        
        if self.total_figures > 0:
            scores.append(self.linked_figures / self.total_figures)
        if self.total_tables > 0:
            scores.append(self.linked_tables / self.total_tables)
        if self.total_sections > 0:
            scores.append(self.sections_with_concepts / self.total_sections)
        if self.total_equations > 0:
            scores.append(self.linked_equations / self.total_equations)
        
        if not scores:
            return 100.0
        
        return round(sum(scores) / len(scores) * 100, 1)
    
    def to_dict(self) -> Dict:
        """Convert to dictionary."""
        return {
            "paper_id": self.paper_id,
            "coverage_score": self.get_coverage_score(),
            "summary": {
                "figures": f"{self.linked_figures}/{self.total_figures}",
                "tables": f"{self.linked_tables}/{self.total_tables}",
                "sections": f"{self.sections_with_concepts}/{self.total_sections}",
                "equations": f"{self.linked_equations}/{self.total_equations}",
            },
            "nodes": {
                "auto_generated": self.auto_nodes,
                "human_verified": self.verified_nodes
            },
            "figures": [self._item_to_dict(f) for f in self.figures],
            "tables": [self._item_to_dict(t) for t in self.tables],
            "sections": [self._item_to_dict(s) for s in self.sections],
            "equations": [self._item_to_dict(e) for e in self.equations],
            "critical_issues": self.critical_issues,
            "warnings": self.warnings
        }
    
    def _item_to_dict(self, item: CoverageItem) -> Dict:
        return {
            "id": item.item_id,
            "label": item.label,
            "status": item.status.value,
            "linked_to": item.linked_to,
            "issues": item.issues,
            "suggestions": item.suggestions
        }
    
    def to_markdown(self) -> str:
        """Generate markdown report."""
        md = f"""# Coverage Report

## Summary

**Overall Coverage Score: {self.get_coverage_score()}%**

| Category | Coverage |
|----------|----------|
| Figures | {self.linked_figures}/{self.total_figures} |
| Tables | {self.linked_tables}/{self.total_tables} |
| Sections with Concepts | {self.sections_with_concepts}/{self.total_sections} |
| Equations | {self.linked_equations}/{self.total_equations} |

**Nodes:** {self.auto_nodes} auto-generated, {self.verified_nodes} human-verified

"""
        
        # Critical issues
        if self.critical_issues:
            md += "## ❌ Critical Issues\n\n"
            for issue in self.critical_issues:
                md += f"- {issue}\n"
            md += "\n"
        
        # Warnings
        if self.warnings:
            md += "## ⚠️ Warnings\n\n"
            for warning in self.warnings:
                md += f"- {warning}\n"
            md += "\n"
        
        # Unlinked items
        unlinked = []
        for fig in self.figures:
            if fig.status == CoverageStatus.UNLINKED:
                unlinked.append(f"- **{fig.label}**: {', '.join(fig.suggestions)}")
        for table in self.tables:
            if table.status == CoverageStatus.UNLINKED:
                unlinked.append(f"- **{table.label}**: {', '.join(table.suggestions)}")
        
        if unlinked:
            md += "## 🔴 Unlinked Items\n\n"
            md += "These items have no connections to concepts/methods:\n\n"
            md += "\n".join(unlinked) + "\n\n"
        
        # Detailed breakdown
        md += "## Detailed Breakdown\n\n"
        
        md += "### Figures\n\n"
        for fig in self.figures:
            status_icon = "✅" if fig.status == CoverageStatus.FULLY_LINKED else "🔴"
            linked = f" → {', '.join(fig.linked_to)}" if fig.linked_to else ""
            md += f"- {status_icon} {fig.label}{linked}\n"
        
        md += "\n### Tables\n\n"
        for table in self.tables:
            status_icon = "✅" if table.status == CoverageStatus.FULLY_LINKED else "🔴"
            linked = f" → {', '.join(table.linked_to)}" if table.linked_to else ""
            md += f"- {status_icon} {table.label}{linked}\n"
        
        return md


# ============================================================================
# Coverage Checker
# ============================================================================

class CoverageChecker:
    """
    Checks coverage of the mind graph to ensure nothing is missed.
    """
    
    def __init__(self, graph: MindGraph):
        self.graph = graph
    
    def check_coverage(self) -> CoverageReport:
        """
        Run all coverage checks and generate report.
        
        Returns:
            CoverageReport with detailed coverage information
        """
        report = CoverageReport(paper_id=self.graph.paper_id)
        
        # Check figures
        self._check_figures(report)
        
        # Check tables
        self._check_tables(report)
        
        # Check sections
        self._check_sections(report)
        
        # Check equations
        self._check_equations(report)
        
        # Count node verification status
        self._count_verification_status(report)
        
        # Generate issues and warnings
        self._generate_issues(report)
        
        return report
    
    def _check_figures(self, report: CoverageReport):
        """Check figure coverage."""
        report.total_figures = len(self.graph.figures)
        
        for fig in self.graph.figures:
            # Find edges pointing to this figure
            edges_to = self.graph.get_edges_to(fig.id)
            linked_nodes = []
            
            for edge in edges_to:
                if edge.type in [EdgeType.ILLUSTRATED_BY, EdgeType.RELATED_TO]:
                    source_node = self.graph.get_node(edge.source_id)
                    if source_node:
                        linked_nodes.append(source_node.title)
            
            if linked_nodes:
                status = CoverageStatus.FULLY_LINKED
                report.linked_figures += 1
            else:
                status = CoverageStatus.UNLINKED
            
            item = CoverageItem(
                item_type="figure",
                item_id=fig.id,
                label=fig.label,
                status=status,
                linked_to=linked_nodes
            )
            
            if status == CoverageStatus.UNLINKED:
                item.issues.append("No concepts/methods linked to this figure")
                item.suggestions.append("Consider linking to relevant concepts")
            
            report.figures.append(item)
    
    def _check_tables(self, report: CoverageReport):
        """Check table coverage."""
        report.total_tables = len(self.graph.tables)
        
        for table in self.graph.tables:
            edges_to = self.graph.get_edges_to(table.id)
            linked_nodes = []
            
            for edge in edges_to:
                if edge.type in [EdgeType.SUMMARIZED_BY, EdgeType.RELATED_TO]:
                    source_node = self.graph.get_node(edge.source_id)
                    if source_node:
                        linked_nodes.append(source_node.title)
            
            if linked_nodes:
                status = CoverageStatus.FULLY_LINKED
                report.linked_tables += 1
            else:
                status = CoverageStatus.UNLINKED
            
            item = CoverageItem(
                item_type="table",
                item_id=table.id,
                label=table.label,
                status=status,
                linked_to=linked_nodes
            )
            
            if status == CoverageStatus.UNLINKED:
                item.issues.append("No concepts/methods linked to this table")
                item.suggestions.append("Consider linking to relevant experiments/results")
            
            report.tables.append(item)
    
    def _check_sections(self, report: CoverageReport):
        """Check section coverage (do they have concepts?)."""
        report.total_sections = len(self.graph.sections)
        
        for section in self.graph.sections:
            # Find concepts defined in this section
            edges_from = self.graph.get_edges_from(section.id)
            concepts = []
            
            for edge in edges_from:
                if edge.type == EdgeType.DEFINES:
                    target_node = self.graph.get_node(edge.target_id)
                    if target_node and target_node.type == NodeType.CONCEPT:
                        concepts.append(target_node.title)
            
            if concepts:
                status = CoverageStatus.FULLY_LINKED
                report.sections_with_concepts += 1
            else:
                # Some sections might not have concepts (e.g., References)
                if any(kw in section.title.lower() for kw in 
                       ["reference", "appendix", "acknowledgment", "supplement"]):
                    status = CoverageStatus.FULLY_LINKED
                    report.sections_with_concepts += 1
                else:
                    status = CoverageStatus.UNLINKED
            
            item = CoverageItem(
                item_type="section",
                item_id=section.id,
                label=section.title,
                status=status,
                linked_to=concepts
            )
            
            if status == CoverageStatus.UNLINKED:
                item.issues.append("No concepts extracted from this section")
                item.suggestions.append("Review section for key concepts")
            
            report.sections.append(item)
    
    def _check_equations(self, report: CoverageReport):
        """Check equation coverage."""
        report.total_equations = len(self.graph.equations)
        
        for eq in self.graph.equations:
            edges_to = self.graph.get_edges_to(eq.id)
            linked_nodes = []
            
            for edge in edges_to:
                if edge.type == EdgeType.DERIVED_BY:
                    source_node = self.graph.get_node(edge.source_id)
                    if source_node:
                        linked_nodes.append(source_node.title)
            
            if linked_nodes:
                status = CoverageStatus.FULLY_LINKED
                report.linked_equations += 1
            else:
                status = CoverageStatus.UNLINKED
            
            item = CoverageItem(
                item_type="equation",
                item_id=eq.id,
                label=f"Equation {eq.equation_number}" if eq.equation_number else eq.id,
                status=status,
                linked_to=linked_nodes
            )
            
            if status == CoverageStatus.UNLINKED:
                item.issues.append("Equation not linked to any concept")
                item.suggestions.append("Link to concept it defines or supports")
            
            report.equations.append(item)
    
    def _count_verification_status(self, report: CoverageReport):
        """Count nodes by verification status."""
        for node in self.graph.nodes.values():
            if node.verification_status == VerificationStatus.HUMAN_VERIFIED:
                report.verified_nodes += 1
            else:
                report.auto_nodes += 1
    
    def _generate_issues(self, report: CoverageReport):
        """Generate issues and warnings based on coverage."""
        # Critical: Missing structural elements
        if report.total_figures > 0 and report.linked_figures == 0:
            report.critical_issues.append("No figures are linked to concepts/methods")
        
        if report.total_tables > 0 and report.linked_tables == 0:
            report.critical_issues.append("No tables are linked to results/methods")
        
        if report.sections_with_concepts == 0 and report.total_sections > 0:
            report.critical_issues.append("No concepts extracted from any section")
        
        # Warnings
        coverage = report.get_coverage_score()
        if coverage < 50:
            report.warnings.append(f"Low overall coverage ({coverage}%)")
        
        if report.verified_nodes == 0 and len(self.graph.nodes) > 10:
            report.warnings.append("No nodes have been human-verified")
        
        # Check for isolated nodes (no edges)
        isolated = []
        for node_id, node in self.graph.nodes.items():
            if node.type in [NodeType.CONCEPT, NodeType.METHOD]:
                edges_from = self.graph.get_edges_from(node_id)
                edges_to = self.graph.get_edges_to(node_id)
                if not edges_from and not edges_to:
                    isolated.append(node.title)
        
        if isolated:
            report.warnings.append(
                f"Isolated nodes (no connections): {', '.join(isolated[:5])}"
                + (f" and {len(isolated)-5} more" if len(isolated) > 5 else "")
            )


# ============================================================================
# Verification Manager
# ============================================================================

class VerificationManager:
    """
    Manages human verification of graph elements.
    """
    
    def __init__(self, graph: MindGraph):
        self.graph = graph
        self.edit_history: List[Dict] = []
    
    def verify_node(self, node_id: str, verified_by: str = "human") -> bool:
        """Mark a node as human-verified."""
        node = self.graph.get_node(node_id)
        if not node:
            return False
        
        node.verification_status = VerificationStatus.HUMAN_VERIFIED
        node.modified_by = verified_by
        
        self._log_edit("verify", node_id, {"verified_by": verified_by})
        return True
    
    def edit_node(
        self,
        node_id: str,
        title: str = None,
        description: str = None,
        edited_by: str = "human"
    ) -> bool:
        """Edit a node's content."""
        node = self.graph.get_node(node_id)
        if not node:
            return False
        
        old_values = {
            "title": node.title,
            "description": node.description
        }
        
        if title is not None:
            node.title = title
        if description is not None:
            node.description = description
        
        node.verification_status = VerificationStatus.HUMAN_EDITED
        node.modified_by = edited_by
        
        self._log_edit("edit", node_id, {
            "old": old_values,
            "new": {"title": node.title, "description": node.description}
        })
        return True
    
    def add_edge(
        self,
        source_id: str,
        target_id: str,
        edge_type: EdgeType,
        reason: str = None
    ) -> str:
        """Add a new edge (human-created)."""
        from .schema import create_edge
        
        edge = create_edge(edge_type, source_id, target_id, reason)
        edge.verification_status = VerificationStatus.HUMAN_EDITED
        
        self.graph.add_edge(edge)
        self._log_edit("add_edge", edge.id, {
            "source": source_id,
            "target": target_id,
            "type": edge_type.value
        })
        
        return edge.id
    
    def remove_edge(self, edge_id: str) -> bool:
        """Remove an edge."""
        if edge_id not in self.graph.edges:
            return False
        
        edge = self.graph.edges[edge_id]
        self._log_edit("remove_edge", edge_id, edge.to_dict())
        
        del self.graph.edges[edge_id]
        return True
    
    def flag_for_review(self, node_id: str, reason: str = "") -> bool:
        """Flag a node for review."""
        node = self.graph.get_node(node_id)
        if not node:
            return False
        
        node.verification_status = VerificationStatus.FLAGGED
        node.properties["flag_reason"] = reason
        
        self._log_edit("flag", node_id, {"reason": reason})
        return True
    
    def get_unverified_nodes(self) -> List[GraphNode]:
        """Get all nodes that haven't been verified."""
        return [
            n for n in self.graph.nodes.values()
            if n.verification_status == VerificationStatus.AUTO_GENERATED
        ]
    
    def get_flagged_nodes(self) -> List[GraphNode]:
        """Get all flagged nodes."""
        return [
            n for n in self.graph.nodes.values()
            if n.verification_status == VerificationStatus.FLAGGED
        ]
    
    def get_edit_history(self) -> List[Dict]:
        """Get the edit history."""
        return self.edit_history
    
    def _log_edit(self, action: str, item_id: str, details: Dict):
        """Log an edit action."""
        from datetime import datetime
        
        self.edit_history.append({
            "timestamp": datetime.now().isoformat(),
            "action": action,
            "item_id": item_id,
            "details": details
        })


# ============================================================================
# Convenience Functions
# ============================================================================

def check_coverage(graph: MindGraph) -> CoverageReport:
    """Quick function to check coverage."""
    checker = CoverageChecker(graph)
    return checker.check_coverage()


def get_unlinked_items(graph: MindGraph) -> Dict[str, List[str]]:
    """Get all unlinked items."""
    report = check_coverage(graph)
    
    return {
        "figures": [f.label for f in report.figures if f.status == CoverageStatus.UNLINKED],
        "tables": [t.label for t in report.tables if t.status == CoverageStatus.UNLINKED],
        "sections": [s.label for s in report.sections if s.status == CoverageStatus.UNLINKED],
        "equations": [e.label for e in report.equations if e.status == CoverageStatus.UNLINKED]
    }
