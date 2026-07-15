import { apiRequest, apiRequestWithAuth } from '@/lib/api/http';
import type {
  ApiVerificationConfirmResponse,
  ApiVerificationRequestResponse,
} from '@/lib/api/types';

export interface RequestVerificationPayload {
  verificationEmail: string;
}

export interface ConfirmVerificationPayload {
  verificationEmail: string;
  otp: string;
}

export async function requestVerificationOtp(
  payload: RequestVerificationPayload
): Promise<ApiVerificationRequestResponse> {
  return apiRequestWithAuth<ApiVerificationRequestResponse>(
    '/verification/request',
    {
      method: 'POST',
      body: payload,
    }
  );
}

export async function confirmVerificationOtp(
  payload: ConfirmVerificationPayload
): Promise<ApiVerificationConfirmResponse> {
  return apiRequest<ApiVerificationConfirmResponse>(
    '/verification/confirm',
    {
      method: 'POST',
      body: payload,
    }
  );
}
