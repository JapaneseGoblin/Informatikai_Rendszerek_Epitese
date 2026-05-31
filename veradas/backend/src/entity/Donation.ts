import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Location } from './Location';
import { Donor } from './Donor';

@Entity()
export class Donation {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => Location, location => location.donations)
  location!: Location;

  @ManyToOne(() => Donor, donor => donor.donations)
  donor!: Donor;

  @Column()
  date!: string;

  @Column()
  is_suitable!: boolean;

  @Column({ nullable: true })
  unsuitable_reason!: string;

  @Column()
  doctor_name!: string;

  @Column({ default: false })
  is_directed!: boolean;

  @Column({ nullable: true })
  patient_name!: string;

  @Column({ nullable: true })
  patient_taj!: string;
}