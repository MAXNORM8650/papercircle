FROM python:3.11-slim

WORKDIR /app

# Install system dependencies
RUN apt-get update && apt-get install -y \
    build-essential \
    curl \
    && rm -rf /var/lib/apt/lists/*

# Copy requirements first for caching
COPY requirements.txt .
RUN pip install --no-cache-dir --timeout=120 -r requirements.txt

# Copy the entire backend
COPY . .

# Create cache directories
RUN mkdir -p paper_cache research_output

# Expose port
EXPOSE 8000

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
    CMD curl -f http://localhost:8000/health || exit 1

# Default port (Railway overrides with $PORT)
ENV PORT=8000

# Run the unified API
CMD ["sh", "-c", "uvicorn apis.unified.app:app --host 0.0.0.0 --port $PORT"]
