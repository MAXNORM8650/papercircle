#!/bin/bash
# Start Research Pipeline API on port 8002

cd "$(dirname "$0")/../.."
python backend/apis/research_pipeline_api.py
