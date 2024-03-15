import { setSeederFactory } from 'typeorm-extension';
import { PostCommentEntity } from '../../../posts-comments/entity/post-comment.entity';

export default setSeederFactory(PostCommentEntity, async (faker) => {
  const postComment = new PostCommentEntity();

  postComment.title = faker.lorem.lines(1);
  postComment.content = faker.lorem.paragraph(3);
  return postComment;
});
