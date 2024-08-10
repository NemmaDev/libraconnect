import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseUrl = 'http://localhost:8080/api';

  constructor(private http: HttpClient) {}

  registerUser(user: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/user`, user, { withCredentials: true }).pipe(
      catchError(this.handleError)
    );
  }

  loginUser(user: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/login`, user, { withCredentials: true }).pipe(
      catchError(this.handleError)
    );
  }

  getCurrentUser(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/user/me`, { withCredentials: true }).pipe(
      catchError(this.handleError)
    );
  }

  updateUser(user: any): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/user/update/${user.id}`, user, { withCredentials: true }).pipe(
      catchError(this.handleError)
    );
  }

  getUsers(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/userList`, { withCredentials: true }).pipe(
      catchError(this.handleError)
    );
  }

  deleteUser(userId: number): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/user/delete/${userId}`, { withCredentials: true }).pipe(
      catchError(this.handleError)
    );
  }
  // Nouvelle méthode pour obtenir toutes les statistiques
  getStatistics(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/admin/statistics`, { withCredentials: true }).pipe(
      catchError(this.handleError)
    );
  }
  getTotalUsers(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/Usercount`, { withCredentials: true }).pipe(
      catchError(this.handleError)
    );
  }
  getTotalBorrows(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/borrows/count`, { withCredentials: true }).pipe(
      catchError(this.handleError)
    );
  }
  getTotalBooks(): Observable<number> {
    return this.http.get<number>(`${this.baseUrl}/books/count`);
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'Une erreur est survenue !';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Erreur côté client : ${error.error.message}`;
    } else {
      errorMessage = `Erreur côté serveur : ${error.status} - ${error.message}`;
    }
    return throwError(errorMessage);
  }
}
