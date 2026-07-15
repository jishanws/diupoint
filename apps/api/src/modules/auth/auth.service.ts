import { Prisma, PrismaClient } from '@prisma/client';
import {
  BadRequestException,
  ConflictException,
  HttpException,
  Injectable,
  InternalServerErrorException,
  ServiceUnavailableException,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { randomUUID } from 'node:crypto';
import {
  AccountType,
  VerificationStatus,
} from '../../common/legacy-prisma-enums';
import { VerificationService } from '../verification/verification.service';

import { SignInDto } from './dto/sign-in.dto';
import { SignUpDto } from './dto/sign-up.dto';
import { isDiuEmail, normalizeEmail } from './diu-email';
import { comparePassword, hashPassword } from './password-hasher';
import { GoogleAuthUser } from './strategies/google.strategy';

const prisma: any = new PrismaClient();

type SafeUser = {
  id: string;
  fullName: string;
  email: string;
  accountType: AccountType;
  verificationStatus: VerificationStatus;
  verifiedAt: Date | null;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
  storeProfile: {
    id: string;
    storeName: string;
    slug: string;
    isFeatured: boolean;
    logoUrl: string | null;
    bannerUrl: string | null;
  } | null;
};

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly verificationService: VerificationService
  ) {}

  async signUp(dto: SignUpDto) {
    return this.withAuthAvailability(async () => {
      const email = normalizeEmail(dto.email);

      if (!isDiuEmail(email)) {
        throw new BadRequestException(
          'Only official DIU student email addresses can create an account.'
        );
      }

      const existingUser = await prisma.user.findUnique({ where: { email } });

      if (existingUser) {
        if (
          existingUser.verificationStatus !== VerificationStatus.VERIFIED &&
          (await comparePassword(dto.password, existingUser.passwordHash))
        ) {
          await this.verificationService.issueVerificationOtp(
            existingUser.id,
            existingUser.email
          );

          return this.buildVerificationRequiredResponse(existingUser.email);
        }

        throw new ConflictException('Email is already registered.');
      }

      const passwordHash = await hashPassword(dto.password);

      const createdUser = await prisma.user.create({
        data: {
          fullName: this.nameFromEmail(email),
          email,
          passwordHash,
          accountType: AccountType.PERSONAL,
          verificationStatus: VerificationStatus.UNVERIFIED,
          verifiedAt: null,
        },
        include: {
          storeProfile: {
            select: {
              id: true,
              storeName: true,
              slug: true,
              isFeatured: true,
              logoUrl: true,
              bannerUrl: true,
            },
          },
        },
      });

      await this.verificationService.issueVerificationOtp(
        createdUser.id,
        createdUser.email
      );

      return this.buildVerificationRequiredResponse(createdUser.email);
    });
  }

  async signIn(dto: SignInDto) {
    return this.withAuthAvailability(async () => {
      const email = normalizeEmail(dto.email);

      if (!isDiuEmail(email)) {
        throw new UnauthorizedException('Invalid email or password.');
      }

      const user = await prisma.user.findUnique({
        where: { email },
        include: {
          storeProfile: {
            select: {
              id: true,
              storeName: true,
              slug: true,
              isFeatured: true,
              logoUrl: true,
              bannerUrl: true,
            },
          },
        },
      });

      if (!user) {
        throw new UnauthorizedException('Invalid email or password.');
      }

      const isPasswordValid = await comparePassword(
        dto.password,
        user.passwordHash
      );
      if (!isPasswordValid) {
        throw new UnauthorizedException('Invalid email or password.');
      }

      if (!user.isActive) {
        throw new UnauthorizedException('Unable to sign in with this account.');
      }

      if (user.verificationStatus !== VerificationStatus.VERIFIED) {
        throw new UnauthorizedException(
          'Please verify your DIU email before signing in.'
        );
      }

      return this.buildAuthSuccessResponse(user.id, user.email, {
        id: user.id,
        fullName: user.fullName,
        email: user.email,
        accountType: user.accountType,
        verificationStatus: user.verificationStatus,
        verifiedAt: user.verifiedAt,
        isActive: user.isActive,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
        storeProfile: user.storeProfile,
      });
    });
  }

  async me(userId: string) {
    return this.withAuthAvailability(async () => {
      const user = await prisma.user.findUnique({
        where: { id: userId },
        include: {
          storeProfile: {
            select: {
              id: true,
              storeName: true,
              slug: true,
              isFeatured: true,
              logoUrl: true,
              bannerUrl: true,
            },
          },
        },
      });

      if (!user) {
        throw new UnauthorizedException('Invalid access token.');
      }

      if (!user.isActive) {
        throw new UnauthorizedException('Invalid access token.');
      }

      return this.toSafeUser(user);
    });
  }

  async signInWithGoogle(googleUser: GoogleAuthUser) {
    return this.withAuthAvailability(async () => {
      const email = normalizeEmail(googleUser.email);
      const fullName = this.normalizeName(googleUser.fullName) || 'Google User';

      if (!email || !isDiuEmail(email)) {
        throw new UnauthorizedException('GOOGLE_DIU_EMAIL_REQUIRED');
      }

      if (!googleUser.emailVerified) {
        throw new UnauthorizedException('GOOGLE_EMAIL_NOT_VERIFIED');
      }

      let user = await prisma.user.findUnique({
        where: { email },
        include: {
          storeProfile: {
            select: {
              id: true,
              storeName: true,
              slug: true,
              isFeatured: true,
              logoUrl: true,
              bannerUrl: true,
            },
          },
        },
      });

      if (!user) {
        const oauthPlaceholderHash = await hashPassword(
          `google-oauth:${randomUUID()}`
        );

        user = await prisma.user.create({
          data: {
            fullName,
            email,
            passwordHash: oauthPlaceholderHash,
            accountType: AccountType.PERSONAL,
            verificationStatus: VerificationStatus.VERIFIED,
            verifiedAt: new Date(),
          },
          include: {
            storeProfile: {
              select: {
                id: true,
                storeName: true,
                slug: true,
                isFeatured: true,
                logoUrl: true,
                bannerUrl: true,
              },
            },
          },
        });
      } else {
        if (!user.isActive) {
          throw new UnauthorizedException('GOOGLE_ACCOUNT_INACTIVE');
        }

        if (user.verificationStatus !== VerificationStatus.VERIFIED) {
          user = await prisma.user.update({
            where: { id: user.id },
            data: {
              verificationStatus: VerificationStatus.VERIFIED,
              verifiedAt: new Date(),
            },
            include: {
              storeProfile: {
                select: {
                  id: true,
                  storeName: true,
                  slug: true,
                  isFeatured: true,
                  logoUrl: true,
                  bannerUrl: true,
                },
              },
            },
          });
        }
      }

      return this.buildAuthSuccessResponse(user.id, user.email, {
        id: user.id,
        fullName: user.fullName,
        email: user.email,
        accountType: user.accountType,
        verificationStatus: user.verificationStatus,
        verifiedAt: user.verifiedAt,
        isActive: user.isActive,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
        storeProfile: user.storeProfile,
      });
    });
  }

  isGoogleOAuthConfigured(): boolean {
    const clientId = this.configService.get<string>('GOOGLE_CLIENT_ID')?.trim();
    const clientSecret = this.configService
      .get<string>('GOOGLE_CLIENT_SECRET')
      ?.trim();
    const callbackUrl = this.configService
      .get<string>('GOOGLE_CALLBACK_URL')
      ?.trim();

    return Boolean(clientId && clientSecret && callbackUrl);
  }

  sanitizeReturnTo(returnTo?: string): string {
    if (typeof returnTo === 'string' && returnTo.startsWith('/')) {
      return returnTo;
    }

    return '/';
  }

  buildFrontendCallbackUrl(params: {
    token?: string;
    error?: string;
    returnTo?: string;
  }): string {
    const frontendUrl = this.getFrontendUrl();

    let callbackUrl: URL;

    try {
      callbackUrl = new URL('/auth/callback', frontendUrl);
    } catch {
      throw new InternalServerErrorException(
        'Invalid FRONTEND_URL configuration.'
      );
    }

    if (params.token) {
      callbackUrl.searchParams.set('token', params.token);
    }

    if (params.error) {
      callbackUrl.searchParams.set('error', params.error);
    }

    const safeReturnTo = this.sanitizeReturnTo(params.returnTo);
    callbackUrl.searchParams.set('returnTo', safeReturnTo);

    return callbackUrl.toString();
  }

  private async signAccessToken(userId: string, email: string) {
    return this.jwtService.signAsync({
      sub: userId,
      email,
    });
  }

  private async buildAuthSuccessResponse(
    userId: string,
    email: string,
    user: {
      id: string;
      fullName: string;
      email: string;
      accountType: AccountType;
      verificationStatus: VerificationStatus;
      verifiedAt: Date | null;
      isActive: boolean;
      createdAt: Date;
      updatedAt: Date;
      storeProfile: {
        id: string;
        storeName: string;
        slug: string;
        isFeatured: boolean;
        logoUrl: string | null;
        bannerUrl: string | null;
      } | null;
    }
  ) {
    const accessToken = await this.signAccessToken(userId, email);

    return {
      accessToken,
      user: this.toSafeUser(user),
    };
  }

  private normalizeName(fullName: string): string {
    return fullName.trim().replace(/\s+/g, ' ');
  }

  private getFrontendUrl(): string {
    const frontendUrl = this.configService.get<string>('FRONTEND_URL')?.trim();

    if (!frontendUrl || frontendUrl.length === 0) {
      return 'http://localhost:3000';
    }

    return frontendUrl;
  }

  private async withAuthAvailability<T>(action: () => Promise<T>): Promise<T> {
    try {
      return await action();
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }

      if (
        error instanceof Prisma.PrismaClientInitializationError ||
        error instanceof Prisma.PrismaClientRustPanicError ||
        error instanceof Prisma.PrismaClientUnknownRequestError
      ) {
        throw new ServiceUnavailableException(
          'Authentication service is temporarily unavailable.'
        );
      }

      throw error;
    }
  }

  private nameFromEmail(email: string): string {
    const localPart = email.split('@')[0] ?? 'DIU Student';
    const name = localPart
      .split(/[._-]+/)
      .filter(Boolean)
      .map((part) => `${part.charAt(0).toUpperCase()}${part.slice(1)}`)
      .join(' ');

    return name || 'DIU Student';
  }

  private buildVerificationRequiredResponse(email: string) {
    return {
      message: 'A verification code has been sent to your DIU email.',
      verificationRequired: true,
      verificationEmail: email,
    };
  }

  private toSafeUser(user: {
    id: string;
    fullName: string;
    email: string;
    accountType: AccountType;
    verificationStatus: VerificationStatus;
    verifiedAt: Date | null;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
    storeProfile: {
      id: string;
      storeName: string;
      slug: string;
      isFeatured: boolean;
      logoUrl: string | null;
      bannerUrl: string | null;
    } | null;
  }): SafeUser {
    return {
      id: user.id,
      fullName: user.fullName,
      email: user.email,
      accountType: user.accountType,
      verificationStatus: user.verificationStatus,
      verifiedAt: user.verifiedAt,
      isActive: user.isActive,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
      storeProfile: user.storeProfile
        ? {
            id: user.storeProfile.id,
            storeName: user.storeProfile.storeName,
            slug: user.storeProfile.slug,
            isFeatured: user.storeProfile.isFeatured,
            logoUrl: user.storeProfile.logoUrl,
            bannerUrl: user.storeProfile.bannerUrl,
          }
        : null,
    };
  }
}
