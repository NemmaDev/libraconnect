import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoanService {

  private apiUrl = 'http://localhost:8080/loans'; // Remplacez par votre URL d'API

  constructor(private http: HttpClient) {}

  getLoans(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  getLoanById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  updateLoan(id: number, loan: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, loan);
  }

  deleteLoan(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }
}
