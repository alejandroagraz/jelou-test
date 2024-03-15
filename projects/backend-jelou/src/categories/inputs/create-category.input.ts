import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateCategoryInput {
  @ApiProperty()
  @IsNotEmpty({ message: 'The title is required' })
  @MinLength(3, {
    message: 'Length error for title min 3',
  })
  @IsString()
  title: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'The context is required' })
  @MinLength(3, {
    message: 'Length error for context min 3',
  })
  @IsString()
  context: string;
}
