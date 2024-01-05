import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  CUSTOM_ELEMENTS_SCHEMA,
  Component,
  ElementRef,
  Input,
  NgModule,
  ViewChild,
} from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { Result } from 'src/app/models/result.model';
import { SwiperOptions } from 'swiper/types';
import { MovieCardModule } from '../movie-card/movie-card.component';

@Component({
  selector: 'app-swiper',
  templateUrl: './swiper.component.html',
})
export class SwiperComponent implements AfterViewInit {
  @Input() title: string = '';
  @Input() items!: Result[];
  @ViewChild('swiperRef') swiperRef!: ElementRef;

  public config: SwiperOptions = {
    init: true,
    freeMode: true,
    centerInsufficientSlides: true,
    spaceBetween: 15,
    loop: true,
  };

  constructor() {}

  ngAfterViewInit() {
    this.updateConfig();
  }

  public updateConfig() {
    if (this.swiperRef) {
      this.config.slidesPerView = 3.3;
      Object.assign(this.swiperRef?.nativeElement, this.config);
      this.swiperRef?.nativeElement.initialize();

      this.config.slidesPerView = 2.3;
      Object.assign(this.swiperRef?.nativeElement, this.config);
      this.swiperRef?.nativeElement.initialize();
    }
  }
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
