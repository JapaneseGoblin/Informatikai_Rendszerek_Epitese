import { Router, Request, Response } from 'express';
import { AppDataSource } from '../database';
import { Donation } from '../entity/Donation';
import { Location } from '../entity/Location';
import { Donor } from '../entity/Donor';
import { validateTaj } from './donors';
import { checkUser } from '../protect-routes';

const router = Router();
const repo = AppDataSource.getRepository(Donation);

router.get('/leaderboard', async (req: Request, res: Response) => {
  try {
    const result = await AppDataSource
      .getRepository(Donation)
      .createQueryBuilder('donation')
      .leftJoinAndSelect('donation.donor', 'donor')
      .where('donation.is_suitable = :suitable', { suitable: 1 })
      .select('donor.id', 'id')
      .addSelect('donor.name', 'name')
      .addSelect('COUNT(donation.id)', 'count')
      .groupBy('donor.id')
      .orderBy('count', 'DESC')
      .getRawMany();

    res.json(result);
  } catch (err) {
    res.status(500).json({ error: 'Hiba történt' });
  }
});

router.get('/', async (req: Request, res: Response) => {
  try {
    const { location_id, donor_id, date_from, date_to } = req.query;

    const qb = repo.createQueryBuilder('donation')
      .leftJoinAndSelect('donation.location', 'location')
      .leftJoinAndSelect('donation.donor', 'donor')
      .where('donation.is_suitable = :suitable', { suitable: 1 });

    if (location_id) qb.andWhere('location.id = :location_id', { location_id });
    if (donor_id) qb.andWhere('donor.id = :donor_id', { donor_id });
    if (date_from) qb.andWhere('donation.date >= :date_from', { date_from });
    if (date_to) qb.andWhere('donation.date <= :date_to', { date_to });

    const donations = await qb.getMany();

    const result = donations.map(d => ({
      id: d.id,
      date: d.date,
      is_suitable: d.is_suitable,
      unsuitable_reason: d.unsuitable_reason,
      doctor_name: d.doctor_name,
      is_directed: d.is_directed,
      patient_name: d.patient_name,
      patient_taj: d.patient_taj,
      location_id: d.location?.id,
      location_name: d.location?.name,
      donor_id: d.donor?.id,
      donor_name: d.donor?.name
    }));

    res.json(result);
  } catch (err) {
    res.status(500).json({ error: 'Hiba történt' });
  }
});

router.post('/', checkUser, async (req: Request, res: Response) => {
  try {
    const { location_id, donor_id, date, is_suitable, unsuitable_reason, doctor_name, is_directed, patient_name, patient_taj } = req.body;

    if (!location_id || !donor_id || !date || is_suitable === undefined || !doctor_name) {
      res.status(400).json({ error: 'Kötelező mezők hiányoznak' });
      return;
    }

    const locationRepo = AppDataSource.getRepository(Location);
    const location = await locationRepo.findOneBy({ id: Number(location_id) });
    if (!location || !location.is_active) {
      res.status(400).json({ error: 'A helyszín nem aktív vagy nem létezik' });
      return;
    }

    const donorRepo = AppDataSource.getRepository(Donor);
    const donor = await donorRepo.findOneBy({ id: Number(donor_id) });
    if (!donor) {
      res.status(400).json({ error: 'Véradó nem található' });
      return;
    }

    const isSuitable = is_suitable === true || is_suitable === 1 || is_suitable === '1';
    const isDirected = is_directed === true || is_directed === 1 || is_directed === '1';

    if (!isSuitable && isDirected) {
      res.status(400).json({ error: 'Nem alkalmas jelölt esetén nem történhet irányított véradás' });
      return;
    }

    if (!isSuitable && !unsuitable_reason) {
      res.status(400).json({ error: 'Nem alkalmas jelölt esetén az ok megadása kötelező' });
      return;
    }

    if (isDirected) {
      if (!patient_name || !patient_taj) {
        res.status(400).json({ error: 'Irányított véradás esetén a beteg neve és TAJ száma kötelező' });
        return;
      }
      if (!validateTaj(patient_taj)) {
        res.status(400).json({ error: 'A beteg TAJ száma érvénytelen' });
        return;
      }
    }

    const donation = repo.create({
      location,
      donor,
      date,
      is_suitable: isSuitable,
      unsuitable_reason: unsuitable_reason || null,
      doctor_name,
      is_directed: isDirected,
      patient_name: patient_name || null,
      patient_taj: patient_taj || null
    });

    await repo.save(donation);
    res.json({ id: donation.id });
  } catch (err) {
    res.status(500).json({ error: 'Hiba történt' });
  }
});

router.delete('/:id', checkUser, async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const donation = await repo.findOneBy({ id: Number(id) });
    if (!donation) {
      res.status(404).json({ error: 'Véradás nem található' });
      return;
    }
    await repo.remove(donation);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: 'Hiba történt' });
  }
});

export default router;