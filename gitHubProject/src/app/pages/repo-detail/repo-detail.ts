import { Component, ChangeDetectorRef, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GithubService } from '../../services/github';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-repo-detail',
  imports: [MatIconModule],
  templateUrl: './repo-detail.html',
  styleUrl: './repo-detail.css'
})
export class RepoDetail implements OnInit {
  repo: any = null;
  loading = true;

  constructor(
    private route: ActivatedRoute,
    private githubService: GithubService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    const owner = this.route.snapshot.paramMap.get('owner')!;
    const repoName = this.route.snapshot.paramMap.get('repo')!;

    this.githubService.getRepo(owner, repoName).subscribe({
      next: (repo: any) => {
        this.repo = repo;
        this.loading = false;
        this.cdr.markForCheck();
      },
      error: () => {
        this.loading = false;
        this.cdr.markForCheck();
      }
    });
  }
}