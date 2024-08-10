import { Component } from '@angular/core';
import { CarouselService } from '../service/carousel.service';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css']
})
export class CarouselComponent {
  slides: any[] = [];

  constructor(private carouselService: CarouselService) {}

  ngOnInit(): void {
    this.slides = this.carouselService.getSlides();
  }
}
