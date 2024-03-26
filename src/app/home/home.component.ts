import { Component } from '@angular/core';
import * as $ from 'jquery';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {


  nextSlide() {
    ($('#carouselExampleCaptions') as any).carousel('next');
  }

  prevSlide() {
    ($('#carouselExampleCaptions') as any).carousel('prev');
  }
}