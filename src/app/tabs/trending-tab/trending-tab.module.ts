import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TrendingTabPage } from './trending-tab.page';
import { TrendingTabPageRoutingModule } from './trending-tab-routing.module';
import { SwiperModule } from '../../components/swiper/swiper.component';
import { TopSwiperModule } from '../../components/top-swiper/top-swiper.component';
import { HeaderModule } from '../../components/header/header.component';

@NgModule({
  declarations: [TrendingTabPage],
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    TrendingTabPageRoutingModule,
    SwiperModule,
    TopSwiperModule,
    HeaderModule,
  ],
})
export class TrendingTabPageModule { }
