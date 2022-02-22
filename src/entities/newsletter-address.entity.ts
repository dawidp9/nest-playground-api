import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { BaseEntity } from './base.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity('newsletter_addresses')
export class NewsletterAddressEntity extends BaseEntity {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id?: number;

  @ApiProperty()
  @Column('varchar', { length: 300 })
  email: string;

  @ApiProperty()
  @Column('varchar', { length: 300 })
  username: string;
}
