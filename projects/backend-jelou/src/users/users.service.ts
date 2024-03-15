import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Brackets, Repository } from 'typeorm';
import { UserEntity } from './entity/user.entity';
import { UserDto } from './dto/user.dto';
import { PageDto } from '../common/dto/page.dto';
import { PageOptionsDto } from '../common/dto/page-options.dto';
import { PageMetaDto } from '../common/dto/page-meta.dto';
import { CreateUserInput } from './inputs/create-user.input';
import { UpdateUserInput } from './inputs/update-user.input';
import { hash } from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async getAll(pageOptionsDto: PageOptionsDto): Promise<PageDto<UserEntity>> {
    const queryBuilder = this.userRepository.createQueryBuilder('users');

    queryBuilder
      .orderBy('users.created_at', pageOptionsDto.order)
      .skip(pageOptionsDto.skip)
      .take(pageOptionsDto.take);

    const itemCount = await queryBuilder.getCount();
    const { entities } = await queryBuilder.getRawAndEntities();
    const pageMetaDto = new PageMetaDto({ itemCount, pageOptionsDto });

    return new PageDto(entities, pageMetaDto);
  }

  async getDetail(id: string): Promise<UserEntity> {
    try {
      const user = await this.userRepository
        .createQueryBuilder('user')
        .leftJoinAndSelect('user.post', 'post')
        .leftJoinAndSelect('user.comment', 'comment')
        .where('user.id = :id', { id: id })
        .getOne();

      if (!user) {
        throw new HttpException('User not found', HttpStatus.NOT_FOUND);
      }

      return user;
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
    }
  }

  async create(data: CreateUserInput): Promise<UserDto> {
    const createUser = new UserEntity();

    createUser.firstname = data.firstname;
    createUser.lastname = data.lastname;
    createUser.username = data.username;
    createUser.dni = data.dni;
    createUser.email = data.email;
    createUser.password = await hash(data.password, 10);
    createUser.gender = data.gender;

    try {
      return await this.userRepository.save(createUser);
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.NOT_IMPLEMENTED);
    }
  }

  async update(id: string, data: UpdateUserInput): Promise<UserDto> {
    const date: Date = new Date();
    const updateUser = await this.findOneByID(id);

    if (!updateUser) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    updateUser.firstname = data.firstname || updateUser.firstname;
    updateUser.lastname = data.lastname || updateUser.lastname;
    updateUser.username = data.username || updateUser.username;
    updateUser.dni = data.dni || updateUser.dni;
    updateUser.email = data.email || updateUser.email;
    updateUser.gender = data.gender || updateUser.gender;
    updateUser.updated_at = date;

    try {
      return await this.userRepository.save(updateUser);
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.NOT_IMPLEMENTED);
    }
  }

  async deleteOneByID(id: string): Promise<any> {
    try {
      return await this.userRepository
        .createQueryBuilder('users')
        .softDelete()
        .from(UserEntity)
        .where('users.id = :id', { id: id })
        .execute();
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
    }
  }

  async findOneByID(id: string): Promise<UserEntity> {
    return await this.userRepository
      .createQueryBuilder('user')
      .where('user.id = :id', { id: id })
      .getOne();
  }

  async findOneUser(username: string): Promise<UserEntity> {
    return await this.userRepository
      .createQueryBuilder('user')
      .addSelect('user.password')
      .where(
        new Brackets((qb) => {
          qb.where('user.email = :email', {
            email: username,
          });
          qb.orWhere('user.username = :username', {
            username: username,
          });
        }),
      )
      .getOne();
  }

  async findManyUserForTagPostId(id: string): Promise<UserEntity> {
    return await this.userRepository
      .createQueryBuilder('user')
      .where('user.id = :id', { id: id })
      .getOne();
  }
}
