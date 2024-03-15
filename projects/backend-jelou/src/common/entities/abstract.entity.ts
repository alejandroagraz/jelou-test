import {
  CreateDateColumn,
  DeleteDateColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { IsDate, IsString } from 'class-validator';

export abstract class AbstractEntity {
  @PrimaryGeneratedColumn('uuid')
  @IsString()
  id: string;

  @CreateDateColumn({ type: 'timestamptz', nullable: true })
  @IsDate()
  public created_at: Date;

  @CreateDateColumn({ type: 'timestamptz', nullable: true })
  @IsDate()
  public updated_at: Date;

  @DeleteDateColumn({ type: 'timestamptz', select: false, nullable: true })
  @IsDate()
  deletedAt?: Date;
}
