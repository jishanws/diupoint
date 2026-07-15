import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { randomInt } from 'node:crypto';
import {
  VerificationRequestStatus,
  VerificationStatus,
} from '../../common/legacy-prisma-enums';
import { isDiuEmail, normalizeEmail } from '../auth/diu-email';
import { comparePassword, hashPassword } from '../auth/password-hasher';

import { ConfirmVerificationDto } from './dto/confirm-verification.dto';
import { RequestVerificationDto } from './dto/request-verification.dto';
import { VerificationEmailService } from './verification-email.service';

const prisma: any = new PrismaClient();
const OTP_EXPIRY_MINUTES = 10;

@Injectable()
export class VerificationService {
  constructor(
    private readonly verificationEmailService: VerificationEmailService
  ) {}

  async requestVerification(userId: string, dto: RequestVerificationDto) {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        email: true,
      },
    });

    if (!user) {
      throw new NotFoundException('User not found.');
    }

    const verificationEmail = normalizeEmail(dto.verificationEmail);
    if (verificationEmail !== user.email) {
      throw new BadRequestException(
        'Verification must use the email address registered to this account.'
      );
    }

    return this.issueVerificationOtp(user.id, user.email);
  }

  async issueVerificationOtp(userId: string, verificationEmail: string) {
    const normalizedEmail = normalizeEmail(verificationEmail);
    this.assertDiuEmail(normalizedEmail);

    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        email: true,
        verificationStatus: true,
      },
    });

    if (!user) {
      throw new NotFoundException('User not found.');
    }

    if (user.email !== normalizedEmail) {
      throw new BadRequestException(
        'Verification must use the email address registered to this account.'
      );
    }

    if (user.verificationStatus === VerificationStatus.VERIFIED) {
      throw new BadRequestException('Account is already verified.');
    }

    const otp = this.generateOtp();
    const otpCodeHash = await hashPassword(otp);
    const expiresAt = new Date(Date.now() + OTP_EXPIRY_MINUTES * 60 * 1000);

    await prisma.$transaction([
      prisma.verificationRequest.updateMany({
        where: {
          userId,
          status: VerificationRequestStatus.PENDING,
        },
        data: {
          status: VerificationRequestStatus.CANCELLED,
        },
      }),
      prisma.verificationRequest.create({
        data: {
          userId,
          verificationEmail: normalizedEmail,
          otpCodeHash,
          expiresAt,
          status: VerificationRequestStatus.PENDING,
        },
      }),
    ]);

    await this.verificationEmailService.sendOtp(normalizedEmail, otp, expiresAt);

    return {
      message: 'Verification OTP sent successfully.',
      verificationEmail: normalizedEmail,
      expiresAt,
    };
  }

  async confirmVerification(dto: ConfirmVerificationDto) {
    const verificationEmail = normalizeEmail(dto.verificationEmail);
    this.assertDiuEmail(verificationEmail);

    const now = new Date();
    const verificationRequest = await prisma.verificationRequest.findFirst({
      where: {
        verificationEmail,
        status: VerificationRequestStatus.PENDING,
        expiresAt: { gt: now },
      },
      orderBy: { createdAt: 'desc' },
    });

    if (!verificationRequest) {
      throw new BadRequestException('No valid verification request found.');
    }

    const isOtpValid = await comparePassword(
      dto.otp,
      verificationRequest.otpCodeHash
    );
    if (!isOtpValid) {
      throw new BadRequestException('Invalid OTP code.');
    }

    const [updatedUser] = await prisma.$transaction([
      prisma.user.update({
        where: { id: verificationRequest.userId },
        data: {
          verificationStatus: VerificationStatus.VERIFIED,
          verifiedAt: now,
        },
        select: {
          id: true,
          fullName: true,
          email: true,
          accountType: true,
          verificationStatus: true,
          verifiedAt: true,
          isActive: true,
          createdAt: true,
          updatedAt: true,
        },
      }),
      prisma.verificationRequest.update({
        where: { id: verificationRequest.id },
        data: { status: VerificationRequestStatus.VERIFIED },
      }),
      prisma.verificationRequest.updateMany({
        where: {
          userId: verificationRequest.userId,
          verificationEmail,
          status: VerificationRequestStatus.PENDING,
          id: { not: verificationRequest.id },
        },
        data: {
          status: VerificationRequestStatus.CANCELLED,
        },
      }),
    ]);

    return {
      message: 'Account verification completed successfully.',
      user: updatedUser,
    };
  }

  private assertDiuEmail(email: string) {
    if (!isDiuEmail(email)) {
      throw new BadRequestException(
        'Only official DIU student email addresses are allowed for verification.'
      );
    }
  }

  private generateOtp() {
    return randomInt(100000, 1000000).toString();
  }
}
