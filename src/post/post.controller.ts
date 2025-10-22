import {
  Controller,
  Post,
  Body,
  Request,
  Get,
  Patch,
  Query,
  Delete,
} from '@nestjs/common';
import { PostService } from './post.service';
import { createArticleDto } from './dto/post.dto';
import { updateArticleByIdDto } from './dto/post.dto';
import { Public } from 'src/common/decorators/public.decorator';
import { ApiResponse } from '@nestjs/swagger';

@Controller('post')
export class PostController {
  constructor(private postService: PostService) {}

  @ApiResponse({
    status: 200,
    schema: {
      example: {
        message: 'your post added successfully',
      },
    },
  })
  @Post('articles')
  createArticle(@Request() req, @Body() createArticleDto: createArticleDto) {
    return this.postService.createArticle(
      createArticleDto.title,
      createArticleDto.text,
      req.user.sub,
    );
  }

  @ApiResponse({
    status: 200,
    schema: {
      example: {
        id: 3,
        author_id: 22,
        text: 'text of article',
        title: 'title of article',
        createdAt: '2025-10-16T12:55:56.896Z',
        updatedAt: '2025-10-16T12:55:56.896Z',
      },
    },
  })
  @Public()
  @Get('')
  getAllArticles() {
    return this.postService.getAllArticles();
  }

  @ApiResponse({
    status: 200,
    schema: {
      example: {
        id: 3,
        author_id: 22,
        text: 'text of article',
        title: 'title of article',
        createdAt: '2025-10-16T12:55:56.896Z',
        updatedAt: '2025-10-16T12:55:56.896Z',
      },
    },
  })
  @Get('/user')
  getUserArticles(@Request() req) {
    return this.postService.getUserArticles(Number(req.user.sub));
  }

  @ApiResponse({
    status: 200,
    schema: {
      example: {
        id: 8,
        author_id: 25,
        text: 'new text',
        title: 'new title',
        createdAt: '2025-10-16T13:26:44.879Z',
        updatedAt: '2025-10-16T15:00:50.953Z',
      },
    },
  })
  @Patch('/')
  updateArticleById(
    @Query('id') postId: string,
    @Body() updateArticleByIdDto: updateArticleByIdDto,
    @Request() userId,
  ) {
    return this.postService.updateArticleById(
      postId,
      updateArticleByIdDto.title,
      updateArticleByIdDto.text,
      userId.user.sub,
    );
  }

  @ApiResponse({
    status: 200,
    schema: {
      example: {
        message: 'article delete successfully',
      },
    },
  })
  @Delete('/')
  deleteArticleById(@Query('id') articleId: string, @Request() req) {
    return this.postService.deleteArticleById(articleId, req.user.sub);
  }
}
