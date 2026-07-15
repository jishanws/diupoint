import { Module } from '@nestjs/common';

import { VerificationController } from './verification.controller';
import { VerificationEmailService } from './verification-email.service';
import { VerificationService } from './verification.service';

@Module({
  controllers: [VerificationController],
  providers: [VerificationService, VerificationEmailService],
  exports: [VerificationService],
})
export class VerificationModule {}
