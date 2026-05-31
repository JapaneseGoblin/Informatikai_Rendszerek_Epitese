import { Routes } from '@angular/router';
import { Locations } from './components/locations/locations';
import { Donors } from './components/donors/donors';
import { Donations } from './components/donations/donations';
import { DonationForm } from './components/donation-form/donation-form';
import { Leaderboard } from './components/leaderboard/leaderboard';
import { Home } from './components/home/home';
import { Login } from './components/login/login';
import { Register } from './components/register/register';
import { inject } from '@angular/core';
import { AuthService } from './services/auth';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'login', component: Login },
  { path: 'register', component: Register },
  { path: 'admin/locations', component: Locations },
  { path: 'admin/donors', component: Donors },
  { path: 'admin/donations', component: Donations },
  { path: 'admin/donations/new', component: DonationForm, canActivate: [() => inject(AuthService).preventGuestAccess()] },
  { path: 'admin/leaderboard', component: Leaderboard },
  { path: 'admin', redirectTo: '/admin/leaderboard', pathMatch: 'full' }
];