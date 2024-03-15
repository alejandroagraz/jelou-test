import { ApiProperty } from '@nestjs/swagger';
import { Gender } from '../../common/constants/gender.constant';
import { IsUUID } from 'class-validator';

export class UserDto {
  @ApiProperty()
  @IsUUID('4')
  id: string;

  @ApiProperty()
  firstname: string;

  @ApiProperty()
  lastname: string;

  @ApiProperty()
  username: string;

  @ApiProperty()
  dni: number;

  @ApiProperty()
  email: string;

  @ApiProperty({
    description: 'Gender',
    enum: Gender,
    type: Gender,
    example: Gender.MAN,
  })
  gender: Gender;

  @ApiProperty()
  created_at: Date;

  @ApiProperty()
  updated_at: Date;
}
