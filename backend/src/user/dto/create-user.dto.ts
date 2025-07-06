/* eslint-disable @typescript-eslint/no-unsafe-call */
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';
import { Transform } from 'class-transformer';
import { lowerCaseTransformer } from '../../utils/transformers/lower-case.transformer';

export class CreateUserDto {
  @IsEmail()
  @Transform(lowerCaseTransformer)
  email: string;

  @IsString()
  @MinLength(6)
  password: string;
  @IsNotEmpty()
  @IsString()
  role: 'admin' | 'user';
}
