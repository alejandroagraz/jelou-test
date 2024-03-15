import { DataSource } from 'typeorm';
import { runSeeders, Seeder, SeederFactoryManager } from 'typeorm-extension';
import userFactory from './factories/user.factory';
import UserSeeder from './seeds/user.seeder';
import CategorySeeder from './seeds/category.seeder';
import categoryFactory from './factories/category.factory';
import PostSeeder from './seeds/post.seeder';
import postFactory from './factories/post.factory';
import PostCommentSeeder from './seeds/postComment.seeder';
import postCommentFactory from './factories/postComment.factory';
export default class InitSeeder implements Seeder {
  public async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager,
  ): Promise<any> {
    await runSeeders(dataSource, {
      seeds: [UserSeeder, CategorySeeder, PostSeeder, PostCommentSeeder],
      factories: [
        userFactory,
        categoryFactory,
        postFactory,
        postCommentFactory,
      ],
    });
  }
}
