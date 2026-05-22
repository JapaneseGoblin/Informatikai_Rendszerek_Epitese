import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GithubService {
  private baseUrl = 'https://api.github.com';

  constructor(private http: HttpClient) {}

  searchUsers(query: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/search/users?q=${query}`);
  }

  getUser(username: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/users/${username}`);
  }

  getUserRepos(username: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/users/${username}/repos`);
  }

  searchRepos(query: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/search/repositories?q=${query}`);
  }

  getRepo(owner: string, repo: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/repos/${owner}/${repo}`);
  }
}