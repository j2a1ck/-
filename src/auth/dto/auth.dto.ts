import { IsEmail, IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class signUpDto {
  @ApiProperty({ example: 'user@example.com' })
  @IsEmail()
  readonly email: string;

  @ApiProperty({ example: 'strongPassword123' })
  @IsString()
  @MinLength(6)
  readonly pass: string;
}

export class loginDto {
  @ApiProperty({ example: 'user@example.com' })
  @IsEmail()
  readonly email: string;

  @ApiProperty({ example: 'strongPassword123' })
  @IsString()
  @MinLength(6)
  readonly pass: string;
}

export class restPasswordDto {
  @IsEmail()
  readonly email: string;
}
export class verifyRestPasswordDTo {
  @IsEmail()
  readonly email: string;

  @IsString()
  readonly token: string;

  @IsString()
  @MinLength(6)
  readonly newPassword: string;
}
