import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Donation } from './Donation';

@Entity()
export class Donor {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column()
  gender!: string;

  @Column()
  nationality!: string;

  @Column()
  birth_place!: string;

  @Column()
  birth_date!: string;

  @Column()
  address!: string;

  @Column({ unique: true })
  taj_number!: string;

  @OneToMany(() => Donation, donation => donation.donor)
  donations!: Donation[];
}