import { Edge } from '../../contexts/LineageAnalysisContext';

/**
 * RelationshipManager
 * Utility for extracting, validating, and merging AI-generated edges
 */

// ============================================================================
// Types
// ============================================================================

interface ReviewLineageRelationship {
  target_paper_title: string;
  target_paper_arxiv_id?: string;
  edge_type: string;
  similarity_score: number;
  rationale: string;
  matched_paper_id?: string;
}

interface ReviewResult {
  lineage_relationships?: ReviewLineageRelationship[];
  review_data?: any;
  graph_data?: any;
  paper_id?: string;
}

// ============================================================================
// Extract Edges from Review
// ============================================================================

export function extractEdgesFromReview(
  review: ReviewResult,
  sourcePaperId: string
): Edge[] {
  if (!review.lineage_relationships || review.lineage_relationships.length === 0) {
    return [];
  }

  return review.lineage_relationships.map((rel) => ({
    source_paper_id: sourcePaperId,
    target_paper_id: rel.matched_paper_id || '',
    edge_type: rel.edge_type,
    similarity_score: rel.similarity_score,
    rationale: rel.rationale,
    target_title: rel.target_paper_title,
    target_authors: '',
    target_year: '',
    is_ai_generated: true,
    source_type: 'ai_review' as const,
    confidence_score: calculateConfidence({
      similarity_score: rel.similarity_score,
      has_matched_id: !!rel.matched_paper_id,
      has_arxiv_id: !!rel.target_paper_arxiv_id,
    }),
  }));
}

// ============================================================================
// Calculate Confidence Score
// ============================================================================

interface ConfidenceFactors {
  similarity_score?: number;
  has_matched_id?: boolean;
  has_arxiv_id?: boolean;
}

export function calculateConfidence(factors: ConfidenceFactors): number {
  let confidence = factors.similarity_score || 0.5;

  // Boost confidence if we have a matched paper ID in database
  if (factors.has_matched_id) {
    confidence = Math.min(1.0, confidence + 0.2);
  }

  // Boost confidence if we have an arXiv ID
  if (factors.has_arxiv_id) {
    confidence = Math.min(1.0, confidence + 0.1);
  }

  return confidence;
}

// ============================================================================
// Merge Edges (with deduplication)
// ============================================================================

export function mergeEdges(existing: Edge[], newEdges: Edge[]): Edge[] {
  const merged = [...existing];
  const existingKeys = new Set(
    existing.map((e) => generateEdgeKey(e))
  );

  for (const edge of newEdges) {
    const key = generateEdgeKey(edge);
    if (!existingKeys.has(key)) {
      merged.push(edge);
      existingKeys.add(key);
    }
  }

  return merged;
}

// ============================================================================
// Deduplicate Edges
// ============================================================================

export function deduplicateEdges(edges: Edge[]): Edge[] {
  const seen = new Set<string>();
  const deduplicated: Edge[] = [];

  for (const edge of edges) {
    const key = generateEdgeKey(edge);
    if (!seen.has(key)) {
      seen.add(key);
      deduplicated.push(edge);
    }
  }

  return deduplicated;
}

// ============================================================================
// Edge Key Generation
// ============================================================================

function generateEdgeKey(edge: Edge): string {
  return `${edge.source_paper_id}-${edge.target_paper_id}-${edge.edge_type}`;
}

// ============================================================================
// Filter Edges by Confidence
// ============================================================================

export function filterEdgesByConfidence(
  edges: Edge[],
  minConfidence: number = 0.5
): Edge[] {
  return edges.filter((e) => (e.confidence_score || 0) >= minConfidence);
}

// ============================================================================
// Group Edges by Type
// ============================================================================

export function groupEdgesByType(edges: Edge[]): Record<string, Edge[]> {
  const grouped: Record<string, Edge[]> = {};

  for (const edge of edges) {
    if (!grouped[edge.edge_type]) {
      grouped[edge.edge_type] = [];
    }
    grouped[edge.edge_type].push(edge);
  }

  return grouped;
}

// ============================================================================
// Get Confidence Level
// ============================================================================

export type ConfidenceLevel = 'high' | 'medium' | 'low';

export function getConfidenceLevel(score: number): ConfidenceLevel {
  if (score >= 0.8) return 'high';
  if (score >= 0.5) return 'medium';
  return 'low';
}

// ============================================================================
// Validate Edge
// ============================================================================

export function validateEdge(edge: Edge): { valid: boolean; errors: string[] } {
  const errors: string[] = [];

  if (!edge.source_paper_id || edge.source_paper_id.trim() === '') {
    errors.push('Missing source_paper_id');
  }

  if (!edge.target_paper_id || edge.target_paper_id.trim() === '') {
    errors.push('Missing target_paper_id');
  }

  if (!edge.edge_type || edge.edge_type.trim() === '') {
    errors.push('Missing edge_type');
  }

  const validEdgeTypes = [
    'extends',
    'applies',
    'evaluates',
    'contradicts',
    'survey',
    'prerequisite',
  ];

  if (edge.edge_type && !validEdgeTypes.includes(edge.edge_type)) {
    errors.push(`Invalid edge_type: ${edge.edge_type}`);
  }

  if (
    edge.similarity_score !== undefined &&
    (edge.similarity_score < 0 || edge.similarity_score > 1)
  ) {
    errors.push('similarity_score must be between 0 and 1');
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}

// ============================================================================
// Batch Validate Edges
// ============================================================================

export function validateEdges(edges: Edge[]): {
  valid: Edge[];
  invalid: Array<{ edge: Edge; errors: string[] }>;
} {
  const valid: Edge[] = [];
  const invalid: Array<{ edge: Edge; errors: string[] }> = [];

  for (const edge of edges) {
    const validation = validateEdge(edge);
    if (validation.valid) {
      valid.push(edge);
    } else {
      invalid.push({ edge, errors: validation.errors });
    }
  }

  return { valid, invalid };
}

// ============================================================================
// Sort Edges by Confidence
// ============================================================================

export function sortEdgesByConfidence(edges: Edge[], ascending = false): Edge[] {
  return [...edges].sort((a, b) => {
    const scoreA = a.confidence_score || 0;
    const scoreB = b.confidence_score || 0;
    return ascending ? scoreA - scoreB : scoreB - scoreA;
  });
}

// ============================================================================
// Get Edge Statistics
// ============================================================================

export interface EdgeStatistics {
  total: number;
  byType: Record<string, number>;
  byConfidence: {
    high: number;
    medium: number;
    low: number;
  };
  averageConfidence: number;
}

export function getEdgeStatistics(edges: Edge[]): EdgeStatistics {
  const byType: Record<string, number> = {};
  const byConfidence = { high: 0, medium: 0, low: 0 };
  let totalConfidence = 0;

  for (const edge of edges) {
    // Count by type
    byType[edge.edge_type] = (byType[edge.edge_type] || 0) + 1;

    // Count by confidence level
    const score = edge.confidence_score || 0;
    const level = getConfidenceLevel(score);
    byConfidence[level]++;
    totalConfidence += score;
  }

  return {
    total: edges.length,
    byType,
    byConfidence,
    averageConfidence: edges.length > 0 ? totalConfidence / edges.length : 0,
  };
}
