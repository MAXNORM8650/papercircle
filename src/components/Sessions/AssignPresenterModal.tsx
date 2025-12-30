import { useState, useEffect } from 'react';
import { X, User, Star } from 'lucide-react';
import { supabase } from '../../lib/supabase';

interface AssignPresenterModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  sessionId: string;
  communityId: string;
}

interface Member {
  user_id: string;
  profiles: {
    display_name: string;
    avatar_url: string | null;
    affiliation: string | null;
  };
}

export function AssignPresenterModal({ isOpen, onClose, onSuccess, sessionId, communityId }: AssignPresenterModalProps) {
  const [members, setMembers] = useState<Member[]>([]);
  const [selectedPresenters, setSelectedPresenters] = useState<string[]>([]);
  const [primaryPresenter, setPrimaryPresenter] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [currentPresenters, setCurrentPresenters] = useState<string[]>([]);

  useEffect(() => {
    if (isOpen) {
      loadMembers();
      loadCurrentPresenters();
    }
  }, [isOpen, sessionId, communityId]);

  const loadMembers = async () => {
    try {
      const { data, error } = await supabase
        .from('community_members')
        .select(`
          user_id,
          profiles:user_id (
            display_name,
            avatar_url,
            affiliation
          )
        `)
        .eq('community_id', communityId);

      if (error) throw error;
      setMembers(data || []);
    } catch (error) {
      console.error('Error loading members:', error);
    }
  };

  const loadCurrentPresenters = async () => {
    try {
      const { data, error } = await supabase
        .from('session_presenters')
        .select('user_id, is_primary')
        .eq('session_id', sessionId);

      if (error) throw error;

      const presenterIds = data?.map(p => p.user_id) || [];
      const primary = data?.find(p => p.is_primary)?.user_id || '';

      setCurrentPresenters(presenterIds);
      setSelectedPresenters(presenterIds);
      setPrimaryPresenter(primary);
    } catch (error) {
      console.error('Error loading current presenters:', error);
    }
  };

  const togglePresenter = (userId: string) => {
    setSelectedPresenters(prev => {
      if (prev.includes(userId)) {
        // If removing the primary presenter, clear primary
        if (userId === primaryPresenter) {
          setPrimaryPresenter('');
        }
        return prev.filter(id => id !== userId);
      } else {
        // If this is the first presenter, make them primary
        if (prev.length === 0) {
          setPrimaryPresenter(userId);
        }
        return [...prev, userId];
      }
    });
  };

  const handleSetPrimary = (userId: string) => {
    if (selectedPresenters.includes(userId)) {
      setPrimaryPresenter(userId);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Remove existing presenters
      await supabase
        .from('session_presenters')
        .delete()
        .eq('session_id', sessionId);

      // Add new presenters
      if (selectedPresenters.length > 0) {
        const presenters = selectedPresenters.map(userId => ({
          session_id: sessionId,
          user_id: userId,
          is_primary: userId === primaryPresenter,
        }));

        const { error } = await supabase
          .from('session_presenters')
          .insert(presenters);

        if (error) throw error;
      }

      onSuccess();
      onClose();
    } catch (error) {
      console.error('Error assigning presenters:', error);
      alert('Failed to assign presenters. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[80vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b px-6 py-4 flex items-center justify-between">
          <h2 className="text-xl font-semibold">Assign Presenters</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6">
          <div className="space-y-4 mb-6">
            <p className="text-sm text-gray-600">
              Select one or more members to present at this session. The first presenter you select will be marked as primary.
            </p>

            {selectedPresenters.length > 0 && (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                <div className="text-sm font-medium text-blue-900 mb-2">
                  Selected Presenters ({selectedPresenters.length})
                </div>
                <div className="text-xs text-blue-700">
                  {primaryPresenter && (
                    <span>
                      Primary: {members.find(m => m.user_id === primaryPresenter)?.profiles?.display_name || 'Unknown'}
                    </span>
                  )}
                </div>
              </div>
            )}

            <div className="space-y-2 max-h-96 overflow-y-auto">
              {members.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  No members available in this community
                </div>
              ) : (
                members.map(member => {
                  const isSelected = selectedPresenters.includes(member.user_id);
                  const isPrimary = primaryPresenter === member.user_id;

                  return (
                    <div
                      key={member.user_id}
                      className={`border rounded-lg p-3 cursor-pointer transition-all ${
                        isSelected
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                      }`}
                      onClick={() => togglePresenter(member.user_id)}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <input
                            type="checkbox"
                            checked={isSelected}
                            onChange={() => togglePresenter(member.user_id)}
                            className="w-5 h-5 text-blue-600 rounded"
                            onClick={e => e.stopPropagation()}
                          />

                          {member.profiles?.avatar_url ? (
                            <img
                              src={member.profiles.avatar_url}
                              alt={member.profiles.display_name}
                              className="w-10 h-10 rounded-full object-cover"
                            />
                          ) : (
                            <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
                              <User className="w-5 h-5 text-gray-500" />
                            </div>
                          )}

                          <div>
                            <div className="font-medium text-gray-900 flex items-center gap-2">
                              {member.profiles?.display_name || 'Unknown User'}
                              {isPrimary && (
                                <span className="flex items-center gap-1 text-xs text-yellow-600">
                                  <Star className="w-3 h-3 fill-current" />
                                  Primary
                                </span>
                              )}
                            </div>
                            {member.profiles?.affiliation && (
                              <div className="text-sm text-gray-500">
                                {member.profiles.affiliation}
                              </div>
                            )}
                          </div>
                        </div>

                        {isSelected && !isPrimary && (
                          <button
                            type="button"
                            onClick={e => {
                              e.stopPropagation();
                              handleSetPrimary(member.user_id);
                            }}
                            className="px-3 py-1 text-xs bg-yellow-100 text-yellow-700 rounded-lg hover:bg-yellow-200"
                          >
                            Make Primary
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading || selectedPresenters.length === 0}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Saving...' : 'Assign Presenters'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
