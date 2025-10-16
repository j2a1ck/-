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

@Controller('post')
export class PostController {
  constructor(private postService: PostService) {}
  @Post('articles')
  createArticle(@Request() req, @Body() createArticleDto: createArticleDto) {
    return this.postService.createArticle(
      createArticleDto.title,
      createArticleDto.text,
      req.user.sub,
    );
  }
  @Public()
  @Get('')
  getAllArticles() {
    return this.postService.getAllArticles();
  }

  @Get('/user')
  getUserArticles(@Request() req) {
    return this.postService.getUserArticles(Number(req.user.sub));
  }

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
  @Delete('/')
  deleteArticleById(@Query('id') articleId: string,@Request() req) {
    return this.postService.deleteArticleById(articleId, req.user.sub);
  }
}
