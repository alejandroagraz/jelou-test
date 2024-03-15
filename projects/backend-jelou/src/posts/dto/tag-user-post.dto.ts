import { ApiProperty } from '@nestjs/swagger';
import { IsUUID } from 'class-validator';
import { UserDto } from '../../users/dto/user.dto';
import { CategoryDto } from '../../categories/dto/category.dto';

export class TagUserPostDto {
  @ApiProperty()
  @IsUUID('4')
  id: string;

  @ApiProperty()
  title: string;

  @ApiProperty()
  content: string;

  @ApiProperty()
  tagUser?: UserDto;

  @ApiProperty()
  created_at: Date;

  @ApiProperty()
  updated_at: Date;
}
