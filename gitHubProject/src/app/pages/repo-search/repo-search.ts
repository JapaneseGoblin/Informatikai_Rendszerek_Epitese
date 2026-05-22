import { Component, ChangeDetectorRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { GithubService } from '../../services/github';

@Component({
  selector: 'app-repo-search',
  imports: [FormsModule, RouterLink],
  templateUrl: './repo-search.html',
  styleUrl: './repo-search.css'
})
export class RepoSearch {
  query = '';
  repos: any[] = [];
  loading = false;
  searched = false;

  constructor(private githubService: GithubService, private cdr: ChangeDetectorRef) {}

  search() {
    if (!this.query.trim()) return;
    this.loading = true;
    this.searched = false;

    this.githubService.searchRepos(this.query).subscribe({
      next: (res: any) => {
        this.repos = res.items;
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