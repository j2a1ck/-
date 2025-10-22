import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { PrismaService } from '../prisma.service';

@Injectable()
export class PostService {
  constructor(private prisma: PrismaService) {}

  async createArticle(title: string, text: string, id: number) {
    try {
      const newPost = await this.prisma.post.create({
        data: {
          title: title,
          text: text,
          author_id: id,
        },
      });
      return { message: 'your post added successfully', postId: newPost.id };
    } catch (error) {
      if (error.code === 'P2003') {
        throw new BadRequestException('Invalid author ID provided');
      }

      throw new InternalServerErrorException(
        'Failed to create article. Please try again.',
      );
    }
  }

  async getAllArticles() {
    try {
      const articles = await this.prisma.post.findMany();
      return articles;
    } catch (error) {
      return { message: 'there is problem wtih returning all articles' };
    }
  }

  async getUserArticles(userId: number) {
    const articles = await this.prisma.post.findMany({
      where: {
        author_id: userId,
      },
    });
    return articles;
  }

  private async getArticleAuthorId(articleId: number) {
    const article = await this.prisma.post.findUnique({
      where: {
        id: Number(articleId),
      },
      select: {
        author_id: true,
      },
    });

    if (!article) {
      return null;
    }

    return article.author_id;
  }

  async updateArticleById(
    articleId: string,
    title: string,
    text: string,
    userId: number,
  ) {
    const articleIdNumber = Number(articleId);
    if (isNaN(articleIdNumber)) {
      throw new Error(`Invalid articleId: ${articleId}`);
    }
    const authorId = await this.getArticleAuthorId(articleIdNumber);
    if (userId == authorId) {
      try {
        const updatedArticles = await this.prisma.post.update({
          where: {
            id: articleIdNumber,
          },
          data: {
            title: title,
            text: text,
          },
        });
        return updatedArticles;
      } catch (error) {
        return { message: 'something went wrong' };
      }
    } else {
      return { meesage: "this isn't your post" };
    }
  }
  async deleteArticleById(articleId, userId) {
    const author = await this.getArticleAuthorId(articleId);
    if (author == userId) {
      const articleIdNumber = Number(articleId);
      await this.prisma.post.delete({
        where: {
          id: articleIdNumber,
        },
      });
      return { message: 'article delete successfully' };
    } else {
      return { message: "you don't have permission to delete this article" };
    }
  }
}
