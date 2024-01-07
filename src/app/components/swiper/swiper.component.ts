import { CommonModule } from '@angular/common';
import {
  CUSTOM_ELEMENTS_SCHEMA,
  Component,
  ElementRef,
  Input,
  NgModule,
  ViewChild,
} from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { Result } from 'src/app/models/result.model';
import { MovieCardModule } from '../movie-card/movie-card.component';

@Component({
  selector: 'app-swiper',
  templateUrl: './swiper.component.html',
})
export class SwiperComponent {
  @Input() containerClass: string = '';
  @Input() title: string = '';
  @Input() items!: Result[];
  @ViewChild('swiperRef') swiperRef!: ElementRef;

  public updateConfig() {
    if (this.swiperRef) {
      Object.assign(this.swiperRef?.nativeElement, { slidesPerView: 3.3 });
      Object.assign(this.swiperRef?.nativeElement, { slidesPerView: 2.3 });
    }
  }

  trackById(_index: number, item: Result) {
    return item.id;
  }
}

@NgModule({
  declarations: [SwiperComponent],
  imports: [IonicModule, CommonModule, MovieCardModule],
  exports: [SwiperComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class SwiperModule {}
