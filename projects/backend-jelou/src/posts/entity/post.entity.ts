import { AbstractEntity } from '../../common/entities/abstract.entity';
import {Entity, Column, JoinColumn, ManyToOne, OneToMany, ManyToMany, JoinTable} from 'typeorm';
import { IsString } from 'class-validator';
import { UserEntity } from '../../users/entity/user.entity';
import { CategoryEntity } from '../../categories/entity/category.entity';
import { PostCommentEntity } from '../../posts-comments/entity/post-comment.entity';

@Entity({ name: 'posts' })
export class PostEntity extends AbstractEntity {
  @Column({ type: 'varchar', length: 150 })
  @IsString()
  title: string;

  @Column({ type: 'varchar', length: 500 })
  @IsString()
  content: string;

  @ManyToOne(() => CategoryEntity, (category: CategoryEntity) => category.post)
  @JoinColumn()
  category: CategoryEntity;

  @OneToMany(
    () => PostCommentEntity,
    (postComment: PostCommentEntity) => postComment.post,
  )
  postComment: PostCommentEntity[];

  @ManyToOne(() => UserEntity, (user: UserEntity) => user.post)
  @JoinColumn()
  authorPost: UserEntity;

  @ManyToMany(() => UserEntity, (user) => user.postTagId)
  tagUserId: UserEntity[];
}
