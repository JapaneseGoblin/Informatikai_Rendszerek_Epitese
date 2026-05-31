import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Donation } from './Donation';

@Entity()
export class Location {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column()
  address!: string;

  @Column({ default: true })
  is_active!: boolean;

  @OneToMany(() => Donation, donation => donation.location)
  donations!: Donation[];
}