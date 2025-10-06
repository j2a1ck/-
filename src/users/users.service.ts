import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { User } from '../../generated/prisma';
@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async registerUser(email: string, pass: string) {
    await this.prisma.user.create({
      data: {
        email: email,
        password: pass,
        name: email,
        role: 'USER',
      },
    });
  }

  async findOne(email: string): Promise<User> {
    const user = await this.prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      throw new NotFoundException(`User with email "${email}" not found`);
    }
    return user;
  }
}
