import { Injectable, ServiceUnavailableException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import nodemailer from 'nodemailer';

@Injectable()
export class VerificationEmailService {
  constructor(private readonly configService: ConfigService) {}

  async sendOtp(email: string, otp: string, expiresAt: Date) {
    const host = this.configService.get<string>('SMTP_HOST')?.trim();
    const user = this.configService.get<string>('SMTP_USER')?.trim();
    const password = this.configService.get<string>('SMTP_PASSWORD');
    const from = this.configService.get<string>('SMTP_FROM')?.trim();

    if (!host || !user || !password || !from) {
      throw new ServiceUnavailableException(
        'Email verification is temporarily unavailable. Please try again later.'
      );
    }

    const port = Number(this.configService.get<string>('SMTP_PORT') ?? '587');
    const secure = this.configService.get<string>('SMTP_SECURE') === 'true';

    if (!Number.isInteger(port) || port < 1 || port > 65535) {
      throw new ServiceUnavailableException(
        'Email verification is temporarily unavailable. Please try again later.'
      );
    }

    const transporter = nodemailer.createTransport({
      host,
      port,
      secure,
      auth: { user, pass: password },
    });

    try {
      await transporter.sendMail({
        from,
        to: email,
        subject: 'Your DIUPoint verification code',
        text: `Your DIUPoint verification code is ${otp}. It expires at ${expiresAt.toISOString()}. Do not share this code.`,
      });
    } catch {
      throw new ServiceUnavailableException(
        'Email verification is temporarily unavailable. Please try again later.'
      );
    }
  }
}
