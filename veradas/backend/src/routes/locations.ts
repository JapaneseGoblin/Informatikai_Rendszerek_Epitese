import { Router, Request, Response } from 'express';
import { AppDataSource } from '../database';
import { Location } from '../entity/Location';
import { checkUser } from '../protect-routes';

const router = Router();
const repo = AppDataSource.getRepository(Location);

router.get('/', async (req: Request, res: Response) => {
  try {
    const locations = await repo.find();
    res.json(locations);
  } catch (err) {
    res.status(500).json({ error: 'Hiba történt' });
  }
});

router.post('/', checkUser, async (req: Request, res: Response) => {
  try {
    const { name, address } = req.body;
    if (!name || !address) {
      res.status(400).json({ error: 'Név és cím megadása kötelező' });
      return;
    }
    const location = repo.create({ name, address, is_active: true });
    await repo.save(location);
    res.json(location);
  } catch (err) {
    res.status(500).json({ error: 'Hiba történt' });
  }
});

router.patch('/:id/toggle', checkUser, async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const location = await repo.findOneBy({ id: Number(id) });
    if (!location) {
      res.status(404).json({ error: 'Helyszín nem található' });
      return;
    }
    location.is_active = !location.is_active;
    await repo.save(location);
    res.json(location);
  } catch (err) {
    res.status(500).json({ error: 'Hiba történt' });
  }
});

router.delete('/:id', checkUser, async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const location = await repo.findOneBy({ id: Number(id) });
    if (!location) {
      res.status(404).json({ error: 'Helyszín nem található' });
      return;
    }
    const donationRepo = AppDataSource.getRepository('Donation');
    await donationRepo.delete({ location: { id: Number(id) } });
    await repo.remove(location);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: 'Hiba történt' });
  }
});

export default router;