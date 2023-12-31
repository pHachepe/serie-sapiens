import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ResourceDetailsPageRoutingModule } from './resource-details-routing.module';

import { ResourceDetailsPage } from './resource-details.page';
import { SwiperModule } from 'src/app/components/swiper/swiper.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ResourceDetailsPageRoutingModule,
    SwiperModule
  ],
  declarations: [ResourceDetailsPage]
})
export class ResourceDetailsPageModule {}
