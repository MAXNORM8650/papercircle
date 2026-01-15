import { useState, useEffect } from 'react';
import { X, Mail, CheckCircle, RefreshCw, ArrowRight } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { supabase } from '../../lib/supabase';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

// Google icon SVG component
const GoogleIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24">
    <path
      fill="#4285F4"
      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
    />
    <path
      fill="#34A853"
      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
    />
    <path
      fill="#FBBC05"
      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
    />
    <path
      fill="#EA4335"
      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
    />
  </svg>
);

export function AuthModal({ isOpen, onClose }: AuthModalProps) {
  const [mode, setMode] = useState<'welcome' | 'signin' | 'signup' | 'magic-link'>('welcome');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [signupSuccess, setSignupSuccess] = useState(false);
  const [magicLinkSent, setMagicLinkSent] = useState(false);
  const [resendSuccess, setResendSuccess] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);
  const { signIn, signUp, signInWithGoogle, signInWithMagicLink } = useAuth();

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

  const handleGoogleSignIn = async () => {
    setError('');
    setLoading(true);
    try {
      await signInWithGoogle();
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Failed to sign in with Google');
    } finally {
      setLoading(false);
    }
  };

  const handleMagicLink = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      setError('Please enter your email address');
      return;
    }

    setError('');
    setLoading(true);
    try {
      const result = await signInWithMagicLink(email);
      if (result.success) {
        setMagicLinkSent(true);
      } else {
        setError(result.message);
      }
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Failed to send magic link');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (mode === 'signin') {
        await signIn(email, password);
        onClose();
      } else if (mode === 'signup') {
        if (!displayName.trim()) {
          setError('Display name is required');
          setLoading(false);
          return;
        }
        await signUp(email, password, displayName);
        setSignupSuccess(true);
      }
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setMode('welcome');
    setEmail('');
    setPassword('');
    setDisplayName('');
    setError('');
    setSignupSuccess(false);
    setMagicLinkSent(false);
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
        if (error.message.includes('already confirmed')) {
          setError('This email is already verified. You can sign in now!');
        } else if (error.message.includes('not found')) {
          setError('No account found with this email. Please sign up first.');
        } else {
          setError(`Failed to resend: ${error.message}`);
        }
      } else {
        setResendSuccess(true);
        setTimeout(() => setResendSuccess(false), 5000);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to resend verification email');
    } finally {
      setResendLoading(false);
    }
  };

  // Welcome screen with easy options
  const renderWelcome = () => (
    <div className="p-6 space-y-5">
      {/* Header */}
      <div className="text-center space-y-2">
        <img
          src="/paper-circle-logo.svg"
          alt="PaperCircle"
          className="w-20 h-20 mx-auto mb-2"
        />
        <h2 className="text-2xl font-bold text-gray-900">Welcome to PaperCircle</h2>
        <p className="text-gray-500 text-sm">Sign in to save papers and get AI-powered analysis</p>
      </div>

      {/* Quick sign-in options */}
      <div className="space-y-3">
        {/* Google Sign In - Primary option */}
        <button
          onClick={handleGoogleSignIn}
          disabled={loading}
          className="w-full flex items-center justify-center space-x-3 px-4 py-3 bg-white border-2 border-gray-200 rounded-xl hover:border-gray-300 hover:bg-gray-50 transition-all duration-200 font-medium text-gray-700 disabled:opacity-50"
        >
          <GoogleIcon />
          <span>Continue with Google</span>
        </button>

        {/* Magic Link - Easy option */}
        <button
          onClick={() => setMode('magic-link')}
          className="w-full flex items-center justify-center space-x-3 px-4 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl hover:from-purple-700 hover:to-blue-700 transition-all duration-200 font-medium shadow-lg shadow-purple-200"
        >
          <Mail className="w-5 h-5" />
          <span>Sign in with Email Link</span>
        </button>
      </div>

      {/* Divider */}
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-200"></div>
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-4 bg-white text-gray-400">or use password</span>
        </div>
      </div>

      {/* Password options */}
      <div className="flex space-x-3">
        <button
          onClick={() => setMode('signin')}
          className="flex-1 px-4 py-2.5 text-gray-600 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors font-medium text-sm"
        >
          Sign In
        </button>
        <button
          onClick={() => setMode('signup')}
          className="flex-1 px-4 py-2.5 text-gray-600 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors font-medium text-sm"
        >
          Create Account
        </button>
      </div>

      {/* Benefits */}
      <div className="bg-gray-50 rounded-xl p-4 space-y-2">
        <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">Free Account Benefits</p>
        <ul className="text-sm text-gray-600 space-y-1.5">
          <li className="flex items-center space-x-2">
            <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
            <span>Save and organize research papers</span>
          </li>
          <li className="flex items-center space-x-2">
            <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
            <span>5 free AI paper analyses per day</span>
          </li>
          <li className="flex items-center space-x-2">
            <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
            <span>Unlimited with your own LLM</span>
          </li>
        </ul>
      </div>
    </div>
  );

  // Magic link form
  const renderMagicLink = () => (
    <div className="p-6 space-y-5">
      {magicLinkSent ? (
        <div className="text-center space-y-4">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full">
            <Mail className="w-8 h-8 text-green-600" />
          </div>
          <div>
            <h3 className="text-xl font-semibold text-gray-900">Check your email</h3>
            <p className="text-gray-500 mt-1">We sent a magic link to</p>
            <p className="font-medium text-gray-900">{email}</p>
          </div>
          <div className="bg-blue-50 rounded-lg p-4 text-sm text-blue-700">
            Click the link in your email to sign in instantly. No password needed!
          </div>
          <button
            onClick={handleClose}
            className="w-full py-2.5 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-medium"
          >
            Got it
          </button>
        </div>
      ) : (
        <>
          <button
            onClick={() => setMode('welcome')}
            className="flex items-center text-gray-500 hover:text-gray-700 text-sm font-medium"
          >
            <ArrowRight className="w-4 h-4 rotate-180 mr-1" />
            Back
          </button>

          <div className="text-center space-y-2">
            <div className="inline-flex items-center justify-center w-14 h-14 bg-purple-100 rounded-full">
              <Mail className="w-7 h-7 text-purple-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900">Passwordless Sign In</h3>
            <p className="text-gray-500 text-sm">Enter your email and we'll send you a magic link</p>
          </div>

          <form onSubmit={handleMagicLink} className="space-y-4">
            <div>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent text-center"
                required
                autoFocus
              />
            </div>

            {error && (
              <div className="text-red-600 text-sm bg-red-50 p-3 rounded-lg text-center">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl hover:from-purple-700 hover:to-blue-700 transition-all duration-200 font-medium disabled:opacity-50"
            >
              {loading ? 'Sending...' : 'Send Magic Link'}
            </button>
          </form>
        </>
      )}
    </div>
  );

  // Sign up success screen
  const renderSignupSuccess = () => (
    <div className="p-6 space-y-4">
      <div className="flex flex-col items-center text-center space-y-4">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
          <CheckCircle className="h-10 w-10 text-green-600" />
        </div>

        <div className="space-y-2">
          <h3 className="text-xl font-semibold text-gray-800">Account Created!</h3>
          <p className="text-gray-600">We've sent a verification email to:</p>
          <p className="font-medium text-gray-800">{email}</p>
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
          Verification email sent! Check your inbox.
        </div>
      )}

      <div className="space-y-2">
        <button
          onClick={handleClose}
          className="w-full bg-purple-600 text-white py-2.5 px-4 rounded-lg hover:bg-purple-700 transition-colors font-medium"
        >
          Got it!
        </button>

        <button
          onClick={handleResendVerification}
          disabled={resendLoading}
          className="w-full bg-white text-purple-600 py-2.5 px-4 rounded-lg border border-purple-200 hover:bg-purple-50 transition-colors font-medium disabled:opacity-50 flex items-center justify-center space-x-2"
        >
          <RefreshCw className={`h-4 w-4 ${resendLoading ? 'animate-spin' : ''}`} />
          <span>{resendLoading ? 'Sending...' : 'Resend Verification Email'}</span>
        </button>
      </div>
    </div>
  );

  // Traditional sign in/sign up form
  const renderForm = () => (
    <div className="p-6 space-y-5">
      <button
        onClick={() => setMode('welcome')}
        className="flex items-center text-gray-500 hover:text-gray-700 text-sm font-medium"
      >
        <ArrowRight className="w-4 h-4 rotate-180 mr-1" />
        Back
      </button>

      <div className="text-center">
        <h3 className="text-xl font-semibold text-gray-900">
          {mode === 'signin' ? 'Welcome back' : 'Create your account'}
        </h3>
        <p className="text-gray-500 text-sm mt-1">
          {mode === 'signin' ? 'Sign in with your email and password' : 'Join PaperCircle today'}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
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
              placeholder="Your name"
              className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              required
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
            placeholder="you@example.com"
            className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
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
            placeholder="••••••••"
            className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
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
            Verification email sent! Check your inbox.
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-purple-600 text-white py-2.5 px-4 rounded-lg hover:bg-purple-700 transition-colors disabled:opacity-50 font-medium"
        >
          {loading ? 'Loading...' : mode === 'signin' ? 'Sign In' : 'Create Account'}
        </button>

        {mode === 'signin' && (
          <div className="text-center">
            <button
              type="button"
              onClick={handleResendVerification}
              disabled={resendLoading}
              className="text-sm text-purple-600 hover:underline disabled:opacity-50 inline-flex items-center space-x-1"
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
                className="text-purple-600 hover:underline font-medium"
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
                className="text-purple-600 hover:underline font-medium"
              >
                Sign in
              </button>
            </>
          )}
        </div>
      </form>
    </div>
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full mx-4 overflow-hidden">
        {/* Close button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors z-10"
        >
          <X className="h-6 w-6" />
        </button>

        {/* Content */}
        {signupSuccess ? (
          renderSignupSuccess()
        ) : mode === 'welcome' ? (
          renderWelcome()
        ) : mode === 'magic-link' ? (
          renderMagicLink()
        ) : (
          renderForm()
        )}
      </div>
    </div>
  );
}
