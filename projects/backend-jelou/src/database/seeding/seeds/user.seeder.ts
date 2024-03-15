import { hash } from 'bcrypt';
import { DataSource } from 'typeorm';
import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { UserEntity } from '../../../users/entity/user.entity';
import { Gender } from '../../../common/constants/gender.constant';

export default class UserSeeder implements Seeder {
  public async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager,
  ): Promise<any> {
    const repository = dataSource.getRepository(UserEntity);

    const data = {
      firstname: 'Jose',
      lastname: 'Agraz',
      username: 'jagraz29',
      dni: 12345678,
      email: 'joseagraz29@gmail.com',
      gender: Gender.MAN,
      password: await hash('Passw*123', 10),
    };

    const user = await repository.findOneBy({ username: data.username });

    if (!user) {
      await repository.insert([data]);
    }

    const userFactory = await factoryManager.get(UserEntity);
    await userFactory.save();
    await userFactory.saveMany(5);
  }
}
