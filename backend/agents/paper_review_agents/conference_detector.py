"""
Conference Format Detection
============================
Auto-detect conference format from benchmark data structure and extract PDF URLs.
"""

from typing import Dict, Any, Optional
from review_schemas import ConferenceFormat


class ConferenceDetector:
    """Utilities for detecting conference format from data structure."""

    @staticmethod
    def detect_from_data(paper_data: Dict[str, Any]) -> ConferenceFormat:
        """
        Auto-detect conference format from paper data structure.

        Detection logic:
        - ICLR: has soundness_avg, contribution_avg, presentation_avg fields
        - NeurIPS: has wc_summary_and_contributions, wc_improvement fields
        - ICML: has recommendation_avg field

        Args:
            paper_data: Dictionary containing paper and review data

        Returns:
            Detected conference format (defaults to ICLR if uncertain)
        """
        # ICLR detection: has specific sub-scores
        if "soundness_avg" in paper_data or "contribution_avg" in paper_data or "presentation_avg" in paper_data:
            return ConferenceFormat.ICLR

        # NeurIPS detection: has specific word count fields
        if "wc_summary_and_contributions" in paper_data or "wc_improvement" in paper_data:
            return ConferenceFormat.NEURIPS

        # ICML detection: has recommendation field (different from rating)
        if "recommendation_avg" in paper_data:
            return ConferenceFormat.ICML

        # Default to ICLR if can't detect
        # (Most common format in the benchmark data)
        return ConferenceFormat.ICLR

    @staticmethod
    def detect_from_file_path(file_path: str) -> Optional[ConferenceFormat]:
        """
        Detect conference format from file path.

        Args:
            file_path: Path to the benchmark data file

        Returns:
            Detected conference format or None if can't determine
        """
        file_path_lower = file_path.lower()

        if "iclr" in file_path_lower:
            return ConferenceFormat.ICLR
        elif "neurips" in file_path_lower or "nips" in file_path_lower:
            return ConferenceFormat.NEURIPS
        elif "icml" in file_path_lower:
            return ConferenceFormat.ICML

        return None

    @staticmethod
    def get_pdf_url(paper_data: Dict[str, Any], conference: ConferenceFormat) -> Optional[str]:
        """
        Extract PDF URL from paper data based on conference format.

        Different conferences store PDF URLs differently:
        - ICLR (OpenReview): Convert forum URL to PDF URL
        - NeurIPS: PDF field or similar conversion
        - ICML: Construct from site URL

        Args:
            paper_data: Dictionary containing paper metadata
            conference: The conference format

        Returns:
            PDF URL if available, None otherwise
        """
        if conference == ConferenceFormat.ICLR:
            # ICLR uses OpenReview
            # Forum URL format: https://openreview.net/forum?id=XXXXXXXX
            # PDF URL format: https://openreview.net/pdf?id=XXXXXXXX
            if "site" in paper_data:
                site_url = paper_data["site"]
                pdf_url = site_url.replace("/forum?", "/pdf?")
                return pdf_url
            elif "pdf" in paper_data:
                return paper_data["pdf"]

        elif conference == ConferenceFormat.NEURIPS:
            # NeurIPS may have direct PDF field
            if "pdf" in paper_data:
                return paper_data["pdf"]
            elif "site" in paper_data:
                # Try similar conversion as ICLR
                site_url = paper_data["site"]
                if "openreview" in site_url:
                    pdf_url = site_url.replace("/forum?", "/pdf?")
                    return pdf_url
                return site_url  # Return site as fallback

        elif conference == ConferenceFormat.ICML:
            # ICML handling
            if "pdf" in paper_data:
                return paper_data["pdf"]
            elif "site" in paper_data:
                site_url = paper_data["site"]
                if "openreview" in site_url:
                    pdf_url = site_url.replace("/forum?", "/pdf?")
                    return pdf_url
                return site_url  # Return site as fallback

        # Final fallback: check for any pdf-related field
        for key in ["pdf", "pdf_url", "pdf_link", "url"]:
            if key in paper_data:
                return paper_data[key]

        return None

    @staticmethod
    def get_required_fields(conference: ConferenceFormat) -> list:
        """
        Get list of required fields for a conference format.

        Used for filtering papers that have complete ground truth data.

        Args:
            conference: The conference format

        Returns:
            List of field names that must be present
        """
        if conference == ConferenceFormat.ICLR:
            return [
                "rating_avg",
                "soundness_avg",
                "presentation_avg",
                "contribution_avg",
                "confidence_avg"
            ]

        elif conference == ConferenceFormat.NEURIPS:
            return [
                "rating_avg",
                "confidence_avg"
            ]

        elif conference == ConferenceFormat.ICML:
            return [
                "recommendation_avg"
            ]

        return []

    @staticmethod
    def is_valid_paper(paper_data: Dict[str, Any], conference: ConferenceFormat) -> bool:
        """
        Check if paper has all required fields for benchmarking.

        Args:
            paper_data: Paper data dictionary
            conference: Conference format

        Returns:
            True if paper is valid for benchmarking
        """
        # Must have PDF URL
        if not ConferenceDetector.get_pdf_url(paper_data, conference):
            return False

        # Must have required ground truth fields
        required_fields = ConferenceDetector.get_required_fields(conference)
        for field in required_fields:
            if field not in paper_data:
                return False
            # Check if field has valid data (not None or empty)
            value = paper_data[field]
            if value is None:
                return False
            # For list fields (avg values stored as [mean, std])
            if isinstance(value, list) and len(value) == 0:
                return False

        return True


__all__ = [
    'ConferenceDetector',
]
