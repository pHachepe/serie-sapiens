import { CommonModule } from '@angular/common';
import {
  CUSTOM_ELEMENTS_SCHEMA,
  Component,
  Input,
  NgModule,
  OnInit,
} from '@angular/core';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-swiper',
  templateUrl: './swiper.component.html',
  styleUrls: ['./swiper.component.scss'],
})
export class SwiperComponent implements OnInit {
  @Input() movies: any[] = [];

  constructor() {}

  ngOnInit() {
    console.log(this.movies);
  }

  goToFilmDetail(id: number) {
    console.log('el id es: ', id);
  }
}

@NgModule({
  declarations: [SwiperComponent],
  imports: [IonicModule, CommonModule],
  exports: [SwiperComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class WrapperModule {}

// https://manuel-rauber.com/2021/02/23/youre-using-custom_elements_schema-wrong/
// https://ionicframework.com/docs/angular/slides
// https://swiperjs.com/demos#pagination-progress
