import { DataSource } from 'typeorm';
import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { CategoryEntity } from '../../../categories/entity/category.entity';

export default class CategorySeeder implements Seeder {
  public async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager,
  ): Promise<any> {
    const userFactory = await factoryManager.get(CategoryEntity);
    await userFactory.save();
    await userFactory.saveMany(4);
  }
}
