import { setSeederFactory } from 'typeorm-extension';
import { PostEntity } from '../../../posts/entity/post.entity';

export default setSeederFactory(PostEntity, async (faker) => {
  const post = new PostEntity();

  post.title = faker.lorem.lines(1);
  post.content = faker.lorem.paragraph(3);
  return post;
});
