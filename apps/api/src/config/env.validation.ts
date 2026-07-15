import { Type, plainToInstance } from 'class-transformer';
import {
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  Max,
  Min,
  validateSync,
} from 'class-validator';

class EnvironmentVariables {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  DATABASE_URL?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  PROD_DATABASE_URL?: string;

  @IsString()
  @IsNotEmpty()
  JWT_SECRET!: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  GOOGLE_CLIENT_ID?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  GOOGLE_CLIENT_SECRET?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  GOOGLE_CALLBACK_URL?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  FRONTEND_URL?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  SMTP_HOST?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  SMTP_PORT?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  SMTP_USER?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  SMTP_PASSWORD?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  SMTP_FROM?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  SMTP_SECURE?: string;

  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(65535)
  PORT: number = 4000;
}

export function validateEnv(config: Record<string, unknown>) {
  const validatedConfig = plainToInstance(EnvironmentVariables, config, {
    enableImplicitConversion: true,
  });

  const errors = validateSync(validatedConfig, {
    skipMissingProperties: false,
  });

  if (errors.length > 0) {
    throw new Error(errors.toString());
  }

  // Consolidate database URL. Azure App Service might set PROD_DATABASE_URL.
  // We'll prioritize it and fall back to DATABASE_URL, then set it as the definitive DATABASE_URL.
  const effectiveDatabaseUrl =
    validatedConfig.PROD_DATABASE_URL ?? validatedConfig.DATABASE_URL;

  // The comment in the original code stated that the DB URL is optional and the
  // health endpoint would handle graceful degradation. We will respect that.
  if (effectiveDatabaseUrl) {
    validatedConfig.DATABASE_URL = effectiveDatabaseUrl;
  }

  return validatedConfig;
}
