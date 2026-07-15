import { Transform } from 'class-transformer';
import {
  IsEmail,
  IsString,
  MaxLength,
  Matches,
  MinLength,
} from 'class-validator';

export class SignUpDto {
  @Transform(({ value }) => String(value).trim().toLowerCase())
  @IsEmail()
  @Matches(/@(diu\.edu\.bd|s\.diu\.edu\.bd)$/, {
    message: 'email must use an official DIU student email address',
  })
  email!: string;

  @IsString()
  @MinLength(8)
  @MaxLength(128)
  password!: string;
}
