import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { DonorService, Donor, validateTaj } from '../../services/donor';
import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-donors',
  imports: [CommonModule, FormsModule],
  templateUrl: './donors.html',
  styleUrl: './donors.css'
})
export class Donors implements OnInit {
  donors: Donor[] = [];
  error = '';
  success = '';
  deleteTarget: Donor | null = null;

  form = {
    name: '',
    gender: '',
    nationality: '',
    birth_place: '',
    birth_date: '',
    address: '',
    taj_number: ''
  };

  constructor(private donorService: DonorService, public authService: AuthService) {}

  ngOnInit() {
    this.load();
  }

  load() {
    this.donorService.getAll().subscribe((data: Donor[]) => this.donors = data);
  }

  submit() {
    this.error = '';
    this.success = '';

    const { name, gender, nationality, birth_place, birth_date, address, taj_number } = this.form;

    if (!name || !gender || !nationality || !birth_place || !birth_date || !address || !taj_number) {
      this.error = 'Minden mező kitöltése kötelező';
      return;
    }

    if (!validateTaj(taj_number)) {
      this.error = 'Érvénytelen TAJ szám';
      return;
    }

    this.donorService.create(this.form).subscribe({
      next: () => {
        this.success = 'Véradó sikeresen mentve';
        this.form = { name: '', gender: '', nationality: '', birth_place: '', birth_date: '', address: '', taj_number: '' };
        this.load();
      },
      error: (err: any) => this.error = err.error?.error || 'Hiba történt'
    });
  }

  confirmDelete(donor: Donor) {
    this.deleteTarget = donor;
  }

  cancelDelete() {
    this.deleteTarget = null;
  }

  doDelete() {
    if (!this.deleteTarget) return;
    this.donorService.delete(this.deleteTarget.id).subscribe({
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
