import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Book } from '../model/book';
import { UserService } from '../service/user.service';
import { BookCatalogueService } from '../service/book-catalogue.service';
import { BorrowService } from '../service/borrow.service';

@Component({
  selector: 'app-administration',
  templateUrl: './administration.component.html',
  styleUrls: ['./administration.component.css']
})
export class AdministrationComponent implements OnInit {
email: any;
subscribeToNewsletter() {
throw new Error('Method not implemented.');
}
  users: any[] = [];
  loans: any[] = [];
  totalUsers: number = 0;
  totalLoans: number = 0;
  totalBooks: number = 0;
  books: Book[] = [];
  addBookForm: FormGroup;
  selectedBook: Book | null = null; // Pour stocker le livre sélectionné
  showModal: boolean = false;
  selectedUser: any = null; // Pour stocker l'utilisateur sélectionné
  showUserModal: boolean = false; // Pour afficher le modal d'utilisateur
  userForm: FormGroup;

  constructor(
    private userService: UserService,
    private borrowService: BorrowService,
    private snackBar: MatSnackBar,
    private bookService: BookCatalogueService,
    private fb: FormBuilder,
    private modalService: NgbModal
  ) {
    // Formulaire pour ajouter ou modifier un livre
    this.addBookForm = this.fb.group({
      title: ['', Validators.required],
      author: ['', Validators.required],
      description: ['', Validators.required],
      category: ['', Validators.required],
      image: [''] // Ajout du champ image
    });

    // Formulaire pour ajouter ou modifier un utilisateur
    this.userForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      dateOfBirth: ['', Validators.required],
      phone: ['', Validators.required],
      address: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadUsers();
    this.loadLoans();
    this.loadStatistics();
    this.loadBooks();
  }

  // Méthodes pour gérer les utilisateurs

  loadUsers() {
    this.userService.getUsers().subscribe(data => {
      this.users = data;
    }, error => {
      console.error('Error loading users', error);
      this.snackBar.open('Erreur lors du chargement des utilisateurs', 'Fermer', { duration: 3000 });
    });
  }

  editUser(user: any): void {
    this.selectedUser = user;
    this.userForm.patchValue(user); // Pré-remplir le formulaire avec les données de l'utilisateur
    this.showUserModal = true; // Ouvrir le modal pour l'édition
  }

  closeUserModal(): void {
    this.showUserModal = false;
    this.selectedUser = null;
    this.userForm.reset();
  }

  addOrUpdateUser(): void {
    if (this.selectedUser) {
      this.updateUser();
    } else {
      this.addUser();
    }
  }

  addUser(): void {
    if (this.userForm.valid) {
      const newUser = this.userForm.value;
      this.userService.registerUser(newUser).subscribe(
        () => {
          this.loadUsers();
          this.closeUserModal();
          this.snackBar.open('Utilisateur ajouté avec succès', 'Fermer', { duration: 3000 });
        },
        (error) => {
          console.error('Error adding user', error);
          this.snackBar.open('Erreur lors de l\'ajout de l\'utilisateur', 'Fermer', { duration: 3000 });
        }
      );
    }
  }

  updateUser(): void {
    if (this.userForm.valid) {
      const updatedUser = { ...this.selectedUser, ...this.userForm.value };
      this.userService.updateUser(updatedUser).subscribe(
        () => {
          this.loadUsers();
          this.closeUserModal();
          this.snackBar.open('Utilisateur mis à jour avec succès', 'Fermer', { duration: 3000 });
        },
        (error) => {
          console.error('Error updating user', error);
          this.snackBar.open('Erreur lors de la mise à jour de l\'utilisateur', 'Fermer', { duration: 3000 });
        }
      );
    }
  }

  deleteUser(userId: number): void {
    this.userService.deleteUser(userId).subscribe(
      () => {
        this.loadUsers();
        this.snackBar.open('Utilisateur supprimé avec succès', 'Fermer', { duration: 3000 });
      },
      error => {
        console.error('Error deleting user', error);
        this.snackBar.open('Erreur lors de la suppression de l\'utilisateur', 'Fermer', { duration: 3000 });
      }
    );
  }

  // Méthodes pour gérer les livres

  loadBooks(): void {
    this.bookService.getBooks().subscribe(
      (data: Book[]) => {
        this.books = data;
      },
      (error) => {
        console.error('Error fetching books', error);
      }
    );
  }

