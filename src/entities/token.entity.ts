import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { BaseEntity } from './base.entity';
import { UserEntity } from './user.entity';

export enum TOKEN_TYPE {
  REFRESH = 'refresh',
  CONFIRM_EMAIL = 'confirm_email',
}

@Entity('tokens')
export class TokenEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column('varchar', { unique: true })
  token: string;

  @Column('varchar')
  type: TOKEN_TYPE;

  @ManyToOne(() => UserEntity, (user) => user.tokens)
  owner: UserEntity;
}
