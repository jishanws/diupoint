'use client';

import Link from 'next/link';
import { FormEvent, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Button from '@/components/ui/button';
import { getApiBaseUrl, isApiRequestError } from '@/lib/api/http';
import { isDiuEmailDomain } from '@/lib/auth-account';
import { useAuth } from '@/lib/auth/auth-context';
import { APP_ROUTES, sanitizeReturnTo } from '@/lib/routes';

export default function SignInForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { signIn } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function toErrorMessage(requestError: unknown) {
    if (!isApiRequestError(requestError)) {
      return 'Sign-in failed. Please check your email and password.';
    }
    if (requestError.status === 401) return requestError.message;
    if (requestError.status === 0) return 'Backend is unavailable. Please try again.';
    return requestError.message || 'Unable to sign in right now.';
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const normalizedEmail = email.trim().toLowerCase();
    if (!isDiuEmailDomain(normalizedEmail)) {
      setError('Only official DIU student email addresses are supported.');
      return;
    }

    setError(null);
    setIsSubmitting(true);
    try {
      await signIn({ email: normalizedEmail, password });
      router.replace(
        sanitizeReturnTo(searchParams.get('returnTo'), APP_ROUTES.home)
      );
    } catch (requestError) {
      setError(toErrorMessage(requestError));
    } finally {
      setIsSubmitting(false);
    }
  }

  function handleGoogleSignIn() {
    const returnTo = sanitizeReturnTo(
      searchParams.get('returnTo'),
      APP_ROUTES.home
    );
    window.location.assign(
      `${getApiBaseUrl()}/auth/google?returnTo=${encodeURIComponent(returnTo)}`
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3.5" noValidate>
      <button type="button" onClick={handleGoogleSignIn} className="inline-flex h-11 w-full items-center justify-center rounded-xl border border-gray-200 bg-white px-3 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50 dark:border-white/12 dark:bg-slate-950 dark:text-slate-200">
        Continue with Google
      </button>
      <div className="relative py-0">
        <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-gray-300/80 dark:border-white/20" /></div>
        <p className="relative mx-auto w-fit bg-white px-2 text-xs text-gray-500 dark:bg-slate-900">OR</p>
      </div>
      <div className="space-y-3">
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-900 dark:text-slate-100">DIU Email</label>
          <input id="email" type="email" autoComplete="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="you@diu.edu.bd" className="mt-1.5 h-11 w-full rounded-xl border border-gray-200 bg-white px-3 text-sm text-gray-900 outline-none focus:border-[#2F3FBF] focus:ring-2 focus:ring-[#2F3FBF]/12 dark:border-white/10 dark:bg-slate-950 dark:text-slate-100" required />
        </div>
        <div>
          <div className="flex items-center justify-between gap-3">
            <label htmlFor="password" className="block text-sm font-medium text-gray-900 dark:text-slate-100">Password</label>
            <Link href={APP_ROUTES.forgotPassword} className="text-xs font-medium text-[#2F3FBF] hover:underline">Forgot Password?</Link>
          </div>
          <input id="password" type="password" autoComplete="current-password" value={password} onChange={(event) => setPassword(event.target.value)} placeholder="Enter your password" className="mt-1.5 h-11 w-full rounded-xl border border-gray-200 bg-white px-3 text-sm text-gray-900 outline-none focus:border-[#2F3FBF] focus:ring-2 focus:ring-[#2F3FBF]/12 dark:border-white/10 dark:bg-slate-950 dark:text-slate-100" required />
        </div>
      </div>
      {error ? <p className="text-xs font-medium text-rose-600">{error}</p> : null}
      <Button type="submit" className="h-11 w-full" disabled={isSubmitting}>
        {isSubmitting ? 'Signing in...' : 'Sign In'}
      </Button>
      <p className="text-center text-xs text-gray-500 dark:text-slate-400">
        New to DIUPoint? <Link href={APP_ROUTES.signUp} className="font-semibold text-[#2F3FBF]">Create account</Link>
      </p>
    </form>
  );
}
