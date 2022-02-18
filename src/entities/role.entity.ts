import { Column, Entity, PrimaryColumn } from 'typeorm';

export enum ROLE {
  USER = 'user',
  ADMIN = 'admin',
}

@Entity('roles')
export class RoleEntity {
  @PrimaryColumn()
  id: number;

  @Column({ type: 'varchar', length: 300, unique: true })
  role: ROLE;
}
