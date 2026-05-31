import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DonationService, LeaderboardEntry } from '../../services/donation';

@Component({
  selector: 'app-leaderboard',
  imports: [CommonModule],
  templateUrl: './leaderboard.html',
  styleUrl: './leaderboard.css'
})
export class Leaderboard implements OnInit {
  entries: LeaderboardEntry[] = [];
  error = '';

  constructor(private donationService: DonationService) {}

  ngOnInit() {
    this.donationService.getLeaderboard().subscribe({
      next: (data) => this.entries = data,
      error: () => this.error = 'Hiba történt a ranglista betöltésekor'
    });
  }
}