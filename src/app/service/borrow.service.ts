import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Borrow } from '../model/borrow';

@Injectable({
  providedIn: 'root'
})
export class BorrowService {
  private apiUrl = 'http://localhost:8080/api/borrows';

  constructor(private http: HttpClient) { }

  // Récupère les emprunts d'un utilisateur spécifique
  getUserBorrows(userId: number): Observable<Borrow[]> {
    return this.http.get<Borrow[]>(`${this.apiUrl}/user/${userId}`).pipe(
      catchError(this.handleError)
    );
  }

  // Permet à un utilisateur d'emprunter un livre
  borrowBook(userId: number, bookId: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/borrow`, { userId, bookId }).pipe(
      catchError(this.handleError)
    );
  }

  // Nouvelle méthode pour obtenir tous les emprunts
  getAllBorrows(): Observable<Borrow[]> {
    return this.http.get<Borrow[]>(`${this.apiUrl}/all`).pipe(
      catchError(this.handleError)
    );
  }

  // Nouvelle méthode pour marquer un emprunt comme retourné
  returnBook(borrowId: number): Observable<any> {
    return this.http.put(`${this.apiUrl}/return/${borrowId}`, {}).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // Erreur côté client
      console.error('Une erreur est survenue:', error.error.message);
    } else {
      // Erreur côté serveur
      console.error(
        `Le backend a retourné le code ${error.status}, ` +
        `le corps était: ${error.error}`);
    }
    // Retourne une observable avec un message d'erreur utilisateur
    return throwError('Une erreur est survenue, veuillez réessayer plus tard.');
  }
}
