import { hash } from 'bcrypt';
import { setSeederFactory } from 'typeorm-extension';
import { UserEntity } from '../../../users/entity/user.entity';
import { Gender } from '../../../common/constants/gender.constant';

export default setSeederFactory(UserEntity, async (faker) => {
  const user = new UserEntity();

  user.firstname = faker.name.firstName();
  user.lastname = faker.name.lastName();
  user.username = faker.internet.userName(user.firstname, user.lastname);
  user.dni = parseInt(faker.finance.account(8));
  user.gender = Gender.OTHER;
  user.email = faker.internet.email(user.firstname);
  user.password = await hash('Passw*123', 10);
  return user;
});
