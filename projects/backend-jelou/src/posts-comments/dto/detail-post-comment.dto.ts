import { ApiProperty } from '@nestjs/swagger';
import { IsUUID } from 'class-validator';
import { PostDto } from '../../posts/dto/post.dto';
import { UserDto } from '../../users/dto/user.dto';

export class DetailPostCommentDto {
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
