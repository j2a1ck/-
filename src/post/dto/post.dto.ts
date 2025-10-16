import { IsString } from 'class-validator';
export class createArticleDto {
  @IsString()
  readonly title: string;

  @IsString()
  readonly text: string;
}

export class updateArticleByIdDto {
  @IsString()
  readonly title: string;

  @IsString()
  readonly text: string;
}
