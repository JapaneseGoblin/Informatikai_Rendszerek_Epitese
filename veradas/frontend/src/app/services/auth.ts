import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

export interface LoginDTO {
  email: string;
  password: string;
}

export interface AccessTokenDTO {
  accessToken: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private TOKEN_KEY = 'accessToken';
  private url = '/api/auth';

  constructor(private http: HttpClient, private router: Router) {}

  register(email: string, password: string): Observable<any> {
    return this.http.post(`${this.url}/register`, { email, password });
  }

  login(data: LoginDTO): Observable<AccessTokenDTO> {
    return this.http.post<AccessTokenDTO>(`${this.url}/login`, data);
  }

  setToken(token: string) {
    localStorage.setItem(this.TOKEN_KEY, token);
  }

  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  removeToken() {
    localStorage.removeItem(this.TOKEN_KEY);
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  preventGuestAccess(): boolean {
    const isLoggedIn = this.isLoggedIn();
    if (!isLoggedIn) {
      this.router.navigateByUrl('/login');
    }
    return isLoggedIn;
  }

  logout() {
    this.removeToken();
    this.router.navigateByUrl('/');
  }
}