"""
Review Formatting and Parsing Utilities
========================================
Utilities for generating JSON schemas, parsing LLM outputs, and validating review structures.
"""

import json
import re
from typing import Dict, Any, Type, Optional
from review_schemas import (
    ConferenceFormat,
    ICLRReview,
    NeurIPSReview,
    ICMLReview,
    get_review_class,
)


class ReviewFormatter:
    """Utilities for formatting and parsing conference-specific reviews."""

    @staticmethod
    def get_schema(conference: ConferenceFormat) -> Type:
        """
        Get the appropriate schema class for a conference.

        Args:
            conference: The conference format

        Returns:
            The dataclass type for the conference
        """
        return get_review_class(conference)

    @staticmethod
    def create_json_schema(conference: ConferenceFormat) -> str:
        """
        Generate a JSON schema string for LLM prompting.

        This creates a clear, example-driven schema that LLMs can follow
        to ensure structured output.

        Args:
            conference: The conference format

        Returns:
            JSON schema string suitable for inclusion in LLM prompts
        """
        if conference == ConferenceFormat.ICLR:
            return """{
  "soundness": <1-4>,
  "presentation": <1-4>,
  "contribution": <1-4>,
  "rating": <1-10>,
  "confidence": <1-5>,
  "summary": "<~100 word summary of the paper>",
  "strengths": [
    "<specific strength 1>",
    "<specific strength 2>",
    "<specific strength 3>"
  ],
  "weaknesses": [
    "<specific weakness 1>",
    "<specific weakness 2>",
    "<specific weakness 3>"
  ],
  "questions": [
    "<question for authors 1>",
    "<question for authors 2>",
    "<question for authors 3>"
  ]
}"""

        elif conference == ConferenceFormat.NEURIPS:
            return """{
  "rating": <1-10>,
  "confidence": <1-5>,
  "summary_and_contributions": "<paragraph summarizing paper and its contributions>",
  "strengths": "<paragraph describing strengths>",
  "weaknesses_and_improvements": "<paragraph describing weaknesses and suggested improvements>",
  "questions_and_suggestions": "<paragraph with questions for authors>",
  "limitations": "<paragraph discussing limitations>",
  "ethical_concerns": "<optional: any ethical concerns or null>",
  "soundness": "<poor|fair|good|excellent>",
  "presentation_quality": "<poor|fair|good|excellent>",
  "contribution_significance": "<poor|fair|good|excellent>"
}"""

        elif conference == ConferenceFormat.ICML:
            return """{
  "recommendation": <1-4>,
  "summary": "<high-level summary>",
  "claims_and_evidence": "<assessment of claims and evidence>",
  "methods_and_evaluation": "<evaluation of methodology>",
  "theoretical_claims": "<assessment of theoretical contributions>",
  "experimental_designs_or_analyses": "<detailed experimental analysis>",
  "supplementary_material": "<assessment of supplementary materials>",
  "relation_to_broader_scientific_literature": "<context in broader research>",
  "strengths_and_weaknesses": "<combined strengths and weaknesses>",
  "essential_references_not_discussed": "<missing important references>",
  "questions": "<questions for authors>"
}"""

        else:
            raise ValueError(f"Unknown conference format: {conference}")

    @staticmethod
    def extract_json_from_markdown(text: str) -> str:
        """
        Extract JSON from markdown code blocks or raw JSON.

        Handles cases where LLMs wrap JSON in ```json blocks or output raw JSON.

        Args:
            text: Text potentially containing JSON

        Returns:
            Extracted JSON string

        Raises:
            ValueError: If no valid JSON found
        """
        # Try to find JSON in code blocks first
        code_block_patterns = [
            r'```json\s*(.*?)\s*```',  # ```json ... ```
            r'```\s*(.*?)\s*```',  # ``` ... ```
        ]

        for pattern in code_block_patterns:
            matches = re.findall(pattern, text, re.DOTALL | re.IGNORECASE)
            if matches:
                # Return the first match
                return matches[0].strip()

        # If no code block, try to find raw JSON (looking for { ... })
        # Find the first { and last }
        first_brace = text.find('{')
        last_brace = text.rfind('}')

        if first_brace != -1 and last_brace != -1 and last_brace > first_brace:
            potential_json = text[first_brace:last_brace + 1]
            # Validate it's actually JSON
            try:
                json.loads(potential_json)
                return potential_json
            except json.JSONDecodeError:
                pass

        raise ValueError("No valid JSON found in text")

    @staticmethod
    def parse_and_validate(
        review_text: str,
        conference: ConferenceFormat,
        strict: bool = False
    ) -> Dict[str, Any]:
        """
        Parse LLM output and validate against schema.

        Args:
            review_text: The raw text output from the LLM
            conference: The conference format to validate against
            strict: If True, raise errors on validation failures. If False,
                   return partial results with null values for missing fields.

        Returns:
            Parsed and validated review dictionary

        Raises:
            ValueError: If parsing fails and strict=True
        """
        try:
            # Extract JSON from text
            json_str = ReviewFormatter.extract_json_from_markdown(review_text)

            # Parse JSON
            review_data = json.loads(json_str)

            # Get the schema class
            review_class = ReviewFormatter.get_schema(conference)

            # Validate fields
            if strict:
                # Create instance to validate (will raise TypeError if fields missing)
                review_instance = review_class.from_dict(review_data)
                return review_instance.to_dict()
            else:
                # Lenient mode: fill missing fields with None
                return ReviewFormatter._validate_lenient(review_data, conference)

        except Exception as e:
            if strict:
                raise ValueError(f"Failed to parse review: {str(e)}")
            else:
                # Return empty structure with error
                return ReviewFormatter._get_empty_review(conference, error=str(e))

    @staticmethod
    def _validate_lenient(data: Dict[str, Any], conference: ConferenceFormat) -> Dict[str, Any]:
        """
        Validate review data leniently, filling missing fields with None.

        Args:
            data: Parsed JSON data
            conference: Conference format

        Returns:
            Validated dictionary with all required fields (None for missing)
        """
        if conference == ConferenceFormat.ICLR:
            return {
                "soundness": data.get("soundness"),
                "presentation": data.get("presentation"),
                "contribution": data.get("contribution"),
                "rating": data.get("rating"),
                "confidence": data.get("confidence"),
                "summary": data.get("summary", ""),
                "strengths": data.get("strengths", []),
                "weaknesses": data.get("weaknesses", []),
                "questions": data.get("questions", []),
            }

        elif conference == ConferenceFormat.NEURIPS:
            return {
                "rating": data.get("rating"),
                "confidence": data.get("confidence"),
                "summary_and_contributions": data.get("summary_and_contributions", ""),
                "strengths": data.get("strengths", ""),
                "weaknesses_and_improvements": data.get("weaknesses_and_improvements", ""),
                "questions_and_suggestions": data.get("questions_and_suggestions", ""),
                "limitations": data.get("limitations", ""),
                "ethical_concerns": data.get("ethical_concerns"),
                "soundness": data.get("soundness"),
                "presentation_quality": data.get("presentation_quality"),
                "contribution_significance": data.get("contribution_significance"),
            }

        elif conference == ConferenceFormat.ICML:
            return {
                "recommendation": data.get("recommendation"),
                "summary": data.get("summary", ""),
                "claims_and_evidence": data.get("claims_and_evidence", ""),
                "methods_and_evaluation": data.get("methods_and_evaluation", ""),
                "theoretical_claims": data.get("theoretical_claims", ""),
                "experimental_designs_or_analyses": data.get("experimental_designs_or_analyses", ""),
                "supplementary_material": data.get("supplementary_material", ""),
                "relation_to_broader_scientific_literature": data.get("relation_to_broader_scientific_literature", ""),
                "strengths_and_weaknesses": data.get("strengths_and_weaknesses", ""),
                "essential_references_not_discussed": data.get("essential_references_not_discussed", ""),
                "questions": data.get("questions", ""),
            }

        else:
            raise ValueError(f"Unknown conference format: {conference}")

    @staticmethod
    def _get_empty_review(conference: ConferenceFormat, error: str = "") -> Dict[str, Any]:
        """
        Get an empty review structure with all fields set to None.

        Args:
            conference: Conference format
            error: Optional error message to include

        Returns:
            Empty review dictionary
        """
        base = {"_parse_error": error}

        if conference == ConferenceFormat.ICLR:
            base.update({
                "soundness": None,
                "presentation": None,
                "contribution": None,
                "rating": None,
                "confidence": None,
                "summary": "",
                "strengths": [],
                "weaknesses": [],
                "questions": [],
            })

        elif conference == ConferenceFormat.NEURIPS:
            base.update({
                "rating": None,
                "confidence": None,
                "summary_and_contributions": "",
                "strengths": "",
                "weaknesses_and_improvements": "",
                "questions_and_suggestions": "",
                "limitations": "",
                "ethical_concerns": None,
                "soundness": None,
                "presentation_quality": None,
                "contribution_significance": None,
            })

        elif conference == ConferenceFormat.ICML:
            base.update({
                "recommendation": None,
                "summary": "",
                "claims_and_evidence": "",
                "methods_and_evaluation": "",
                "theoretical_claims": "",
                "experimental_designs_or_analyses": "",
                "supplementary_material": "",
                "relation_to_broader_scientific_literature": "",
                "strengths_and_weaknesses": "",
                "essential_references_not_discussed": "",
                "questions": "",
            })

        return base


__all__ = [
    'ReviewFormatter',
]
