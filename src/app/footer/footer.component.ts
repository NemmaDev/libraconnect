import { Component } from '@angular/core';
import { NewsletterService } from '../service/newsletter.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent {
  email: string = '';
  successMessage: string | null = null;
  errorMessage: string | null = null;

  constructor(private newsletterService: NewsletterService) {}

  subscribeToNewsletter() {
    if (this.email) {
      this.newsletterService.subscribe({ email: this.email }).subscribe({
        next: (response: string) => {
          this.successMessage = response; // Afficher le message de succès
          this.errorMessage = null;
          this.email = ''; // Réinitialiser l'email après un abonnement réussi

          // Faire disparaître le message de succès après 5 secondes (5000 ms)
          setTimeout(() => {
            this.successMessage = null;
          }, 5000);
        },
        error: (error) => {
          this.errorMessage = 'Erreur lors de l\'abonnement. Veuillez réessayer.';
          console.error('Erreur lors de l\'abonnement:', error);
          this.successMessage = null;

          // Faire disparaître le message d'erreur après 5 secondes (5000 ms)
          setTimeout(() => {
            this.errorMessage = null;
          }, 5000);
        }
      });
    } else {
      this.errorMessage = 'Veuillez entrer un email valide.';
      this.successMessage = null;

      // Faire disparaître le message d'erreur après 5 secondes (5000 ms)
      setTimeout(() => {
        this.errorMessage = null;
      }, 5000);
    }
  }


}
