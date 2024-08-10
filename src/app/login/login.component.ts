import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from '../service/authservice.service';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email: string = '';
  password: string = '';

  constructor(
    private userService: UserService,
    private authService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  onSubmit() {
    this.userService.loginUser({ email: this.email, password: this.password }).subscribe(
      response => {
        console.log('Login response:', response);
        if (response.message === 'Login successful') {
          this.authService.login({ email: this.email, password: this.password });
          this.snackBar.open('Connexion réussie', 'Fermer', {
            duration: 3000,
            panelClass: ['snackbar-success']
          });
          this.router.navigate(['/']);
        } else {
          console.error('Login failed: Unexpected response message');
          this.snackBar.open('Email ou mot de passe incorrect', 'Fermer', {
            duration: 3000,
            panelClass: ['snackbar-error']
          });
        }
      },
      error => {
        console.error('Login failed', error);
        this.snackBar.open('Email ou mot de passe incorrect', 'Fermer', {
          duration: 3000,
          panelClass: ['snackbar-error']
        });
      }
    );
  }

}
