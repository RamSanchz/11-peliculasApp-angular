import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import Swiper from 'swiper';
import { Movie } from '../../interfaces/cartelera-response';

@Component({
  selector: 'app-slideshow',
  templateUrl: './slideshow.component.html',
  styleUrls: ['./slideshow.component.css'],
})
export class SlideshowComponent implements OnInit, AfterViewInit {
  @Input() movies: Movie[];

  public swiper: Swiper;

  constructor() {}

  /* ocurre despues de que se carga el contenido */
  ngAfterViewInit(): void {
    //inicializamos el swiper
    this.swiper = new Swiper('.swiper-container', {
      /* estos son argumentos que serviran para modificar el slide checar la documentacion */
      loop: true,
    });
  }

  ngOnInit(): void {}

  onSlideNext() {
    this.swiper.slideNext();
  }

  onSlidePrev() {
    this.swiper.slidePrev();
  }
}
