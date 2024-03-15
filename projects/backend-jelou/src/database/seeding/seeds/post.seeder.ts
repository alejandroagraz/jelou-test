import { DataSource } from 'typeorm';
import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { PostEntity } from '../../../posts/entity/post.entity';
import { UserEntity } from '../../../users/entity/user.entity';
import { CategoryEntity } from '../../../categories/entity/category.entity';

export default class PostSeeder implements Seeder {
  public async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager,
  ): Promise<any> {
    const categories = await dataSource.getRepository(CategoryEntity).find();
    const users = await dataSource.getRepository(UserEntity).find();

    if (categories.length > 0 && users.length > 0) {
      for (let i = 0; i < categories.length; i++) {
        const randomCategory = Math.random() * categories.length;
        const category = categories[parseInt(String(randomCategory))];
        const randomUser = Math.random() * users.length;
        const authorPost = users[parseInt(String(randomUser))];

        const isCategory = await dataSource
          .getRepository(CategoryEntity)
          .createQueryBuilder('category')
          .where('category.id = :id', {
            id: category.id,
          })
          .getOne();

        if (isCategory) {
          const isUser = await dataSource
            .getRepository(UserEntity)
            .createQueryBuilder('user')
            .where('user.id = :id', {
              id: authorPost.id,
            })
            .getOne();

          if (isUser) {
            const factory = factoryManager.get(PostEntity);
            await factory.save({
              category,
              authorPost,
            });
          }
        }
      }
    }
  }
}
