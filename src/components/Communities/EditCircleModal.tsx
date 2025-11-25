// src/components/Communities/EditCircleModal.tsx
import { useState, useEffect } from 'react';
import { X, Save } from 'lucide-react';
import { supabase } from '../../lib/supabase';

interface EditCircleModalProps {
  communityId: string;
  onClose: () => void;
  onSuccess: () => void;
}

export function EditCircleModal({ communityId, onClose, onSuccess }: EditCircleModalProps) {
  const [loading, setLoading] = useState(false);
  const [community, setCommunity] = useState({
    name: '',
    description: '',
    is_public: true,
  });

  useEffect(() => {
    loadCommunity();
  }, [communityId]);

  const loadCommunity = async () => {
    const { data } = await supabase
      .from('communities')
      .select('name, description, is_public')
      .eq('id', communityId)
      .single();

    if (data) {
      setCommunity({
        name: data.name,
        description: data.description || '',
        is_public: data.is_public,
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const { error } = await supabase
      .from('communities')
      .update({
        name: community.name,
        description: community.description || null,
        is_public: community.is_public,
        updated_at: new Date().toISOString(),
      })
      .eq('id', communityId);

    if (error) {
      alert('Error updating circle: ' + error.message);
      setLoading(false);
      return;
    }

    onSuccess();
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-md w-full">
        <div className="flex justify-between items-center p-6 border-b">
          <h2 className="text-xl font-bold text-gray-900">Edit Circle</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Circle Name
            </label>
            <input
              type="text"
              value={community.name}
              onChange={(e) => setCommunity({ ...community, name: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              value={community.description}
              onChange={(e) => setCommunity({ ...community, description: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              rows={3}
              placeholder="Brief description of your circle..."
            />
          </div>

          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="is_public"
              checked={community.is_public}
              onChange={(e) => setCommunity({ ...community, is_public: e.target.checked })}
              className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <label htmlFor="is_public" className="text-sm text-gray-700">
              Public circle (anyone can join)
            </label>
          </div>

          <div className="flex space-x-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              disabled={loading}
              className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium disabled:opacity-50 flex items-center justify-center space-x-2"
            >
              <Save className="h-4 w-4" />
              <span>{loading ? 'Saving...' : 'Save Changes'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}