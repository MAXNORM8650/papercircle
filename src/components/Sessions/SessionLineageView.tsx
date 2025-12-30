import { useEffect, useState } from 'react';
import { ArrowRight, GitBranch, Calendar, Users } from 'lucide-react';
import { supabase } from '../../lib/supabase';

interface SessionLineageViewProps {
  sessionId: string;
  onSelectSession?: (sessionId: string) => void;
}

interface LineageNode {
  id: string;
  title: string;
  parent_session_id: string | null;
  depth: number;
  relation: 'current' | 'ancestor' | 'descendant';
  scheduled_for?: string;
  presenter_count?: number;
}

interface SessionEdge {
  id: string;
  source_session_id: string;
  target_session_id: string;
  relationship_type: string;
  source_session?: { title: string; scheduled_for: string };
  target_session?: { title: string; scheduled_for: string };
}

export function SessionLineageView({ sessionId, onSelectSession }: SessionLineageViewProps) {
  const [lineageData, setLineageData] = useState<LineageNode[]>([]);
  const [edges, setEdges] = useState<SessionEdge[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentSession, setCurrentSession] = useState<any>(null);

  useEffect(() => {
    loadLineage();
  }, [sessionId]);

  const loadLineage = async () => {
    setLoading(true);
    try {
      // Load session lineage using the database function
      const { data: lineage, error: lineageError } = await supabase.rpc(
        'get_session_lineage',
        { p_session_id: sessionId }
      );

      if (lineageError) throw lineageError;

      // Load current session
      const { data: session, error: sessionError } = await supabase
        .from('sessions')
        .select('*')
        .eq('id', sessionId)
        .single();

      if (sessionError) throw sessionError;
      setCurrentSession(session);

      // Load related edges
      const { data: edgesData, error: edgesError } = await supabase
        .from('session_edges')
        .select(`
          id,
          source_session_id,
          target_session_id,
          relationship_type,
          source_session:source_session_id (title, scheduled_for),
          target_session:target_session_id (title, scheduled_for)
        `)
        .or(`source_session_id.eq.${sessionId},target_session_id.eq.${sessionId}`);

      if (edgesError) throw edgesError;

      setLineageData(lineage || []);
      setEdges(edgesData || []);
    } catch (error) {
      console.error('Error loading lineage:', error);
    } finally {
      setLoading(false);
    }
  };

  const ancestors = lineageData.filter(node => node.relation === 'ancestor').sort((a, b) => a.depth - b.depth);
  const descendants = lineageData.filter(node => node.relation === 'descendant').sort((a, b) => a.depth - b.depth);

  const relatedSessions = edges.filter(edge =>
    edge.source_session_id === sessionId || edge.target_session_id === sessionId
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-gray-500">Loading lineage...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Current Session */}
      {currentSession && (
        <div className="bg-blue-50 border-2 border-blue-500 rounded-lg p-4">
          <div className="flex items-center gap-2 text-sm font-medium text-blue-900 mb-2">
            <GitBranch className="w-4 h-4" />
            Current Session
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">{currentSession.title}</h3>
          {currentSession.scheduled_for && (
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Calendar className="w-4 h-4" />
              {new Date(currentSession.scheduled_for).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </div>
          )}
          {currentSession.introduction && (
            <p className="mt-2 text-sm text-gray-700">{currentSession.introduction}</p>
          )}
        </div>
      )}

      {/* Ancestors (Parent Sessions) */}
      {ancestors.length > 0 && (
        <div className="space-y-3">
          <h3 className="font-semibold text-gray-900 flex items-center gap-2">
            <ArrowRight className="w-5 h-5 rotate-180" />
            Builds Upon
          </h3>
          <div className="space-y-2 pl-6 border-l-2 border-gray-300">
            {ancestors.map(node => (
              <div
                key={node.id}
                onClick={() => onSelectSession?.(node.id)}
                className="bg-white border border-gray-200 rounded-lg p-3 hover:shadow-md cursor-pointer transition-shadow"
                style={{ marginLeft: `${Math.abs(node.depth) * 20}px` }}
              >
                <div className="font-medium text-gray-900">{node.title}</div>
                <div className="text-xs text-gray-500 mt-1">
                  Level {Math.abs(node.depth)} ancestor
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Related Sessions */}
      {relatedSessions.length > 0 && (
        <div className="space-y-3">
          <h3 className="font-semibold text-gray-900 flex items-center gap-2">
            <GitBranch className="w-5 h-5" />
            Related Sessions
          </h3>
          <div className="grid gap-3">
            {relatedSessions.map(edge => {
              const isSource = edge.source_session_id === sessionId;
              const relatedSession = isSource ? edge.target_session : edge.source_session;
              const relatedId = isSource ? edge.target_session_id : edge.source_session_id;

              return (
                <div
                  key={edge.id}
                  onClick={() => onSelectSession?.(relatedId)}
                  className="bg-white border border-gray-200 rounded-lg p-3 hover:shadow-md cursor-pointer transition-shadow"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="font-medium text-gray-900">
                        {relatedSession?.title || 'Unknown Session'}
                      </div>
                      {relatedSession?.scheduled_for && (
                        <div className="text-xs text-gray-500 mt-1">
                          {new Date(relatedSession.scheduled_for).toLocaleDateString()}
                        </div>
                      )}
                    </div>
                    <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
                      {edge.relationship_type.replace('_', ' ')}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Descendants (Child Sessions) */}
      {descendants.length > 0 && (
        <div className="space-y-3">
          <h3 className="font-semibold text-gray-900 flex items-center gap-2">
            <ArrowRight className="w-5 h-5" />
            Led To
          </h3>
          <div className="space-y-2 pl-6 border-l-2 border-gray-300">
            {descendants.map(node => (
              <div
                key={node.id}
                onClick={() => onSelectSession?.(node.id)}
                className="bg-white border border-gray-200 rounded-lg p-3 hover:shadow-md cursor-pointer transition-shadow"
                style={{ marginLeft: `${node.depth * 20}px` }}
              >
                <div className="font-medium text-gray-900">{node.title}</div>
                <div className="text-xs text-gray-500 mt-1">
                  Level {node.depth} descendant
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Empty State */}
      {ancestors.length === 0 && descendants.length === 0 && relatedSessions.length === 0 && (
        <div className="text-center py-12">
          <GitBranch className="w-12 h-12 text-gray-300 mx-auto mb-3" />
          <p className="text-gray-500">No session lineage found</p>
          <p className="text-sm text-gray-400 mt-1">
            Create connections by selecting parent or related sessions when creating/editing sessions
          </p>
        </div>
      )}
    </div>
  );
}
