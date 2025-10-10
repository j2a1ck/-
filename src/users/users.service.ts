import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { User } from '../../generated/prisma';
import * as bcrypt from 'bcrypt';
@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async registerUser(email: string, pass: string) {
    const saltOrRounds = 10;
    const hash = await bcrypt.hash(pass, saltOrRounds);
    await this.prisma.user.create({
      data: {
        email: email,
        password: hash,
        name: email,
        role: 'USER',
      },
    });
  }

  async findUser(email: string): Promise<User> {
    const user = await this.prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      throw new NotFoundException(`User with email "${email}" not found`);
    }
    return user;
  }
  async updateResetToken(
    email: string,
    data: { resetToken: string | null; resetTokenExpires: Date | null },
  ) {
    await this.prisma.user.update({
      where: {
        email: email,
      },
      data: {
        resetToken: data.resetToken,
        resetTokenExpires: data.resetTokenExpires,
      },
    });
  }

  async changePassword(email: string, newPassword: string) {
    const saltOrRounds = 10;
    const hash = await bcrypt.hash(newPassword, saltOrRounds);
    await this.prisma.user.update({
      where: {
        email: email,
      },
      data: {
        password: hash,
      },
    });
  }
}
