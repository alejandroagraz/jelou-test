import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PostCommentEntity } from './entity/post-comment.entity';
import { Repository } from 'typeorm';
import { UsersService } from '../users/users.service';
import { PageOptionsDto } from '../common/dto/page-options.dto';
import { PageDto } from '../common/dto/page.dto';
import { PageMetaDto } from '../common/dto/page-meta.dto';
import { UserEntity } from '../users/entity/user.entity';
import { PostsService } from '../posts/posts.service';
import { PostCommentDto } from './dto/post-comment.dto';
import { CreatePostCommentInput } from './inputs/create-post-comment.input';
import { UpdatePostCommentInput } from './inputs/update-post-comment.input';
import { DetailPostCommentDto } from './dto/detail-post-comment.dto';

@Injectable()
export class PostsCommentsService {
  constructor(
    @InjectRepository(PostCommentEntity)
    private readonly postCommentRepository: Repository<PostCommentEntity>,
    private readonly _userService: UsersService,
    private readonly _postService: PostsService,
  ) {}

  async getAll(
    pageOptionsDto: PageOptionsDto,
  ): Promise<PageDto<PostCommentDto>> {
    const queryBuilder =
      this.postCommentRepository.createQueryBuilder('posts_comments');

    queryBuilder
      .orderBy('posts_comments.created_at', pageOptionsDto.order)
      .skip(pageOptionsDto.skip)
      .take(pageOptionsDto.take);

    const itemCount = await queryBuilder.getCount();
    const { entities } = await queryBuilder.getRawAndEntities();
    const pageMetaDto = new PageMetaDto({ itemCount, pageOptionsDto });

    return new PageDto(entities, pageMetaDto);
  }

  async getDetail(id: string): Promise<DetailPostCommentDto> {
    try {
      const postComment = await this.postCommentRepository
        .createQueryBuilder('posts_comments')
        .leftJoinAndSelect('posts_comments.post', 'post')
        .leftJoinAndSelect('posts_comments', 'authorComment')
        .where('posts_comments.id = :id', { id: id })
        .getOne();

      if (!postComment) {
        throw new HttpException('Post comment not found', HttpStatus.NOT_FOUND);
      }

      return postComment;
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
    }
  }

  async create(
    data: CreatePostCommentInput,
    user: UserEntity,
  ): Promise<PostCommentDto> {
    const isUser = await this._userService.findOneByID(user.id);

    if (!isUser) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    const isPost = await this._postService.findOneByID(data.post);

    if (!isPost) {
      throw new HttpException('Post not found', HttpStatus.NOT_FOUND);
    }

    const createPostComment = new PostCommentEntity();

    createPostComment.title = data.title;
    createPostComment.content = data.content;
    createPostComment.post = isPost;
    createPostComment.authorComment = isUser;

    try {
      return await this.postCommentRepository.save(createPostComment);
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.NOT_IMPLEMENTED);
    }
  }

  async update(
    id: string,
    data: UpdatePostCommentInput,
    user: UserEntity,
  ): Promise<PostCommentDto> {
    const isUser = await this._userService.findOneByID(user.id);

    if (!isUser) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    const date: Date = new Date();
    const updatePostComment = await this.findOneByID(id);

    if (!updatePostComment) {
      throw new HttpException('Post comment not found', HttpStatus.NOT_FOUND);
    }

    if (data.post) {
      const isPost = await this._postService.findOneByID(data.post);

      if (!isPost) {
        throw new HttpException('Post not found', HttpStatus.NOT_FOUND);
      }
      updatePostComment.post = isPost || updatePostComment.post;
    }

    updatePostComment.title = data.title || updatePostComment.title;
    updatePostComment.content = data.content || updatePostComment.content;
    updatePostComment.authorComment = user;
    updatePostComment.updated_at = date;

    try {
      return await this.postCommentRepository.save(updatePostComment);
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.NOT_IMPLEMENTED);
    }
  }

  async deleteOneByID(id: string): Promise<any> {
    try {
      return await this.postCommentRepository
        .createQueryBuilder('posts_comments')
        .softDelete()
        .from(PostCommentEntity)
        .where('posts_comments.id = :id', { id: id })
        .execute();
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
    }
  }

  async findOneByID(id: string): Promise<PostCommentEntity> {
    return await this.postCommentRepository
      .createQueryBuilder('posts_comments')
      .where('posts_comments.id = :id', { id: id })
      .getOne();
  }
}
