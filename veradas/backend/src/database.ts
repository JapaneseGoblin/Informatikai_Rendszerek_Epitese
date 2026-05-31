import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { Location } from './entity/Location';
import { Donor } from './entity/Donor';
import { Donation } from './entity/Donation';
import { User } from './entity/User';

export const AppDataSource = new DataSource({
  type: 'better-sqlite3',
  database: 'veradas.db',
  synchronize: true,
  logging: false,
  entities: [Location, Donor, Donation, User]
});