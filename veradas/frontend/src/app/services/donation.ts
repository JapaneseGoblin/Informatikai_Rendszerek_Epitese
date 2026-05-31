import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Donation {
  id: number;
  location_id: number;
  donor_id: number;
  date: string;
  is_suitable: number;
  unsuitable_reason?: string;
  doctor_name: string;
  is_directed: number;
  patient_name?: string;
  patient_taj?: string;
  location_name?: string;
  donor_name?: string;
}

export interface DonationFilters {
  location_id?: number;
  donor_id?: number;
  date_from?: string;
  date_to?: string;
}

export interface LeaderboardEntry {
  id: number;
  name: string;
  count: number;
}

@Injectable({ providedIn: 'root' })
export class DonationService {
  private url = '/api/donations';

  constructor(private http: HttpClient) {}

  getAll(filters?: DonationFilters): Observable<Donation[]> {
    let params = new HttpParams();
    if (filters?.location_id) params = params.set('location_id', filters.location_id);
    if (filters?.donor_id) params = params.set('donor_id', filters.donor_id);
    if (filters?.date_from) params = params.set('date_from', filters.date_from);
    if (filters?.date_to) params = params.set('date_to', filters.date_to);
    return this.http.get<Donation[]>(this.url, { params });
  }

  create(donation: Omit<Donation, 'id' | 'location_name' | 'donor_name'>): Observable<Donation> {
    return this.http.post<Donation>(this.url, donation);
  }

  delete(id: number): Observable<any> {
    return this.http.delete(`${this.url}/${id}`);
  }

  getLeaderboard(): Observable<LeaderboardEntry[]> {
    return this.http.get<LeaderboardEntry[]>(`${this.url}/leaderboard`);
  }
}