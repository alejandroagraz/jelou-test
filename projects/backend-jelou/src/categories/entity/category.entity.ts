import { AbstractEntity } from '../../common/entities/abstract.entity';
import { Entity, Column, OneToMany } from 'typeorm';
import { IsString } from 'class-validator';
import { PostEntity } from '../../posts/entity/post.entity';

@Entity({ name: 'categories' })
export class CategoryEntity extends AbstractEntity {
  @Column({ type: 'varchar', length: 150 })
  @IsString()
  title: string;

  @Column({ type: 'varchar', length: 500 })
  @IsString()
  context: string;

  @OneToMany(() => PostEntity, (post: PostEntity) => post.category)
  post: PostEntity[];
}
