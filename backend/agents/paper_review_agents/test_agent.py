#!/usr/bin/env python3
"""
Test Agent Output
==================
Debug script to test what the critic agent actually returns.
"""

from orchestrator import MultiAgentOrchestrator, AgentRole, Config
from review_schemas import ConferenceFormat
import json

# Test configuration
config = Config(
    model_id="ollama_chat/qooba/qwen3-coder-30b-a3b-instruct:q3_k_m",
    api_base="http://10.127.30.115:11434",
    num_ctx=32000
)

# Create orchestrator with ICLR conference
orchestrator = MultiAgentOrchestrator(
    config=config,
    conference=ConferenceFormat.ICLR
)

# Test paper URL (use a small paper for quick testing)
test_url = "https://openreview.net/pdf?id=pB1FeRSQxh"

print("="*60)
print("TESTING CRITIC AGENT OUTPUT")
print("="*60)
print(f"\nPDF URL: {test_url}")
print(f"Conference: ICLR")
print(f"Model: {config.model_id}\n")

try:
    # Run the pipeline
    print("Running pipeline...")
    result = orchestrator.run_pipeline(
        test_url,
        agents_to_run=[AgentRole.CRITIC],
        conference=ConferenceFormat.ICLR
    )

    print("\n" + "="*60)
    print("PIPELINE RESULT")
    print("="*60)

    # Extract critic result
    critic_result = result.get("stages", {}).get("critic", {})

    print(f"\nSuccess: {critic_result.get('success')}")
    print(f"Duration: {critic_result.get('duration', 0):.2f}s")

    if critic_result.get('error'):
        print(f"Error: {critic_result.get('error')}")

    # Get the actual result
    review_output = critic_result.get("result")

    print("\n" + "="*60)
    print("CRITIC OUTPUT ANALYSIS")
    print("="*60)

    print(f"\nOutput Type: {type(review_output).__name__}")
    print(f"Output Length: {len(str(review_output)) if review_output else 0} characters")

    if review_output:
        print(f"\nFirst 500 characters:")
        print("-" * 60)
        print(str(review_output)[:500])
        print("-" * 60)

        # Try to parse as JSON
        print("\n" + "="*60)
        print("PARSING ATTEMPTS")
        print("="*60)

        # Method 1: Direct dict check
        if isinstance(review_output, dict):
            print("\n✓ Already a dictionary!")
            print(f"  Keys: {list(review_output.keys())}")
            if 'soundness' in review_output:
                print(f"  soundness: {review_output.get('soundness')}")
                print(f"  rating: {review_output.get('rating')}")
        else:
            print("\n✗ Not a dictionary")

        # Method 2: Try JSON parse
        try:
            parsed = json.loads(review_output)
            print("\n✓ Successfully parsed with json.loads()!")
            print(f"  Keys: {list(parsed.keys())}")
            if 'soundness' in parsed:
                print(f"  soundness: {parsed.get('soundness')}")
                print(f"  rating: {parsed.get('rating')}")
        except (json.JSONDecodeError, TypeError) as e:
            print(f"\n✗ json.loads() failed: {str(e)[:100]}")

        # Method 3: Try ReviewFormatter
        from review_formatter import ReviewFormatter
        try:
            parsed = ReviewFormatter.parse_and_validate(
                review_output,
                ConferenceFormat.ICLR,
                strict=False
            )
            print("\n✓ ReviewFormatter succeeded!")
            print(f"  Keys: {list(parsed.keys())}")
            if 'soundness' in parsed:
                print(f"  soundness: {parsed.get('soundness')}")
                print(f"  rating: {parsed.get('rating')}")
        except Exception as e:
            print(f"\n✗ ReviewFormatter failed: {str(e)[:100]}")

        # Full output if small enough
        if len(str(review_output)) < 2000:
            print("\n" + "="*60)
            print("FULL OUTPUT")
            print("="*60)
            print(review_output)

except Exception as e:
    print(f"\n✗ ERROR: {str(e)}")
    import traceback
    traceback.print_exc()

print("\n" + "="*60)
print("TEST COMPLETE")
print("="*60)
