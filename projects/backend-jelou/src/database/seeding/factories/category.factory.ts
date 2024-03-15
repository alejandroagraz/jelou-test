import { setSeederFactory } from 'typeorm-extension';
import { CategoryEntity } from '../../../categories/entity/category.entity';

export default setSeederFactory(CategoryEntity, async (faker) => {
  const category = new CategoryEntity();

  category.title = faker.commerce.department();
  category.context = faker.lorem.paragraph(3);
  return category;
});
