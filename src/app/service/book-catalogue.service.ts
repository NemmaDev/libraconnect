import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Book } from '../model/book';

@Injectable({
  providedIn: 'root'
})
export class BookCatalogueService {
  private apiUrl = 'http://localhost:8080/api/books'; // URL de votre API

  constructor(private http: HttpClient) { }

  getBooks(): Observable<Book[]> {
    return this.http.get<Book[]>(`${this.apiUrl}/bookList`);
  }

  getTotalBooks(): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/total`);
  }

  addBook(book: Book): Observable<Book> {
    return this.http.post<Book>(`${this.apiUrl}/add`, book);
  }

  editBook(book: Book): Observable<Book> {
    return this.http.put<Book>(`${this.apiUrl}/update/${book.id}`, book);
  }

  deleteBook(bookId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/delete/${bookId}`);
  }
}