  openAddBookModal(): void {
    this.selectedBook = null; // Réinitialiser le livre sélectionné
    this.addBookForm.reset(); // Réinitialiser le formulaire
    this.showModal = true;
  }

  closeModal(): void {
    this.showModal = false;
  }

  addOrUpdateBook(): void {
    if (this.selectedBook) {
      this.updateBook();
    } else {
      this.addBook();
    }
  }

  addBook(): void {
    if (this.addBookForm.valid) {
      const newBook: Book = this.addBookForm.value;
      this.bookService.addBook(newBook).subscribe(
        () => {
          this.loadBooks();
          this.closeModal();
          this.snackBar.open('Livre ajouté avec succès', 'Fermer', { duration: 3000 });
        },
        (error) => {
          console.error('Error adding book', error);
          this.snackBar.open('Erreur lors de l\'ajout du livre', 'Fermer', { duration: 3000 });
        }
      );
    }
  }

  editBook(book: Book): void {
    this.selectedBook = book;
    this.addBookForm.patchValue(book); // Pré-remplir le formulaire avec les données du livre
    this.showModal = true; // Ouvrir le modal pour l'édition
  }

  updateBook(): void {
    if (this.addBookForm.valid) {
      const updatedBook: Book = { ...this.selectedBook, ...this.addBookForm.value };
      this.bookService.editBook(updatedBook).subscribe(
        () => {
          this.loadBooks();
          this.closeModal();
          this.snackBar.open('Livre mis à jour avec succès', 'Fermer', { duration: 3000 });
        },
        (error) => {
          console.error('Error updating book', error);
          this.snackBar.open('Erreur lors de la mise à jour du livre', 'Fermer', { duration: 3000 });
        }
      );
    }
  }

  deleteBook(bookId: number): void {
    this.bookService.deleteBook(bookId).subscribe(
      () => {
        this.loadBooks();
        this.snackBar.open('Livre supprimé avec succès', 'Fermer', { duration: 3000 });
      },
      error => {
        console.error('Error deleting book', error);
        this.snackBar.open('Erreur lors de la suppression du livre', 'Fermer', { duration: 3000 });
      }
    );
  }

  // Méthodes pour gérer les emprunts

  loadLoans() {
    this.borrowService.getAllBorrows().subscribe(data => {
      this.loans = data.map((loan: any) => ({
        borrowerName: loan.user.name,
        bookTitle: loan.book.title,
        author: loan.book.author,
        borrowDate: loan.borrowDate,
        returnDate: loan.returnDate,
        status: loan.status
      }));
    }, error => {
      console.error('Error loading loans', error);
      this.snackBar.open('Erreur lors du chargement des emprunts', 'Fermer', { duration: 3000 });
    });
  }

  markAsReturned(loanId: number) {
    console.log(`Marking loan ${loanId} as returned`);
    this.borrowService.returnBook(loanId).subscribe(
      (response) => {
        console.log('Response from API:', response);
        this.loadLoans(); // Recharger la liste des emprunts après mise à jour
        this.snackBar.open('Livre marqué comme retourné', 'Fermer', { duration: 3000 });
      },
      error => {
        console.error('Error marking book as returned:', error);
        this.snackBar.open('Erreur lors du marquage du livre comme retourné', 'Fermer', { duration: 3000 });
      }
    );
  }


  // Méthode pour notifier un utilisateur par email (non implémentée)
  notifyUser(email: string) {
    console.log(`Notification envoyée à ${email}`);
    this.snackBar.open('Notification envoyée', 'Fermer', { duration: 3000 });
  }

  // Méthodes pour charger les statistiques

  loadStatistics() {
    this.userService.getTotalUsers().subscribe(totalUsers => {
      this.totalUsers = totalUsers;
    }, error => {
      console.error('Error loading user statistics', error);
    });

    this.userService.getTotalBorrows().subscribe(totalLoans => {
      this.totalLoans = totalLoans;
    }, error => {
      console.error('Error loading total loans', error);
      this.snackBar.open('Erreur lors du chargement du total des emprunts', 'Fermer', { duration: 3000 });
    });


    this.userService.getTotalBooks().subscribe(totalBooks => {
      this.totalBooks = totalBooks;
    }, error => {
      console.error('Error loading total books', error);
      this.snackBar.open('Erreur lors du chargement du total des livres', 'Fermer', { duration: 3000 });
    });
  }
}
