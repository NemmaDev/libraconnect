import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StatisticsService {

  private apiUrl = 'https://api.example.com/statistics'; // Remplacez par votre URL d'API

  constructor(private http: HttpClient) {}

  getStatistics(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }
}
