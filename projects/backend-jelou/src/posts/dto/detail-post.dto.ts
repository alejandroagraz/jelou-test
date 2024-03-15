import { ApiProperty } from '@nestjs/swagger';
import { IsUUID } from 'class-validator';
import { CategoryDto } from '../../categories/dto/category.dto';
import { PostCommentDto } from '../../posts-comments/dto/post-comment.dto';
import { UserDto } from '../../users/dto/user.dto';

export class DetailPostDto {
  @ApiProperty()
  @IsUUID('4')
  id: string;

  @ApiProperty()
  title: string;

  @ApiProperty()
  content: string;

  @ApiProperty()
  category: CategoryDto;

  @ApiProperty()
  postComment: PostCommentDto[];

  @ApiProperty()
  authorPost: UserDto;

  @ApiProperty()
  created_at: Date;

  @ApiProperty()
  updated_at: Date;
}
