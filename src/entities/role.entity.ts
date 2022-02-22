import { Column, Entity, PrimaryColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

export enum ROLE {
  USER = 'user',
  ADMIN = 'admin',
}

@Entity('roles')
export class RoleEntity {
  @ApiProperty()
  @PrimaryColumn()
  id: number;

  @ApiProperty({ enum: ROLE })
  @Column({ type: 'varchar', length: 300, unique: true })
  role: ROLE;
}
