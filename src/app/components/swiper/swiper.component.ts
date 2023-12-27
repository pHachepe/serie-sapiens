import { CommonModule } from '@angular/common';
import {
  CUSTOM_ELEMENTS_SCHEMA,
  Component,
  Input,
  NgModule,
  OnInit,
} from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { MovieCardModule } from '../movie-card/movie-card.component';
import { Result } from 'src/app/models/result.model';

@Component({
  selector: 'app-swiper',
  templateUrl: './swiper.component.html',
})
export class SwiperComponent implements OnInit {
  @Input() title: string = '';
  @Input() items!: Result[];

  constructor() {}

  ngOnInit() {}
}

@NgModule({
  declarations: [SwiperComponent],
  imports: [IonicModule, CommonModule, MovieCardModule],
  exports: [SwiperComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class SwiperModule {}

// https://manuel-rauber.com/2021/02/23/youre-using-custom_elements_schema-wrong/
// https://ionicframework.com/docs/angular/slides
// https://swiperjs.com/demos#pagination-progress
