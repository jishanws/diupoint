'use client';

import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Container from '@/components/ui/container';
import { useAuth } from '@/lib/auth/auth-context';
import { clearToken, setToken } from '@/lib/auth/token';
import { APP_ROUTES, sanitizeReturnTo } from '@/lib/routes';

function toErrorMessage(errorCode: string | null): string {
  if (errorCode === 'access_denied') {
    return 'Google sign-in was cancelled.';
  }

  if (errorCode === 'google_auth_failed') {
    return 'Google sign-in failed. Please try again.';
  }

  if (errorCode === 'google_callback_failed') {
    return 'Google callback failed. Please try again.';
  }

  if (errorCode === 'google_oauth_not_configured') {
    return 'Google OAuth is not configured on the server.';
  }

  if (errorCode === 'google_diu_email_required') {
    return 'Only official DIU student Google accounts are supported.';
  }

  if (errorCode === 'google_email_not_verified') {
    return 'Your Google email must be verified before you can use DIUPoint.';
  }

  if (errorCode === 'google_account_inactive') {
    return 'This DIUPoint account is inactive. Please contact support.';
  }

  if (errorCode === 'invalid_token') {
    return 'Google sign-in returned an invalid token.';
  }

  return 'Unable to complete Google sign-in.';
}

export default function AuthCallbackClient() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { hydrateAuth } = useAuth();
  const [isProcessing, setIsProcessing] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const token = searchParams.get('token');
  const error = searchParams.get('error');
  const returnTo = searchParams.get('returnTo');

  const redirectTarget = useMemo(
    () => sanitizeReturnTo(returnTo, APP_ROUTES.home),
    [returnTo]
  );

  useEffect(() => {
    let cancelled = false;

    async function processCallback() {
      if (error) {
        if (!cancelled) {
          setErrorMessage(toErrorMessage(error));
          setIsProcessing(false);
        }
        return;
      }

      if (!token) {
        if (!cancelled) {
          setErrorMessage(toErrorMessage('invalid_token'));
          setIsProcessing(false);
        }
        return;
      }

      try {
        setToken(token);
        await hydrateAuth();

        if (!cancelled) {
          router.replace(redirectTarget);
        }
      } catch {
        clearToken();

        if (!cancelled) {
          setErrorMessage(
            'Unable to finish Google sign-in. Please sign in again.'
          );
          setIsProcessing(false);
        }
      }
    }

    void processCallback();

    return () => {
      cancelled = true;
    };
  }, [error, hydrateAuth, redirectTarget, router, token]);

  return (
    <div className="min-h-screen bg-white transition-colors duration-200 dark:bg-slate-950">
      <main className="py-16 sm:py-20">
        <Container className="max-w-lg">
          <section className="rounded-3xl border border-gray-200/85 bg-white p-6 shadow-sm shadow-slate-900/5 dark:border-white/10 dark:bg-slate-900 sm:p-7">
            {isProcessing ? (
              <div>
                <h1 className="text-xl font-bold text-gray-950 dark:text-slate-100">
                  Completing Google sign-in...
                </h1>
                <p className="mt-2 text-sm text-gray-500 dark:text-slate-400">
                  Please wait while we sign you in.
                </p>
              </div>
            ) : (
              <div>
                <h1 className="text-xl font-bold text-gray-950 dark:text-slate-100">
                  Google sign-in could not be completed
                </h1>
                <p className="mt-2 text-sm text-rose-600 dark:text-rose-300">
                  {errorMessage || 'An unexpected error occurred.'}
                </p>
                <div className="mt-4 flex flex-wrap gap-2.5">
                  <Link
                    href={APP_ROUTES.signIn}
                    className="inline-flex h-10 items-center justify-center rounded-xl bg-[#2F3FBF] px-4 text-sm font-semibold text-white transition-colors hover:bg-[#2535a8]"
                  >
                    Back to sign in
                  </Link>
                  <Link
                    href={APP_ROUTES.home}
                    className="inline-flex h-10 items-center justify-center rounded-xl border border-gray-200 bg-white px-4 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50 dark:border-white/10 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800"
                  >
                    Go home
                  </Link>
                </div>
              </div>
            )}
          </section>
        </Container>
      </main>
    </div>
  );
}
