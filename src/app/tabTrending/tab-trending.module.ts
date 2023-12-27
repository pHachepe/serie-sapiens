import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TabTrendingPage } from './tab-trending.page';
import { TabTrendingPageRoutingModule } from './tab-trending-routing.module';
import { SwiperModule } from '../components/swiper/swiper.component';
import { TopSwiperModule } from '../components/top-swiper/top-swiper.component';
import { HeaderModule } from '../components/header/header.component';

@NgModule({
  declarations: [TabTrendingPage],
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    TabTrendingPageRoutingModule,
    SwiperModule,
    TopSwiperModule,
    HeaderModule,
  ],
})
export class TabTrendingPageModule {}
