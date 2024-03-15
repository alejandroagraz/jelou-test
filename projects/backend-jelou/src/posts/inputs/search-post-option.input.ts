import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsOptional, IsString, IsUUID } from 'class-validator';

export class SearchPostOptionInput {
  @ApiPropertyOptional({
    description: 'Get Posts from a specific tagUser ID',
  })
  @Type(() => String)
  @IsUUID('4')
  @IsOptional()
  readonly tagUserId?: string;

  @ApiPropertyOptional({
    description: 'Get Posts from a specific category ID',
  })
  @Type(() => String)
  @IsUUID('4')
  @IsOptional()
  readonly categoryId?: string;

  @ApiPropertyOptional({
    description: 'Get Posts by searching for a tag user firstname',
  })
  @Type(() => String)
  @IsString()
  @IsOptional()
  readonly tagUserName?: string;

  @ApiPropertyOptional({
    description: 'Get Posts by searching for a category title',
  })
  @Type(() => String)
  @IsString()
  @IsOptional()
  readonly categoryTitle?: string;
}
