// src/app/catalogue/catalogue.component.ts
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BookCatalogueService } from '../service/book-catalogue.service';
import { Book } from '../model/book';

@Component({
  selector: 'app-catalogue',
  templateUrl: './catalogue.component.html',
  styleUrls: ['./catalogue.component.css']
})
export class CatalogueComponent implements OnInit {
  books: Book[] = [];
  filteredBooks: Book[] = [];
  categories = ['All', 'Fiction', 'Non-Fiction', 'Science-Fiction', 'Horror', 'Historique', 'Romance'];
  selectedCategory = 'All';
  showModal = false;
  selectedBook: Book | null = null;

  constructor(
    private bookService: BookCatalogueService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  openModal(book: Book) {
    this.selectedBook = book;
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
    this.selectedBook = null;
  }

  borrowBook(book: Book | null) {
    if (book) {
      this.router.navigate(['/emprunts'], { queryParams: { book: JSON.stringify(book) } });
    }
  }

  ngOnInit(): void {
    this.bookService.getBooks().subscribe(
      books => {
        this.books = books;
        this.route.queryParams.subscribe(params => {
          const category = params['category'];
          const searchTerm = params['search'];
          if (category) {
            this.selectedCategory = category;
          }
          this.filterBooks(searchTerm);
        });
      },
      error => {
        console.error('Erreur lors du chargement des livres', error);
      }
    );
  }

  filterBooks(searchTerm: string = ''): void {
    if (this.selectedCategory === 'All') {
      this.filteredBooks = this.books;
    } else {
      this.filteredBooks = this.books.filter(book => book.category === this.selectedCategory);
    }

    if (searchTerm) {
      this.filteredBooks = this.filteredBooks.filter(book =>
        book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        book.author.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
  }

  onCategoryChange(category: string): void {
    this.selectedCategory = category;
    this.filterBooks();
  }
}
