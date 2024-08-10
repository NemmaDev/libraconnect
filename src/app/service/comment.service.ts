import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  private comments = [
    {
      name: 'Alice',
      text: 'Un livre incroyable ! J\'ai été captivé du début à la fin.',
      imageSrc: 'assets/images/woman.png'
    },
    {
      name: 'Bob',
      text: 'Une lecture très enrichissante. Je recommande vivement.',
      imageSrc: 'assets/images/homme.png'
    },
    {
      name: 'Charlie',
      text: 'Une expérience de lecture unique. Les personnages sont très bien développés.',
      imageSrc: 'assets/images/man.png'
    }
  ];

  constructor() { }

  getComments() {
    return this.comments;
  }
}
