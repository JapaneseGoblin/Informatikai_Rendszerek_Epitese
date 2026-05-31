import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { DonationService, Donation, DonationFilters } from '../../services/donation';
import { LocationService, LocationItem } from '../../services/location';
import { DonorService, Donor } from '../../services/donor';
import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-donations',
  imports: [CommonModule, FormsModule],
  templateUrl: './donations.html',
  styleUrl: './donations.css'
})
export class Donations implements OnInit {
  donations: Donation[] = [];
  locations: LocationItem[] = [];
  donors: Donor[] = [];
  deleteTarget: Donation | null = null;
  error = '';

  filters: DonationFilters = {
    location_id: undefined,
    donor_id: undefined,
    date_from: '',
    date_to: ''
  };

  constructor(
    private donationService: DonationService,
    private locationService: LocationService,
    private donorService: DonorService,
    public authService: AuthService
  ) {}

  ngOnInit() {
    this.locationService.getAll().subscribe((data: LocationItem[]) => this.locations = data);
    this.donorService.getAll().subscribe((data: Donor[]) => this.donors = data);
    this.load();
  }

  load() {
    this.donationService.getAll(this.filters).subscribe((data: Donation[]) => this.donations = data);
  }

  reset() {
    this.filters = { location_id: undefined, donor_id: undefined, date_from: '', date_to: '' };
    this.load();
  }

  confirmDelete(donation: Donation) {
    this.deleteTarget = donation;
  }

  cancelDelete() {
    this.deleteTarget = null;
  }

  doDelete() {
    if (!this.deleteTarget) return;
    this.donationService.delete(this.deleteTarget.id).subscribe({
      next: () => {
        this.deleteTarget = null;
        this.load();
      },
      error: (err: any) => {
        this.error = err.error?.error || 'Hiba történt';
        this.deleteTarget = null;
      }
    });
  }
}