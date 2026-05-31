import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { LocationService, LocationItem } from '../../services/location';
import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-locations',
  imports: [CommonModule, FormsModule],
  templateUrl: './locations.html',
  styleUrl: './locations.css'
})
export class Locations implements OnInit {
  locations: LocationItem[] = [];
  name = '';
  address = '';
  error = '';
  success = '';
  deleteTarget: LocationItem | null = null;

  constructor(private locationService: LocationService, public authService: AuthService) {}

  ngOnInit() {
    this.load();
  }

  load() {
    this.locationService.getAll().subscribe((data: LocationItem[]) => this.locations = data);
  }

  submit() {
    this.error = '';
    this.success = '';
    if (!this.name || !this.address) {
      this.error = 'Minden mező kitöltése kötelező';
      return;
    }
    this.locationService.create(this.name, this.address).subscribe({
      next: () => {
        this.success = 'Helyszín sikeresen mentve';
        this.name = '';
        this.address = '';
        this.load();
      },
      error: (err: any) => this.error = err.error?.error || 'Hiba történt'
    });
  }

  toggle(location: LocationItem) {
    this.locationService.toggle(location.id).subscribe(() => this.load());
  }

  confirmDelete(location: LocationItem) {
    this.deleteTarget = location;
  }

  cancelDelete() {
    this.deleteTarget = null;
  }

  doDelete() {
    if (!this.deleteTarget) return;
    this.locationService.delete(this.deleteTarget.id).subscribe({
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
