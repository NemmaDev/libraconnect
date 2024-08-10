// src/app/navbar/navbar.component.ts
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../service/authservice.service';
import { Router } from '@angular/router';
import { User } from '../model/User';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  isLoggedIn: boolean = false;
  isAdmin: boolean = false;
  searchTerm: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    this.authService.getCurrentUser().subscribe((user: User | null) => {
      if (user) {
        this.isLoggedIn = true;
        this.isAdmin = user.email === 'sanfonemmata@gmail.com';
      } else {
        this.isLoggedIn = false;
        this.isAdmin = false;
      }
      console.log('Logged in status:', this.isLoggedIn);
      console.log('Is admin:', this.isAdmin);
    });
  }

  onSearch(): void {
    if (this.searchTerm.trim()) {
      this.router.navigate(['/catalogue'], { queryParams: { search: this.searchTerm } });
    }
  }

  logout() {
    this.authService.logout();
  }
}
