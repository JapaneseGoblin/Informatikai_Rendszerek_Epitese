import { Routes } from '@angular/router';
import { UserSearch } from './pages/user-search/user-search';
import { RepoSearch } from './pages/repo-search/repo-search';
import { UserDetail } from './pages/user-detail/user-detail';
import { RepoDetail } from './pages/repo-detail/repo-detail';

export const routes: Routes = [
  { path: '', component: UserSearch },
  { path: 'search-repos', component: RepoSearch },
  { path: 'user/:username', component: UserDetail },
  { path: 'repo/:owner/:repo', component: RepoDetail },
];