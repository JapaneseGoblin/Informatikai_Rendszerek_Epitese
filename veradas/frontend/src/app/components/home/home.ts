import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DonationService, LeaderboardEntry } from '../../services/donation';
import { LocationService, LocationItem } from '../../services/location';

@Component({
  selector: 'app-home',
  imports: [CommonModule],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home implements OnInit {
  leaderboard: LeaderboardEntry[] = [];
  locations: LocationItem[] = [];

  constructor(
    private donationService: DonationService,
    private locationService: LocationService
  ) {}

  ngOnInit() {
    this.donationService.getLeaderboard().subscribe((data) => this.leaderboard = data);
    this.locationService.getAll().subscribe((data) => this.locations = data.filter(l => l.is_active));
  }
}