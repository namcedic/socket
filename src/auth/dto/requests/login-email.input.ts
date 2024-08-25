import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsEmail, IsString, MaxLength } from 'class-validator';

export class LoginEmailInput {
  @ApiProperty()
  @IsString()
  @IsEmail()
  @MaxLength(255)
  @Transform(({ value }) => (value ? value?.toLowerCase()?.trim() : null))
  email: string;

  @ApiProperty()
  @IsString()
  @MaxLength(255)
  password: string;
}
