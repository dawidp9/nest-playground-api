import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { RoleEntity } from './role.entity';
import { BaseEntity } from './base.entity';
import { TokenEntity } from './token.entity';
import { ApiProperty } from '@nestjs/swagger';
import { ApiModelProperty } from '@nestjs/swagger/dist/decorators/api-model-property.decorator';

@Entity('users')
export class UserEntity extends BaseEntity {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id?: number;

  @ApiProperty()
  @Column('varchar', { length: 300, unique: true })
  email: string;

  @Column('varchar', { length: 300 })
  password: string;

  @ApiProperty()
  @Column('boolean', { default: false })
  isVerified: boolean;

  @ApiModelProperty({ type: [RoleEntity] })
  @ManyToMany(() => RoleEntity, {})
  @JoinTable()
  roles: RoleEntity[];

  @OneToMany(() => TokenEntity, (token) => token.owner)
  @JoinTable()
  tokens: TokenEntity[];
}
