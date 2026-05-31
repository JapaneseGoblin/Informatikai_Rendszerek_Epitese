import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Donor {
  id: number;
  name: string;
  gender: string;
  nationality: string;
  birth_place: string;
  birth_date: string;
  address: string;
  taj_number: string;
}

export function validateTaj(taj: string): boolean {
  if (!/^\d{9}$/.test(taj)) return false;
  const digits = taj.split('').map(Number);
  let sum = 0;
  for (let i = 0; i < 8; i++) {
    sum += digits[i] * (i % 2 === 0 ? 3 : 7);
  }
  return sum % 10 === digits[8];
}

@Injectable({ providedIn: 'root' })
export class DonorService {
  private url = '/api/donors';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Donor[]> {
    return this.http.get<Donor[]>(this.url);
  }

  create(donor: Omit<Donor, 'id'>): Observable<Donor> {
    return this.http.post<Donor>(this.url, donor);
  }

  delete(id: number): Observable<any> {
    return this.http.delete(`${this.url}/${id}`);
  }
}
