import { Router, Request, Response } from 'express';
import { AppDataSource } from '../database';
import { Donor } from '../entity/Donor';
import { checkUser } from '../protect-routes';

const router = Router();
const repo = AppDataSource.getRepository(Donor);

export function validateTaj(taj: string): boolean {
  if (!/^\d{9}$/.test(taj)) return false;
  const digits = taj.split('').map(Number);
  let sum = 0;
  for (let i = 0; i < 8; i++) {
    sum += digits[i] * (i % 2 === 0 ? 3 : 7);
  }
  return sum % 10 === digits[8];
}

router.get('/', async (req: Request, res: Response) => {
  try {
    const donors = await repo.find();
    res.json(donors);
  } catch (err) {
    res.status(500).json({ error: 'Hiba történt' });
  }
});

router.post('/', checkUser, async (req: Request, res: Response) => {
  try {
    const { name, gender, nationality, birth_place, birth_date, address, taj_number } = req.body;

    if (!name || !gender || !nationality || !birth_place || !birth_date || !address || !taj_number) {
      res.status(400).json({ error: 'Minden mező kitöltése kötelező' });
      return;
    }

    if (!validateTaj(taj_number)) {
      res.status(400).json({ error: 'Érvénytelen TAJ szám' });
      return;
    }

    const existing = await repo.findOneBy({ taj_number });
    if (existing) {
      res.status(400).json({ error: 'Ez a TAJ szám már szerepel a rendszerben' });
      return;
    }

    const donor = repo.create({ name, gender, nationality, birth_place, birth_date, address, taj_number });
    await repo.save(donor);
    res.json(donor);
  } catch (err) {
    res.status(500).json({ error: 'Hiba történt' });
  }
});

router.delete('/:id', checkUser, async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const donor = await repo.findOneBy({ id: Number(id) });
    if (!donor) {
      res.status(404).json({ error: 'Véradó nem található' });
      return;
    }
    const donationRepo = AppDataSource.getRepository('Donation');
    await donationRepo.delete({ donor: { id: Number(id) } });
    await repo.remove(donor);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: 'Hiba történt' });
  }
});

export default router;