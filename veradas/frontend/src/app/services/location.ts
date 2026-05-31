import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface LocationItem {
  id: number;
  name: string;
  address: string;
  is_active: number;
}

@Injectable({ providedIn: 'root' })
export class LocationService {
  private url = '/api/locations';

  constructor(private http: HttpClient) {}

  getAll(): Observable<LocationItem[]> {
    return this.http.get<LocationItem[]>(this.url);
  }

  create(name: string, address: string): Observable<LocationItem> {
    return this.http.post<LocationItem>(this.url, { name, address });
  }

  toggle(id: number): Observable<LocationItem> {
    return this.http.patch<LocationItem>(`${this.url}/${id}/toggle`, {});
  }

  delete(id: number): Observable<any> {
    return this.http.delete(`${this.url}/${id}`);
  }
}
