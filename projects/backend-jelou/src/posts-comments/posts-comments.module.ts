import { Module } from '@nestjs/common';
import { PostsCommentsService } from './posts-comments.service';
import { PostsCommentsController } from './posts-comments.controller';
import { UsersService } from '../users/users.service';
import { PostsService } from '../posts/posts.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostCommentEntity } from './entity/post-comment.entity';
import { UserEntity } from '../users/entity/user.entity';
import { PostEntity } from '../posts/entity/post.entity';
import { CategoriesService } from '../categories/categories.service';
import { CategoryEntity } from '../categories/entity/category.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      PostCommentEntity,
      UserEntity,
      PostEntity,
      CategoryEntity,
    ]),
  ],
  providers: [
    PostsCommentsService,
    UsersService,
    PostsService,
    CategoriesService,
  ],
  controllers: [PostsCommentsController],
})
export class PostsCommentsModule {}
