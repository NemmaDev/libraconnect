import { Component, OnInit } from '@angular/core';
import { BookService, Category } from '../service/book.service';

@Component({
  selector: 'app-book-categories',
  templateUrl: './book-categories.component.html',
  styleUrls: ['./book-categories.component.css']
})
export class BookCategoriesComponent implements OnInit {
  categories: Category[] = [];

  constructor(private bookService: BookService) { }

  ngOnInit(): void {
    this.bookService.getCategories().subscribe(data => {
      this.categories = data;
    }, error => {
      console.error('Error fetching categories', error);
    });
  }
}
