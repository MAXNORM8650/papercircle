// src/components/Sessions/EditSessionModal.tsx
import { useState, useEffect } from 'react';
import { X, Calendar, Clock, MapPin, Video, Save } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import { useAuth } from '../../contexts/AuthContext';

interface EditSessionModalProps {
  sessionId: string;
  onClose: () => void;
  onSuccess: () => void;
}

export function EditSessionModal({ sessionId, onClose, onSuccess }: EditSessionModalProps) {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [session, setSession] = useState({
    title: '',
    description: '',
    scheduled_at: '',
    duration_minutes: 60,
    location: '',
    virtual_link: '',
    status: 'scheduled',
  });

  useEffect(() => {
    loadSession();
  }, [sessionId]);

  const loadSession = async () => {
    const { data } = await supabase
      .from('sessions')
      .select('*')
      .eq('id', sessionId)
      .single();

    if (data) {
      setSession({
        title: data.title,
        description: data.description || '',
        scheduled_at: new Date(data.scheduled_at).toISOString().slice(0, 16),
        duration_minutes: data.duration_minutes,
        location: data.location || '',
        virtual_link: data.virtual_link || '',
        status: data.status,
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    setLoading(true);

    const { error } = await supabase
      .from('sessions')
      .update({
        title: session.title,
        description: session.description || null,
        scheduled_at: new Date(session.scheduled_at).toISOString(),
        duration_minutes: session.duration_minutes,
        location: session.location || null,
        virtual_link: session.virtual_link || null,
        status: session.status,
        updated_at: new Date().toISOString(),
      })
      .eq('id', sessionId);

    if (error) {
      alert('Error updating session: ' + error.message);
      setLoading(false);
      return;
    }

    onSuccess();
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 rounded-t-lg flex justify-between items-center z-10">
          <h2 className="text-2xl font-bold text-gray-900">Edit Session</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="p-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Session Title
              </label>
              <input
                type="text"
                value={session.title}
                onChange={(e) => setSession({ ...session, title: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description
              </label>
              <textarea
                value={session.description}
                onChange={(e) => setSession({ ...session, description: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                rows={3}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Calendar className="inline h-4 w-4 mr-1" />
                  Date & Time
                </label>
                <input
                  type="datetime-local"
                  value={session.scheduled_at}
                  onChange={(e) => setSession({ ...session, scheduled_at: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Clock className="inline h-4 w-4 mr-1" />
                  Duration (minutes)
                </label>
                <input
                  type="number"
                  value={session.duration_minutes}
                  onChange={(e) =>
                    setSession({ ...session, duration_minutes: parseInt(e.target.value) })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  min="15"
                  step="15"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <MapPin className="inline h-4 w-4 mr-1" />
                Location (optional)
              </label>
              <input
                type="text"
                value={session.location}
                onChange={(e) => setSession({ ...session, location: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Room 301, CS Building"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Video className="inline h-4 w-4 mr-1" />
                Virtual Link (optional)
              </label>
              <input
                type="url"
                value={session.virtual_link}
                onChange={(e) => setSession({ ...session, virtual_link: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="https://zoom.us/j/..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Status
              </label>
              <select
                value={session.status}
                onChange={(e) => setSession({ ...session, status: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="scheduled">Scheduled</option>
                <option value="completed">Completed</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>
          </div>

          <div className="flex space-x-3 pt-6 mt-6 border-t border-gray-200">
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