import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  Req,
  Res,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';

import { SignInDto } from './dto/sign-in.dto';
import { SignUpDto } from './dto/sign-up.dto';
import { GoogleAuthGuard } from './guards/google-auth.guard';
import { GoogleCallbackAuthGuard } from './guards/google-callback-auth.guard';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { GoogleAuthUser } from './strategies/google.strategy';
import { AuthService } from './auth.service';

type AuthenticatedRequest = {
  user: {
    sub: string;
    email: string;
  };
};

type GoogleAuthenticatedRequest = {
  user?: GoogleAuthUser;
};

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('google')
  googleAuthEntry(
    @Res() response: { redirect: (url: string) => void },
    @Query('returnTo') returnTo?: string
  ) {
    if (!this.authService.isGoogleOAuthConfigured()) {
      return response.redirect(
        this.authService.buildFrontendCallbackUrl({
          error: 'google_oauth_not_configured',
          returnTo,
        })
      );
    }

    const safeReturnTo = this.authService.sanitizeReturnTo(returnTo);

    return response.redirect(
      `/api/auth/google/start?returnTo=${encodeURIComponent(safeReturnTo)}`
    );
  }

  @Get('google/start')
  @UseGuards(GoogleAuthGuard)
  googleAuthStart() {
    return;
  }

  @Get('google/callback')
  @UseGuards(GoogleCallbackAuthGuard)
  async googleAuthCallback(
    @Req() req: GoogleAuthenticatedRequest,
    @Res() response: { redirect: (url: string) => void }
  ) {
    try {
      if (!req.user) {
        return response.redirect(
          this.authService.buildFrontendCallbackUrl({
            error: 'google_auth_failed',
          })
        );
      }

      const authResult = await this.authService.signInWithGoogle(req.user);

      return response.redirect(
        this.authService.buildFrontendCallbackUrl({
          token: authResult.accessToken,
          returnTo: req.user.returnTo,
        })
      );
    } catch (error) {
      const message =
        error instanceof UnauthorizedException ? error.message : undefined;
      const errorCode =
        message === 'GOOGLE_DIU_EMAIL_REQUIRED'
          ? 'google_diu_email_required'
          : message === 'GOOGLE_EMAIL_NOT_VERIFIED'
            ? 'google_email_not_verified'
            : message === 'GOOGLE_ACCOUNT_INACTIVE'
              ? 'google_account_inactive'
              : 'google_callback_failed';

      return response.redirect(
        this.authService.buildFrontendCallbackUrl({
          error: errorCode,
          returnTo: req.user?.returnTo,
        })
      );
    }
  }

  @Post('signup')
  signUp(@Body() dto: SignUpDto) {
    return this.authService.signUp(dto);
  }

  @Post('signin')
  signIn(@Body() dto: SignInDto) {
    return this.authService.signIn(dto);
  }

  @UseGuards(JwtAuthGuard)
  @Get('me')
  me(@Req() req: AuthenticatedRequest) {
    return this.authService.me(req.user.sub);
  }
}
