'use client';

import Link from 'next/link';
import { FormEvent, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Button from '@/components/ui/button';
import { signUpWithPassword } from '@/lib/api/auth';
import { getApiBaseUrl, isApiRequestError } from '@/lib/api/http';
import { confirmVerificationOtp } from '@/lib/api/verification';
import { isDiuEmailDomain } from '@/lib/auth-account';
import { APP_ROUTES, sanitizeReturnTo } from '@/lib/routes';

export default function SignUpForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [otp, setOtp] = useState('');
  const [pendingEmail, setPendingEmail] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  function toErrorMessage(requestError: unknown, fallback: string) {
    if (!isApiRequestError(requestError)) return fallback;
    if (requestError.status === 409) {
      return 'An account already exists for this DIU email. Please sign in.';
    }
    if (requestError.status === 503) {
      return 'Verification email is temporarily unavailable. Please try again later.';
    }
    return requestError.message || fallback;
  }

  async function handleCreateAccount(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const normalizedEmail = email.trim().toLowerCase();

    if (!isDiuEmailDomain(normalizedEmail)) {
      setError('Only official DIU student email addresses are supported.');
      return;
    }
    if (password !== confirmPassword) {
      setError('Password and confirm password do not match.');
      return;
    }

    setError(null);
    setMessage(null);
    setIsSubmitting(true);
    try {
      const response = await signUpWithPassword({
        email: normalizedEmail,
        password,
      });
      setPendingEmail(response.verificationEmail);
      setMessage('We sent a verification code to your DIU email.');
    } catch (requestError) {
      setError(toErrorMessage(requestError, 'Unable to create your account.'));
    } finally {
      setIsSubmitting(false);
    }
  }

  async function handleConfirmOtp(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!pendingEmail || !/^\d{6}$/.test(otp.trim())) {
      setError('Enter the 6-digit verification code from your DIU email.');
      return;
    }

    setError(null);
    setIsSubmitting(true);
    try {
      await confirmVerificationOtp({
        verificationEmail: pendingEmail,
        otp: otp.trim(),
      });
      const returnTo = sanitizeReturnTo(
        searchParams.get('returnTo'),
        APP_ROUTES.home
      );
      router.replace(
        `${APP_ROUTES.signIn}?returnTo=${encodeURIComponent(returnTo)}`
      );
    } catch (requestError) {
      setError(toErrorMessage(requestError, 'Unable to verify your email.'));
    } finally {
      setIsSubmitting(false);
    }
  }

  function handleGoogleSignUp() {
    const returnTo = sanitizeReturnTo(
      searchParams.get('returnTo'),
      APP_ROUTES.home
    );
    window.location.assign(
      `${getApiBaseUrl()}/auth/google?returnTo=${encodeURIComponent(returnTo)}`
    );
  }

  if (pendingEmail) {
    return (
      <form onSubmit={handleConfirmOtp} className="space-y-4" noValidate>
        <div className="text-center">
          <h2 className="text-xl font-semibold text-gray-950 dark:text-slate-100">
            Verify your DIU email
          </h2>
          <p className="mt-1.5 text-sm text-gray-500 dark:text-slate-400">
            Enter the code sent to {pendingEmail} to activate your account.
          </p>
        </div>
        <input
          type="text"
          inputMode="numeric"
          autoComplete="one-time-code"
          value={otp}
          onChange={(event) => setOtp(event.target.value)}
          placeholder="6-digit code"
          className="h-11 w-full rounded-xl border border-gray-200 bg-white px-3 text-sm text-gray-900 outline-none focus:border-[#2F3FBF] focus:ring-2 focus:ring-[#2F3FBF]/12 dark:border-white/10 dark:bg-slate-950 dark:text-slate-100"
          required
        />
        {error ? <p className="text-xs font-medium text-rose-600">{error}</p> : null}
        <Button type="submit" className="h-11 w-full" disabled={isSubmitting}>
          {isSubmitting ? 'Verifying...' : 'Verify email'}
        </Button>
      </form>
    );
  }

  return (
    <form onSubmit={handleCreateAccount} className="space-y-3.5" noValidate>
      <button
        type="button"
        onClick={handleGoogleSignUp}
        className="inline-flex h-11 w-full items-center justify-center rounded-xl border border-gray-200 bg-white px-3 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50 dark:border-white/12 dark:bg-slate-950 dark:text-slate-200"
      >
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
          <label htmlFor="password" className="block text-sm font-medium text-gray-900 dark:text-slate-100">Password</label>
          <input id="password" type="password" autoComplete="new-password" value={password} onChange={(event) => setPassword(event.target.value)} placeholder="Create a password" className="mt-1.5 h-11 w-full rounded-xl border border-gray-200 bg-white px-3 text-sm text-gray-900 outline-none focus:border-[#2F3FBF] focus:ring-2 focus:ring-[#2F3FBF]/12 dark:border-white/10 dark:bg-slate-950 dark:text-slate-100" required />
        </div>
        <div>
          <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-900 dark:text-slate-100">Confirm Password</label>
          <input id="confirm-password" type="password" autoComplete="new-password" value={confirmPassword} onChange={(event) => setConfirmPassword(event.target.value)} placeholder="Confirm your password" className="mt-1.5 h-11 w-full rounded-xl border border-gray-200 bg-white px-3 text-sm text-gray-900 outline-none focus:border-[#2F3FBF] focus:ring-2 focus:ring-[#2F3FBF]/12 dark:border-white/10 dark:bg-slate-950 dark:text-slate-100" required />
        </div>
      </div>
      {message ? <p className="text-xs text-emerald-700">{message}</p> : null}
      {error ? <p className="text-xs font-medium text-rose-600">{error}</p> : null}
      <Button type="submit" className="h-11 w-full" disabled={isSubmitting}>
        {isSubmitting ? 'Creating account...' : 'Create Account'}
      </Button>
      <p className="text-center text-xs text-gray-500 dark:text-slate-400">
        Already have an account? <Link href={APP_ROUTES.signIn} className="font-semibold text-[#2F3FBF]">Sign in</Link>
      </p>
    </form>
  );
}
