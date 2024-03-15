import { ApiProperty } from '@nestjs/swagger';
import { IsUUID } from 'class-validator';
import { UserDto } from '../../users/dto/user.dto';
import { PostDto } from '../../posts/dto/post.dto';

export class PostCommentDto {
  @ApiProperty()
  @IsUUID('4')
  id: string;

  @ApiProperty()
  title: string;

  @ApiProperty()
  content: string;

  @ApiProperty()
  post: PostDto;

  @ApiProperty()
  authorComment: UserDto;

  @ApiProperty()
  created_at: Date;

  @ApiProperty()
  updated_at: Date;
}
