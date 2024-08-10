import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../model/User';
import { AuthService } from '../service/authservice.service';
import { BorrowService } from '../service/borrow.service';

@Component({
  selector: 'app-emprunts',
  templateUrl: './emprunts.component.html',
  styleUrls: ['./emprunts.component.css']
})
export class EmpruntsComponent implements OnInit {
  book: any;
  showModal = false;
  borrowDate = new Date();
  returnDate = new Date(this.borrowDate.getTime() + 14 * 24 * 60 * 60 * 1000); // 14 jours plus tard
  isBorrowed: boolean = false;
  selectedBook: any;
  userBorrows: any[] = [];
  userId!: number;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private borrowService: BorrowService,
    private snackBar: MatSnackBar,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.authService.getCurrentUser().subscribe((user: User | null) => {
      if (user) {
        this.userId = user.id;
        this.loadUserBorrows();
      } else {
        console.error('No user is currently logged in');
      }
    });

    this.route.queryParams.subscribe(params => {
      if (params['book']) {
        this.book = JSON.parse(params['book']);
        console.log('Selected book:', this.book);
      }
    });
  }

  loadUserBorrows(): void {
    this.borrowService.getUserBorrows(this.userId).subscribe(
      borrows => {
        this.userBorrows = borrows;
        console.log('User borrows:', this.userBorrows);
      },
      error => {
        console.error('Error loading user borrows', error);
      }
    );
  }

  showConfirmModal(): void {
    if (this.book) {
      this.selectedBook = this.book;
      const today = new Date();
      this.returnDate = new Date(today.setDate(today.getDate() + 14)); // Deux semaines plus tard
      this.showModal = true;
    }
  }

  closeModal(): void {
    this.showModal = false;
  }

  confirmBorrow(): void {
    if (this.book && this.userId) {
      this.borrowService.borrowBook(this.userId, this.book.id).subscribe(
        response => {
          this.isBorrowed = true;
          this.showModal = false;
          this.snackBar.open('Livre emprunté avec succès', 'Fermer', { duration: 3000 });
          this.loadUserBorrows(); // Recharger les emprunts de l'utilisateur
        },
        error => {
          console.error('Error borrowing book', error);
          this.snackBar.open('Erreur lors de l\'emprunt du livre', 'Fermer', { duration: 3000 });
        }
      );
    } else {
      console.error('Book or user ID is missing');
    }
  }

  resetPage(): void {
    this.book = null;
    this.isBorrowed = false;
    this.showModal = false;
  }

  isOverdue(returnDate: string): boolean {
    const today = new Date();
    const returnDateObj = new Date(returnDate);
    return returnDateObj < today;
  }
}
