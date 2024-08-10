// src/app/service/authservice.service.ts
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { UserService } from './user.service';
import { User } from '../model/User';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loggedIn = new BehaviorSubject<boolean>(false);
  private currentUserSubject = new BehaviorSubject<User | null>(null);

  constructor(private userService: UserService, private router: Router) {
    this.checkLoginStatus();
  }

  login(user: any): void {
    this.userService.loginUser(user).subscribe(
      response => {
        console.log('Login response:', response);
        if (response.message === 'Login successful') {
          this.userService.getCurrentUser().subscribe(user => {
            this.currentUserSubject.next(user);
            this.loggedIn.next(true);
            this.router.navigate(['/']);
          });
        } else {
          console.error('Login failed: Unexpected response message');
        }
      },
      error => {
        console.error('Login failed', error);
      }
    );
  }

  checkLoginStatus(): void {
    this.userService.getCurrentUser().subscribe(
      user => {
        if (user) {
          this.currentUserSubject.next(user);
          this.loggedIn.next(true);
          console.log('User is logged in');
        } else {
          this.currentUserSubject.next(null);
          this.loggedIn.next(false);
          console.log('User is not logged in');
        }
      },
      error => {
        console.error('Error checking login status', error);
        this.currentUserSubject.next(null);
        this.loggedIn.next(false);
      }
    );
  }

  getCurrentUser(): Observable<User | null> {
    return this.currentUserSubject.asObservable();
  }

  logout(): void {
    this.loggedIn.next(false);
    this.currentUserSubject.next(null);
    this.router.navigate(['/login']);
  }

  isLoggedIn(): Observable<boolean> {
    return this.loggedIn.asObservable();
  }
}
