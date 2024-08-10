import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent {
  email: string = '';

  constructor(private router: Router) { }

  onSubmit() {
    if (!this.email) {
      alert('Veuillez entrer un email.');
      return;
    }

    // Implémentez ici la logique pour envoyer un email de réinitialisation du mot de passe
    // Par exemple, appel d'une API pour envoyer un lien de réinitialisation

    console.log('Email:', this.email);

    // Redirige l'utilisateur vers une page de confirmation après l'envoi du lien
    this.router.navigate(['/login']);
  }
}
