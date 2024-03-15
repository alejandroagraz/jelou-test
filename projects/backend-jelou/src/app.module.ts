import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import DatabaseModule from './database/database.module';
import { AuthsModule } from './auths/auths.module';
import { UsersModule } from './users/users.module';
import { PostsModule } from './posts/posts.module';
import { CategoriesModule } from './categories/categories.module';
import { PostsCommentsModule } from './posts-comments/posts-comments.module';

@Module({
  imports: [
    AuthsModule,
    UsersModule,
    DatabaseModule,
    PostsModule,
    CategoriesModule,
    PostsCommentsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
