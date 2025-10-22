import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class createArticleDto {
  @ApiProperty({ example: 'title for article' })
  @IsString()
  readonly title: string;

  @ApiProperty({ example: 'text for article' })
  @IsString()
  readonly text: string;
}

export class updateArticleByIdDto {
  @ApiProperty({ example: 'title for article' })
  @IsString()
  readonly title: string;

  @ApiProperty({ example: 'text for article' })
  @IsString()
  readonly text: string;
}
