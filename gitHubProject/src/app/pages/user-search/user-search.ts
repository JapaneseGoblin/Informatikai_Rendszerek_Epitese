import { Component, ChangeDetectorRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { GithubService } from '../../services/github';

@Component({
  selector: 'app-user-search',
  imports: [FormsModule, RouterLink],
  templateUrl: './user-search.html',
  styleUrl: './user-search.css'
})
export class UserSearch {
  query = '';
  users: any[] = [];
  loading = false;
  searched = false;

  constructor(private githubService: GithubService, private cdr: ChangeDetectorRef) {}

  search() {
    if (!this.query.trim()) return;
    this.loading = true;
    this.searched = false;

    this.githubService.searchUsers(this.query).subscribe({
      next: (res: any) => {
        this.users = res.items;
        this.loading = false;
        this.searched = true;
        this.cdr.markForCheck();
      },
      error: () => {
        this.loading = false;
        this.searched = true;
        this.cdr.markForCheck();
      }
    });
  }
}