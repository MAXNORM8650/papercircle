"""
Unified Paper Circle API
=========================
Single FastAPI application combining:
- Paper Analysis (mind graphs)
- Paper Review (multi-agent review)
- Research Pipeline (discovery)
"""

from .app import app

__all__ = ["app"]
