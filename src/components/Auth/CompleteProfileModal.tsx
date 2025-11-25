// src/components/Auth/CompleteProfileModal.tsx
import { useState } from 'react';
import { User } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

export function CompleteProfileModal() {
  const { user, completeProfile } = useAuth();
  const [displayName, setDisplayName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!displayName.trim()) {
      setError('Display name is required');
      return;
    }

    setLoading(true);
    setError('');

    try {
      await completeProfile(displayName.trim());
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to complete profile');
      setLoading(false);
    }
  };

  if (!user) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4">
        <div className="flex items-center space-x-3 p-6 border-b">
          <User className="h-6 w-6 text-blue-600" />
          <h2 className="text-2xl font-bold text-gray-800">Complete Your Profile</h2>
        </div>

        <div className="p-6 space-y-4">
          <p className="text-gray-600 mb-4">
            Welcome! Please complete your profile to continue.
          </p>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              value={user.email || ''}
              disabled
              className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Display Name *
            </label>
            <input
              type="text"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSubmit(e)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="How should we call you?"
              autoFocus
            />
            <p className="text-xs text-gray-500 mt-1">
              This will be visible to other members
            </p>
          </div>

          {error && (
            <div className="text-red-600 text-sm bg-red-50 p-3 rounded-lg">
              {error}
            </div>
          )}

          <button
            onClick={handleSubmit}
            disabled={loading || !displayName.trim()}
            className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-medium"
          >
            {loading ? 'Completing Profile...' : 'Complete Profile'}
          </button>

          <p className="text-xs text-gray-500 text-center">
            You can update your profile later in settings
          </p>
        </div>
      </div>
    </div>
  );
}