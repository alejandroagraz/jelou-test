import { Module } from '@nestjs/common';
import { PostsController } from './posts.controller';
import { PostsService } from './posts.service';
import { UsersService } from '../users/users.service';
import { CategoriesService } from '../categories/categories.service';
import { PostEntity } from './entity/post.entity';
import { UserEntity } from '../users/entity/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryEntity } from '../categories/entity/category.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PostEntity, UserEntity, CategoryEntity])],
  providers: [PostsService, UsersService, CategoriesService],
  controllers: [PostsController],
})
export class PostsModule {}
