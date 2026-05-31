import 'reflect-metadata';
import express from 'express';
import cors from 'cors';
import { AppDataSource } from './database';
import locationsRouter from './routes/locations';
import donorsRouter from './routes/donors';
import donationsRouter from './routes/donations';
import authRouter from './routes/auth';
import { checkUser, handleAuthorizationError } from './protect-routes';

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRouter);

app.use('/api/locations', locationsRouter);
app.use('/api/donors', donorsRouter);
app.use('/api/donations', donationsRouter);

app.use(handleAuthorizationError);

AppDataSource.initialize()
  .then(() => {
    console.log('Adatbázis kapcsolat létrejött');
    app.listen(PORT, () => {
      console.log(`Backend fut: http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error('Adatbázis kapcsolat sikertelen:', err);
  });