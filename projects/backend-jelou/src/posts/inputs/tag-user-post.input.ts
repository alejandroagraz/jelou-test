import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsUUID } from 'class-validator';

export class TagUserPostInput {
  @ApiProperty()
  @IsNotEmpty({ message: 'The post is required' })
  @IsUUID('4')
  postId: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'The user is required' })
  @IsUUID('4')
  userId: string;
}
