import { Router, Request, Response } from 'express';
import { AppDataSource } from '../database';
import { User } from '../entity/User';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const JWT_SECRET = 'drakula_secret_key';

const router = Router();
const repo = AppDataSource.getRepository(User);

router.post('/register', async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(400).json({ error: 'Email és jelszó megadása kötelező' });
      return;
    }

    const existing = await repo.findOneBy({ email });
    if (existing) {
      res.status(400).json({ error: 'Ez az email cím már foglalt' });
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    const user = repo.create({ email, password: hashedPassword });
    await repo.save(user);

    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: 'Hiba történt' });
  }
});

router.post('/login', async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(400).json({ error: 'Email és jelszó megadása kötelező' });
      return;
    }

    const user = await repo
      .createQueryBuilder('user')
      .addSelect('user.password')
      .where('user.email = :email', { email })
      .getOne();

    if (!user) {
      res.status(401).json({ error: 'Hibás email cím vagy jelszó' });
      return;
    }

    const passwordMatches = await bcrypt.compare(password, user.password);
    if (!passwordMatches) {
      res.status(401).json({ error: 'Hibás email cím vagy jelszó' });
      return;
    }

    const token = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: '2w' });
    res.json({ accessToken: token });
  } catch (err) {
    res.status(500).json({ error: 'Hiba történt' });
  }
});

export default router;