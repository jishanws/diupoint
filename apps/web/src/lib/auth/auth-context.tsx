'use client';

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import {
  fetchAuthMe,
  signInWithPassword,
  type SignInPayload,
} from '@/lib/api/auth';
import { clearToken, getToken, setToken } from '@/lib/auth/token';
import type { ApiAuthUser } from '@/lib/api/types';

type VerificationStatus = 'VERIFIED' | 'UNVERIFIED' | 'PENDING' | null;
type AccountType = 'PERSONAL' | 'STORE' | null;

interface AuthContextValue {
  token: string | null;
  currentUser: ApiAuthUser | null;
  isAuthenticated: boolean;
  verificationStatus: VerificationStatus;
  accountType: AccountType;
  isLoading: boolean;
  hydrateAuth: () => Promise<void>;
  signIn: (payload: SignInPayload) => Promise<ApiAuthUser>;
  refreshCurrentUser: () => Promise<ApiAuthUser | null>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [token, setTokenState] = useState<string | null>(null);
  const [currentUser, setCurrentUser] = useState<ApiAuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const logout = useCallback(() => {
    clearToken();
    setTokenState(null);
    setCurrentUser(null);
  }, []);

  const hydrateAuth = useCallback(async () => {
    const storedToken = getToken();

    if (!storedToken) {
      setTokenState(null);
      setCurrentUser(null);
      setIsLoading(false);
      return;
    }

    setIsLoading(true);

    try {
      const user = await fetchAuthMe(storedToken);
      setTokenState(storedToken);
      setCurrentUser(user);
    } catch {
      logout();
    } finally {
      setIsLoading(false);
    }
  }, [logout]);

  const refreshCurrentUser = useCallback(async () => {
    const activeToken = token ?? getToken();

    if (!activeToken) {
      setCurrentUser(null);
      return null;
    }

    try {
      const user = await fetchAuthMe(activeToken);
      setCurrentUser(user);
      setTokenState(activeToken);
      return user;
    } catch {
      logout();
      return null;
    }
  }, [logout, token]);

  const signIn = useCallback(async (payload: SignInPayload) => {
    const response = await signInWithPassword(payload);

    setToken(response.accessToken);
    setTokenState(response.accessToken);
    const hydratedUser = await fetchAuthMe(response.accessToken).catch(
      () => response.user
    );
    setCurrentUser(hydratedUser);

    return hydratedUser;
  }, []);

  useEffect(() => {
    void hydrateAuth();
  }, [hydrateAuth]);

  const value = useMemo<AuthContextValue>(() => {
    const verificationStatus =
      currentUser?.verificationStatus === 'VERIFIED'
        ? 'VERIFIED'
        : currentUser?.verificationStatus === 'PENDING'
          ? 'PENDING'
          : currentUser?.verificationStatus === 'UNVERIFIED'
            ? 'UNVERIFIED'
            : null;

    return {
      token,
      currentUser,
      isAuthenticated: Boolean(token && currentUser),
      verificationStatus,
      accountType: currentUser?.accountType ?? null,
      isLoading,
      hydrateAuth,
      signIn,
      refreshCurrentUser,
      logout,
    };
  }, [
    token,
    currentUser,
    isLoading,
    hydrateAuth,
    signIn,
    refreshCurrentUser,
    logout,
  ]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextValue {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }

  return context;
}
