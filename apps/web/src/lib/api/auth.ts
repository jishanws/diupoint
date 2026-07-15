import { apiRequest } from '@/lib/api/http';
import type {
  ApiAuthUser,
  ApiSignInResponse,
  ApiSignUpResponse,
} from '@/lib/api/types';

export interface SignUpPayload {
  email: string;
  password: string;
}

export interface SignInPayload {
  email: string;
  password: string;
}

export async function signUpWithPassword(
  payload: SignUpPayload
): Promise<ApiSignUpResponse> {
  return apiRequest<ApiSignUpResponse>('/auth/signup', {
    method: 'POST',
    body: payload,
  });
}

export async function signInWithPassword(
  payload: SignInPayload
): Promise<ApiSignInResponse> {
  return apiRequest<ApiSignInResponse>('/auth/signin', {
    method: 'POST',
    body: payload,
  });
}

export async function fetchAuthMe(accessToken: string): Promise<ApiAuthUser> {
  return apiRequest<ApiAuthUser>('/auth/me', {
    method: 'GET',
    accessToken,
  });
}
