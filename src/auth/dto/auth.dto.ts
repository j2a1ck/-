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
  @ApiProperty({ example: 'strongPassword123' })
  @IsEmail()
  readonly email: string;
}
export class verifyRestPasswordDTo {
  @ApiProperty({ example: 'user@example.com' })
  @IsEmail()
  readonly email: string;

  @ApiProperty({ example: '234hk2j3h4i2uh34iuh' })
  @IsString()
  readonly token: string;

  @ApiProperty({ example: 'strongPassword123' })
  @IsString()
  @MinLength(6)
  readonly newPassword: string;
}
