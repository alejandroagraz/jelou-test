import { AbstractEntity } from '../../common/entities/abstract.entity';
import {
  Entity,
  Column,
  BeforeInsert,
  OneToMany,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { IsEmail, IsInt, IsNotEmpty, IsString } from 'class-validator';
import { Gender } from '../../common/constants/gender.constant';
import { PostCommentEntity } from '../../posts-comments/entity/post-comment.entity';
import { PostEntity } from '../../posts/entity/post.entity';

@Entity({ name: 'users' })
export class UserEntity extends AbstractEntity {
  @Column({ type: 'varchar', length: 50 })
  @IsString()
  firstname: string;

  @Column({ type: 'varchar', length: 50 })
  @IsString()
  lastname: string;

  @Column({ type: 'varchar', length: 50 })
  @IsString()
  username: string;

  @Column({ type: 'int', width: 12 })
  @IsInt()
  dni: number;

  @Column({ type: 'enum', enum: Gender, nullable: true, default: Gender.OTHER })
  @IsString()
  gender: Gender;

  @Column({ type: 'varchar', unique: true, length: 100 })
  @IsEmail({}, { message: 'Incorrect email' })
  @IsNotEmpty({ message: 'The email is required' })
  email: string;

  @Column({ type: 'varchar', select: false, nullable: true, length: 60 })
  @IsString()
  password: string;

  @BeforeInsert()
  emailToLowerCase() {
    this.email = this.email.toLowerCase();
  }

  @OneToMany(() => PostEntity, (post: PostEntity) => post.authorPost)
  post: PostEntity[];

  @OneToMany(
    () => PostCommentEntity,
    (postComment: PostCommentEntity) => postComment.authorComment,
  )
  comment: PostCommentEntity[];

  @ManyToMany(() => PostEntity, (post) => post.tagUserId, { cascade: true })
  @JoinTable({ name: 'post_tag_user' })
  postTagId: PostEntity[];
}
