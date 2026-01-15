"""
Review Schema Definitions for Multiple Conferences
===================================================
Type-safe dataclasses matching ground truth review formats for ICLR, NeurIPS, and ICML.
"""

from dataclasses import dataclass, asdict
from typing import List, Dict, Optional, Any
from enum import Enum


class ConferenceFormat(Enum):
    """Supported conference formats."""
    ICLR = "iclr"
    NEURIPS = "neurips"
    ICML = "icml"


@dataclass
class ICLRReview:
    """
    ICLR review format matching ground truth exactly.

    Target word counts (based on ground truth statistics):
    - summary: ~100 words
    - strengths: ~90 words total
    - weaknesses: ~239 words total
    - questions: ~90 words total
    - total review: ~520 words
    """
    # Scores (scales match ground truth)
    soundness: int  # 1-4 scale: 1=incorrect, 2=fair, 3=good, 4=excellent
    presentation: int  # 1-4 scale: 1=poor, 2=fair, 3=good, 4=excellent
    contribution: int  # 1-4 scale: 1=poor, 2=fair, 3=good, 4=excellent
    rating: int  # 1-10 scale: overall assessment
    confidence: int  # 1-5 scale: reviewer confidence

    # Structured text sections
    summary: str  # Brief summary of the paper
    strengths: List[str]  # List of specific strengths
    weaknesses: List[str]  # List of specific weaknesses
    questions: List[str]  # List of questions for authors

    def to_dict(self) -> Dict[str, Any]:
        """Convert to dictionary."""
        return asdict(self)

    @classmethod
    def from_dict(cls, data: Dict[str, Any]) -> 'ICLRReview':
        """Create from dictionary."""
        return cls(**data)


@dataclass
class NeurIPSReview:
    """
    NeurIPS review format.

    Target word counts (based on ground truth statistics):
    - total review: ~404 words

    Note: NeurIPS has different section structure than ICLR
    """
    # Scores
    rating: int  # 1-10 scale: overall assessment
    confidence: int  # 1-5 scale: reviewer confidence

    # NeurIPS-specific sections
    summary_and_contributions: str  # Combined summary and contribution assessment
    strengths: str  # Strengths section (paragraph format, not list)
    weaknesses_and_improvements: str  # Combined weaknesses and suggested improvements
    questions_and_suggestions: str  # Questions for authors and suggestions
    limitations: str  # Discussion of limitations
    ethical_concerns: Optional[str] = None  # Optional ethical concerns

    # Qualitative assessments (derived from numerical scores if needed)
    soundness: Optional[str] = None  # "poor", "fair", "good", "excellent"
    presentation_quality: Optional[str] = None  # "poor", "fair", "good", "excellent"
    contribution_significance: Optional[str] = None  # "poor", "fair", "good", "excellent"

    def to_dict(self) -> Dict[str, Any]:
        """Convert to dictionary."""
        return asdict(self)

    @classmethod
    def from_dict(cls, data: Dict[str, Any]) -> 'NeurIPSReview':
        """Create from dictionary."""
        return cls(**data)


@dataclass
class ICMLReview:
    """
    ICML review format.

    Target word counts (based on ground truth statistics):
    - total review: ~528 words (most comprehensive)

    CRITICAL: ICML uses an INVERTED recommendation scale:
    1 = Strong Reject, 2 = Weak Reject, 3 = Weak Accept, 4 = Strong Accept
    This is opposite of typical scoring where higher is better!
    """
    # Scores (INVERTED SCALE!)
    recommendation: int  # 1-4 scale: 1=strong reject, 2=weak reject, 3=weak accept, 4=strong accept

    # ICML-specific comprehensive sections
    summary: str  # High-level summary
    claims_and_evidence: str  # Assessment of claims and supporting evidence
    methods_and_evaluation: str  # Evaluation of methodology and experimental design
    theoretical_claims: str  # Assessment of theoretical contributions
    experimental_designs_or_analyses: str  # Detailed experimental analysis
    supplementary_material: str  # Assessment of supplementary materials
    relation_to_broader_scientific_literature: str  # Context in broader research
    strengths_and_weaknesses: str  # Combined strengths and weaknesses
    essential_references_not_discussed: str  # Missing important references
    questions: str  # Questions for authors

    def to_dict(self) -> Dict[str, Any]:
        """Convert to dictionary."""
        return asdict(self)

    @classmethod
    def from_dict(cls, data: Dict[str, Any]) -> 'ICMLReview':
        """Create from dictionary."""
        return cls(**data)


# Mapping of conference formats to their review classes
CONFERENCE_REVIEW_CLASSES = {
    ConferenceFormat.ICLR: ICLRReview,
    ConferenceFormat.NEURIPS: NeurIPSReview,
    ConferenceFormat.ICML: ICMLReview,
}


def get_review_class(conference: ConferenceFormat):
    """Get the appropriate review class for a conference format."""
    return CONFERENCE_REVIEW_CLASSES[conference]


__all__ = [
    'ConferenceFormat',
    'ICLRReview',
    'NeurIPSReview',
    'ICMLReview',
    'CONFERENCE_REVIEW_CLASSES',
    'get_review_class',
]
