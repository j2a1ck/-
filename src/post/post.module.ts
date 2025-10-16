import { Module } from '@nestjs/common';
import { PostService } from './post.service';
import { PostController } from './post.controller';
import { UsersModule } from 'src/users/users.module';
import { PrismaService } from 'src/prisma.service';
@Module({
  imports: [UsersModule],
  providers: [PostService, PrismaService],
  controllers: [PostController],
  exports: [PostService],
})
export class PostModule {}
