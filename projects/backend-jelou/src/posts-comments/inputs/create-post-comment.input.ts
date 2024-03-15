import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsUUID, MinLength } from 'class-validator';

export class CreatePostCommentInput {
  @ApiProperty()
  @IsNotEmpty({ message: 'The title is required' })
  @MinLength(3, {
    message: 'Length error for title min 3',
  })
  @IsString()
  title: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'The content is required' })
  @MinLength(3, {
    message: 'Length error for content min 3',
  })
  @IsString()
  content: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'The post is required' })
  @IsUUID('4')
  post: string;
}
