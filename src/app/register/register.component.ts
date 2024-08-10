// register.component.ts
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private userService: UserService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      dateOfBirth: ['', Validators.required],
      phone: ['', Validators.required],
      address: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.registerForm.valid) {
      this.userService.registerUser(this.registerForm.value).subscribe(
        response => {
          this.snackBar.open('Inscription réussie', 'Fermer', {
            duration: 3000,
          });
          this.router.navigate(['/login']);
        },
        error => {
          this.snackBar.open('Erreur lors de l\'inscription', 'Fermer', {
            duration: 3000,
          });
          console.error('Erreur d\'inscription :', error);
        }
      );
    }
  }
}
