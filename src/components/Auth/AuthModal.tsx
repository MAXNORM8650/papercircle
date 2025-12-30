import { useState, useEffect } from 'react';
import { X, Mail, CheckCircle, RefreshCw } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { supabase } from '../../lib/supabase';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AuthModal({ isOpen, onClose }: AuthModalProps) {
  const [mode, setMode] = useState<'signin' | 'signup'>('signin');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [signupSuccess, setSignupSuccess] = useState(false);
  const [resendSuccess, setResendSuccess] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);
  const { signIn, signUp } = useAuth();

  // Check for auth errors in URL on mount
  useEffect(() => {
    if (isOpen) {
      const urlParams = new URLSearchParams(window.location.hash.substring(1));
      const errorParam = urlParams.get('error');
      const errorDescription = urlParams.get('error_description');

      if (errorParam === 'access_denied' && errorDescription?.includes('expired')) {
        setError('Your verification link has expired. Please request a new one below.');
        setMode('signin');
      }

      // Clean up URL
      if (errorParam) {
        window.history.replaceState({}, document.title, window.location.pathname);
      }
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (mode === 'signin') {
        await signIn(email, password);
        onClose();
      } else {
        if (!displayName.trim()) {
          setError('Display name is required');
          setLoading(false);
          return;
        }
        await signUp(email, password, displayName);
        // Show success message instead of closing immediately
        setSignupSuccess(true);
      }
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    // Reset all state when closing
    setMode('signin');
    setEmail('');
    setPassword('');
    setDisplayName('');
    setError('');
    setSignupSuccess(false);
    setResendSuccess(false);
    onClose();
  };

  const handleResendVerification = async () => {
    if (!email) {
      setError('Please enter your email address to resend verification');
      return;
    }

    setResendLoading(true);
    setResendSuccess(false);
    setError('');

    try {
      const { error } = await supabase.auth.resend({
        type: 'signup',
        email: email,
      });

      if (error) {
        // If user is already confirmed or doesn't exist, show helpful message
        if (error.message.includes('already confirmed')) {
          setError('This email is already verified. You can sign in now!');
        } else if (error.message.includes('not found')) {
          setError('No account found with this email. Please sign up first.');
        } else {
          setError(`Failed to resend: ${error.message}`);
        }
      } else {
        setResendSuccess(true);
        setTimeout(() => setResendSuccess(false), 5000); // Clear after 5 seconds
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to resend verification email');
    } finally {
      setResendLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4">
        <div className="flex justify-between items-center p-6 border-b">
          <h2 className="text-2xl font-bold text-gray-800">
            {signupSuccess ? 'Check Your Email' : mode === 'signin' ? 'Sign In' : 'Sign Up'}
          </h2>
          <button
            onClick={handleClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        {signupSuccess ? (
          <div className="p-6 space-y-4">
            <div className="flex flex-col items-center text-center space-y-4">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                <CheckCircle className="h-10 w-10 text-green-600" />
              </div>

              <div className="space-y-2">
                <h3 className="text-xl font-semibold text-gray-800">
                  Account Created Successfully!
                </h3>
                <p className="text-gray-600">
                  We've sent a verification email to:
                </p>
                <p className="font-medium text-gray-800">
                  {email}
                </p>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 space-y-2 w-full">
                <div className="flex items-start space-x-2">
                  <Mail className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                  <div className="text-sm text-left">
                    <p className="font-medium text-blue-900 mb-1">Next Steps:</p>
                    <ol className="list-decimal list-inside text-blue-800 space-y-1">
                      <li>Check your email inbox</li>
                      <li>Click the verification link</li>
                      <li>Return here to sign in</li>
                    </ol>
                  </div>
                </div>
              </div>

              <p className="text-sm text-gray-500">
                Didn't receive the email? Check your spam folder.
              </p>
            </div>

            {resendSuccess && (
              <div className="bg-green-50 border border-green-200 rounded-lg p-3 text-sm text-green-800">
                ✓ Verification email sent! Check your inbox.
              </div>
            )}

            <div className="space-y-2">
              <button
                onClick={handleClose}
                className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors font-medium"
              >
                Got it!
              </button>

              <button
                onClick={handleResendVerification}
                disabled={resendLoading}
                className="w-full bg-white text-blue-600 py-2 px-4 rounded-lg border border-blue-600 hover:bg-blue-50 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
              >
                <RefreshCw className={`h-4 w-4 ${resendLoading ? 'animate-spin' : ''}`} />
                <span>{resendLoading ? 'Sending...' : 'Resend Verification Email'}</span>
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {mode === 'signup' && (
            <div>
              <label htmlFor="displayName" className="block text-sm font-medium text-gray-700 mb-1">
                Display Name
              </label>
              <input
                id="displayName"
                type="text"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required={mode === 'signup'}
              />
            </div>
          )}

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
              minLength={6}
            />
          </div>

          {error && (
            <div className="text-red-600 text-sm bg-red-50 p-3 rounded-lg">
              {error}
            </div>
          )}

          {resendSuccess && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-3 text-sm text-green-800">
              ✓ Verification email sent! Check your inbox.
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-medium"
          >
            {loading ? 'Loading...' : mode === 'signin' ? 'Sign In' : 'Sign Up'}
          </button>

          {mode === 'signin' && (
            <div className="text-center">
              <button
                type="button"
                onClick={handleResendVerification}
                disabled={resendLoading}
                className="text-sm text-blue-600 hover:underline disabled:opacity-50 disabled:cursor-not-allowed inline-flex items-center space-x-1"
              >
                <RefreshCw className={`h-3 w-3 ${resendLoading ? 'animate-spin' : ''}`} />
                <span>{resendLoading ? 'Sending...' : 'Resend verification email'}</span>
              </button>
            </div>
          )}

          <div className="text-center text-sm text-gray-600">
            {mode === 'signin' ? (
              <>
                Don't have an account?{' '}
                <button
                  type="button"
                  onClick={() => setMode('signup')}
                  className="text-blue-600 hover:underline font-medium"
                >
                  Sign up
                </button>
              </>
            ) : (
              <>
                Already have an account?{' '}
                <button
                  type="button"
                  onClick={() => setMode('signin')}
                  className="text-blue-600 hover:underline font-medium"
                >
                  Sign in
                </button>
              </>
            )}
          </div>
        </form>
        )}
      </div>
    </div>
  );
}
