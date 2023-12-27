import { CUSTOM_ELEMENTS_SCHEMA, Component, Input, NgModule, OnInit } from '@angular/core';
import { Result } from 'src/app/models/result.model';
import { CommonModule } from '@angular/common';
import { MovieCardModule } from '../movie-card/movie-card.component';

@Component({
  selector: 'app-top-swiper',
  templateUrl: './top-swiper.component.html',
})
export class TopSwiperComponent  implements OnInit {
  @Input() title: string = '';
  @Input() items!: Result[];

  constructor() {}

  ngOnInit() {
    this.items = this.items.slice(0, 10);
  }
}

@NgModule({
  declarations: [TopSwiperComponent],
  imports: [CommonModule, MovieCardModule],
  exports: [TopSwiperComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class TopSwiperModule {}