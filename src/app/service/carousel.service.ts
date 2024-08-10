import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CarouselService {

  private slides = [
    {
      img: 'assets/images/book.jpg',
      alt: 'Inspiration pour votre prochaine lecture',
      title: 'Redécouvrez la Magie des Livres',
      description: 'Plongez dans des univers fascinants et laissez-vous emporter par des histoires inoubliables.',
    },
    {
      img: 'assets/images/beautiful.jpg',
      alt: 'Une aventure littéraire',
      title: 'Voyage au Coeur des Émotions',
      description: 'Explorez des récits qui éveillent les sens et touchent le cœur, pour chaque lecteur en quête de passion.',
    },
    {
      img: 'assets/images/fantasy.jpg',
      alt: 'Évasion et imagination',
      title: 'Évasion Totale dans le Monde de la Fantasy',
      description: 'Libérez votre imagination avec des mondes fantastiques et des créatures extraordinaires.',
    },
  ];

  getSlides() {
    return this.slides;
  }
}
