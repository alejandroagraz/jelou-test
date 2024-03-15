import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';
import { Gender } from '../../common/constants/gender.constant';

export class CreateUserInput {
  @ApiProperty()
  @IsNotEmpty({ message: 'The firstname is required' })
  @MinLength(3, {
    message: 'Length error for firstname min 3',
  })
  @IsString()
  firstname: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'The lastname is required' })
  @MinLength(3, {
    message: 'Length error for lastname min 3',
  })
  @IsString()
  lastname: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'The username is required' })
  @MinLength(3, {
    message: 'Length error for username min 3',
  })
  @IsString()
  username: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'The dni is required' })
  @MinLength(8, {
    message: 'Length error for dni min 8',
  })
  @IsInt()
  dni: number;

  @ApiProperty({
    description: 'Gender',
    enum: Gender,
    type: Gender,
    example: Gender.MAN,
  })
  @IsEnum(Gender)
  @IsNotEmpty({ message: 'The gender is required' })
  gender: Gender;

  @ApiProperty()
  @IsNotEmpty({ message: 'The email is required' })
  @IsEmail()
  @MinLength(6, {
    message: 'Length error for email min 6',
  })
  @MaxLength(100, {
    message: 'Length email for email max 100',
  })
  email: string;

  @ApiProperty({
    description: 'Password',
    example:
      'At least 1 upper case letter, 1 lower case letter, 1 number or special character and min length 8 character.',
  })
  @IsNotEmpty({ message: 'The password is required' })
  @IsString()
  @MinLength(8, {
    message: 'Length error for password min 8',
  })
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message:
      'At least 1 upper case letter, 1 lower case letter, 1 number or special character and min length 8 character.',
  })
  password: string;
}
