import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { generateResetToken } from '../common/utils/token.util';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signUp(email: string, pass: string) {
    try {
      await this.usersService.registerUser(email, pass);
      return { message: 'User registered successfully' };
    } catch (error) {
      if (error.code === 'P2002') {
        throw new ConflictException('User with this email already exists');
      }
      console.log(error);
    }
  }

  async signIn(
    email: string,
    pass: string,
  ): Promise<{ access_token: string; message: string }> {
    try {
      const user = await this.usersService.findUser(email);
      const isMatch = await bcrypt.compare(pass, user?.password);
      if (!isMatch) {
        throw new UnauthorizedException();
      }
      const payload = { sub: user.id, email: user.email };
      return {
        access_token: await this.jwtService.signAsync(payload),
        message: 'User login successfully',
      };
    } catch (error) {
      console.log(error as string);
      return { access_token: '', message: 'Login failed' };
    }
  }

  async userInformation(email: string) {
    const user = await this.usersService.findUser(email);
    return user;
  }
  async requestResetPassword(email: string) {
    const user = await this.usersService.findUser(email);
    if (!user) return;

    const token = generateResetToken();
    const now = new Date();
    const expires = new Date(now.getTime() + 60 * 60 * 1000); // 60 min * 60 sec * 1000 ms = 1hour

    await this.usersService.updateResetToken(user.email, {
      resetToken: token,
      resetTokenExpires: expires,
    });

    const resetLink = `${process.env.forgetPasswordLink}${token}`;
    console.log('Password reset link:', resetLink); // replace with email service
    return resetLink;
  }

  async resetPassword(email: string, token: string, newPassword: string) {
    const user = await this.usersService.findUser(email);
    const now = new Date();
    if (!user?.resetTokenExpires || user.resetTokenExpires < now) {
      return { message: 'your token has expired' };
    } else {
      if (user?.resetToken === token) {
        await this.usersService.changePassword(email, newPassword);

        await this.usersService.updateResetToken(email, {
          resetToken: null,
          resetTokenExpires: null,
        });

        return { message: 'your password has been changed' };
      } else {
        return { message: 'your token is not valid' };
      }
    }
  }
}
