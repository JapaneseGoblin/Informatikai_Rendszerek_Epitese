import { Component, ChangeDetectorRef, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GithubService } from '../../services/github';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-user-detail',
  imports: [MatIconModule],
  templateUrl: './user-detail.html',
  styleUrl: './user-detail.css'
})
export class UserDetail implements OnInit {
  user: any = null;
  repos: any[] = [];
  loading = true;

  constructor(
    private route: ActivatedRoute,
    private githubService: GithubService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    const username = this.route.snapshot.paramMap.get('username')!;

    this.githubService.getUser(username).subscribe({
      next: (user: any) => {
        this.user = user;
        this.cdr.markForCheck();
      }
    });

    this.githubService.getUserRepos(username).subscribe({
      next: (repos: any) => {
        this.repos = repos;
        this.loading = false;
        this.cdr.markForCheck();
      }
    });
  }
}