import { DataSource } from 'typeorm';
import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { PostCommentEntity } from '../../../posts-comments/entity/post-comment.entity';
import { PostEntity } from '../../../posts/entity/post.entity';
import { UserEntity } from '../../../users/entity/user.entity';

export default class PostCommentSeeder implements Seeder {
  public async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager,
  ): Promise<any> {
    const posts = await dataSource.getRepository(PostEntity).find();
    const users = await dataSource.getRepository(UserEntity).find();

    if (posts.length > 0 && users.length > 0) {
      for (let i = 0; i < posts.length; i++) {
        const randomPosts = Math.random() * posts.length;
        const post = posts[parseInt(String(randomPosts))];
        const randomUser = Math.random() * users.length;
        const authorComment = users[parseInt(String(randomUser))];

        const isPost = await dataSource
          .getRepository(PostEntity)
          .createQueryBuilder('post')
          .where('post.id = :id', {
            id: post.id,
          })
          .getOne();

        if (isPost) {
          const isAuthorComment = await dataSource
            .getRepository(UserEntity)
            .createQueryBuilder('user')
            .where('user.id = :id', {
              id: authorComment.id,
            })
            .getOne();
          if (isAuthorComment) {
            const factory = factoryManager.get(PostCommentEntity);
            await factory.save({
              post,
              authorComment,
            });
          }
        }
      }
    }
  }
}
