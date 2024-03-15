import { ApiProperty } from '@nestjs/swagger';
import { IsUUID } from 'class-validator';

export class CategoryDto {
  @ApiProperty()
  @IsUUID('4')
  id: string;

  @ApiProperty()
  title: string;

  @ApiProperty()
  context: string;

  @ApiProperty()
  created_at: Date;

  @ApiProperty()
  updated_at: Date;
}
