import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';

import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { ConfirmVerificationDto } from './dto/confirm-verification.dto';
import { RequestVerificationDto } from './dto/request-verification.dto';
import { VerificationService } from './verification.service';

type AuthenticatedRequest = {
  user: {
    sub: string;
    email: string;
  };
};

@Controller('verification')
export class VerificationController {
  constructor(private readonly verificationService: VerificationService) {}

  @Post('request')
  @UseGuards(JwtAuthGuard)
  requestVerification(
    @Req() req: AuthenticatedRequest,
    @Body() dto: RequestVerificationDto
  ) {
    return this.verificationService.requestVerification(req.user.sub, dto);
  }

  @Post('confirm')
  confirmVerification(@Body() dto: ConfirmVerificationDto) {
    return this.verificationService.confirmVerification(dto);
  }
}
