import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink, Router } from '@angular/router';
import { DonationService } from '../../services/donation';
import { LocationService, LocationItem } from '../../services/location';
import { DonorService, Donor, validateTaj } from '../../services/donor';

@Component({
  selector: 'app-donation-form',
  imports: [CommonModule, FormsModule],
  templateUrl: './donation-form.html',
  styleUrl: './donation-form.css'
})
export class DonationForm implements OnInit {
  locations: LocationItem[] = [];
  donors: Donor[] = [];
  error = '';
  success = '';

  form = {
    location_id: undefined as number | undefined,
    donor_id: undefined as number | undefined,
    date: new Date().toISOString().split('T')[0],
    is_suitable: true,
    unsuitable_reason: '',
    doctor_name: '',
    is_directed: false,
    patient_name: '',
    patient_taj: ''
  };

  constructor(
    private donationService: DonationService,
    private locationService: LocationService,
    private donorService: DonorService,
    private router: Router
  ) {}

  ngOnInit() {
    this.locationService.getAll().subscribe((data: LocationItem[]) => {
      this.locations = data.filter(l => l.is_active);
    });
    this.donorService.getAll().subscribe((data: Donor[]) => this.donors = data);
  }

  onSuitableChange() {
    if (!this.form.is_suitable) {
      this.form.is_directed = false;
      this.form.patient_name = '';
      this.form.patient_taj = '';
    }
  }

  onDirectedChange() {
    if (!this.form.is_directed) {
      this.form.patient_name = '';
      this.form.patient_taj = '';
    }
  }

  submit() {
    this.error = '';
    this.success = '';

    if (!this.form.location_id || !this.form.donor_id || !this.form.date || !this.form.doctor_name) {
      this.error = 'Kötelező mezők hiányoznak';
      return;
    }

    if (!this.form.is_suitable && !this.form.unsuitable_reason) {
      this.error = 'Nem alkalmas jelölt esetén az ok megadása kötelező';
      return;
    }

    if (!this.form.is_suitable && this.form.is_directed) {
      this.error = 'Nem alkalmas jelölt esetén nem történhet irányított véradás';
      return;
    }

    if (this.form.is_directed) {
      if (!this.form.patient_name || !this.form.patient_taj) {
        this.error = 'Irányított véradás esetén a beteg neve és TAJ száma kötelező';
        return;
      }
      if (!validateTaj(this.form.patient_taj)) {
        this.error = 'A beteg TAJ száma érvénytelen';
        return;
      }
    }

    console.log('form:', this.form);
  console.log('locations:', this.locations);
  console.log('donors:', this.donors);

    this.donationService.create({
      location_id: this.form.location_id!,
      donor_id: this.form.donor_id!,
      date: this.form.date,
      is_suitable: this.form.is_suitable ? 1 : 0,
      unsuitable_reason: this.form.unsuitable_reason || undefined,
      doctor_name: this.form.doctor_name,
      is_directed: this.form.is_directed ? 1 : 0,
      patient_name: this.form.patient_name || undefined,
      patient_taj: this.form.patient_taj || undefined
    }).subscribe({
      next: () => {
        this.success = 'Véradás sikeresen rögzítve';
        setTimeout(() => this.router.navigate(['/admin/donations']), 1500);
      },
      error: (err: any) => this.error = err.error?.error || 'Hiba történt'
    });
  }
}
