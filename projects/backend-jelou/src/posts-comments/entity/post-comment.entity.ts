import { AbstractEntity } from '../../common/entities/abstract.entity';
import { Entity, Column, JoinColumn, ManyToOne } from 'typeorm';
import { IsString } from 'class-validator';
import { UserEntity } from '../../users/entity/user.entity';
import { PostEntity } from '../../posts/entity/post.entity';

@Entity({ name: 'posts_comments' })
export class PostCommentEntity extends AbstractEntity {
  @Column({ type: 'varchar', length: 150 })
  @IsString()
  title: string;

  @Column({ type: 'varchar', length: 500 })
  @IsString()
  content: string;

  @ManyToOne(() => PostEntity, (post: PostEntity) => post.postComment)
  @JoinColumn()
  post: PostEntity;

  @ManyToOne(() => UserEntity, (user: UserEntity) => user.comment)
  @JoinColumn()
  authorComment: UserEntity;
}
