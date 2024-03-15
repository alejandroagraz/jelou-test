import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PostEntity } from '../posts/entity/post.entity';
import { Repository } from 'typeorm';
import { PageOptionsDto } from '../common/dto/page-options.dto';
import { PageDto } from '../common/dto/page.dto';
import { PageMetaDto } from '../common/dto/page-meta.dto';
import { CreatePostInput } from './inputs/create-post.input';
import { UserEntity } from '../users/entity/user.entity';
import { PostDto } from './dto/post.dto';
import { UpdatePostInput } from './inputs/update-post.input';
import { UsersService } from '../users/users.service';
import { CategoriesService } from '../categories/categories.service';
import { TagUserPostInput } from './inputs/tag-user-post.input';
import { SearchPostOptionInput } from './inputs/search-post-option.input';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(PostEntity)
    private readonly postRepository: Repository<PostEntity>,
    private readonly _userService: UsersService,
    private readonly _categoryService: CategoriesService,
  ) {}

  async getAll(
    pageOptionsDto: PageOptionsDto,
    searchOptions: SearchPostOptionInput,
  ): Promise<PageDto<PostEntity>> {
    const queryBuilder = this.postRepository.createQueryBuilder('posts');

    queryBuilder
      .leftJoinAndSelect('posts.category', 'category')
      .leftJoinAndSelect('posts.tagUserId', 'tagUsers');

    if (searchOptions.tagUserId) {
      queryBuilder.where('tagUsers.id = :tagUser', {
        tagUser: searchOptions.tagUserId,
      });
    }

    if (searchOptions.categoryId) {
      queryBuilder.andWhere('posts.category = :category', {
        category: searchOptions.categoryId,
      });
    }

    if (searchOptions.categoryTitle) {
      queryBuilder.andWhere('category.title ILIKE :categoryTitle', {
        categoryTitle: `%${searchOptions.categoryTitle}%`,
      });
    }

    if (searchOptions.tagUserName) {
      queryBuilder.andWhere('tagUsers.firstname ILIKE :firstname', {
        firstname: `%${searchOptions.tagUserName}%`,
      });
    }

    queryBuilder
      .orderBy('posts.created_at', pageOptionsDto.order)
      .skip(pageOptionsDto.skip)
      .take(pageOptionsDto.take);

    const itemCount = await queryBuilder.getCount();
    const { entities } = await queryBuilder.getRawAndEntities();
    const pageMetaDto = new PageMetaDto({ itemCount, pageOptionsDto });

    return new PageDto(entities, pageMetaDto);
  }

  async getDetail(id: string): Promise<PostEntity> {
    try {
      const post = await this.postRepository
        .createQueryBuilder('posts')
        .leftJoinAndSelect('posts.category', 'category')
        .leftJoinAndSelect('posts.postComment', 'postComment')
        .leftJoinAndSelect('posts.authorPost', 'authorPost')
        .leftJoinAndSelect('posts.tagUserId', 'tagUsers')
        .where('posts.id = :id', { id: id })
        .getOne();

      if (!post) {
        throw new HttpException('Post not found', HttpStatus.NOT_FOUND);
      }

      return post;
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.NOT_IMPLEMENTED);
    }
  }

  async create(data: CreatePostInput, user: UserEntity): Promise<PostDto> {
    const isUser = await this._userService.findOneByID(user.id);

    if (!isUser) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    const isCategory = await this._categoryService.findOneByID(data.category);

    if (!isCategory) {
      throw new HttpException('Category not found', HttpStatus.NOT_FOUND);
    }

    const createPost = new PostEntity();

    createPost.title = data.title;
    createPost.content = data.content;
    createPost.category = isCategory;
    createPost.authorPost = isUser;

    try {
      return await this.postRepository.save(createPost);
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.NOT_IMPLEMENTED);
    }
  }

  async update(
    id: string,
    data: UpdatePostInput,
    user: UserEntity,
  ): Promise<PostDto> {
    const isUser = await this._userService.findOneByID(user.id);

    if (!isUser) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    const date: Date = new Date();
    const updatePost = await this.findOneByID(id);

    if (!updatePost) {
      throw new HttpException('Post not found', HttpStatus.NOT_FOUND);
    }

    if (data.category) {
      const isCategory = await this._categoryService.findOneByID(data.category);

      if (!isCategory) {
        throw new HttpException('Category not found', HttpStatus.NOT_FOUND);
      }
      updatePost.category = isCategory || updatePost.category;
    }

    updatePost.title = data.title || updatePost.title;
    updatePost.content = data.content || updatePost.content;
    updatePost.authorPost = user;
    updatePost.updated_at = date;

    try {
      return await this.postRepository.save(updatePost);
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.NOT_IMPLEMENTED);
    }
  }

  async deleteOneByID(id: string): Promise<any> {
    try {
      return await this.postRepository
        .createQueryBuilder('posts')
        .softDelete()
        .from(PostEntity)
        .where('posts.id = :id', { id: id })
        .execute();
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
    }
  }

  async findOneByID(id: string): Promise<PostEntity> {
    return await this.postRepository
      .createQueryBuilder('posts')
      .where('posts.id = :id', { id: id })
      .getOne();
  }

  async tagUserPost(data: TagUserPostInput): Promise<PostEntity> {
    const isUser = await this._userService.findOneByID(data.userId);

    if (!isUser) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    const post = await this.postRepository.findOne({
      where: {
        id: data.postId,
      },
      relations: {
        tagUserId: true,
      },
    });
    if (!post) {
      throw new HttpException('Post not found', HttpStatus.NOT_FOUND);
    }

    post.tagUserId.push(isUser);

    try {
      return await this.postRepository.save(post);
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.NOT_IMPLEMENTED);
    }
  }
}
