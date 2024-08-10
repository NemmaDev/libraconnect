import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NewsletterService {
  private apiUrl = 'http://localhost:8080/api/newsletter/subscribe'; // Remplacez par votre URL d'API

  constructor(private http: HttpClient) {}

  subscribe(data: { email: string }): Observable<any> {
    return this.http.post(this.apiUrl, data, { responseType: 'text' });
  }
}
