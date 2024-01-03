import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { HeaderModule } from 'src/app/components/header/header.component';
import { SwiperModule } from 'src/app/components/swiper/swiper.component';
import { ResourceDetailsPageRoutingModule } from './resource-details-routing.module';
import { ResourceDetailsPage } from './resource-details.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HeaderModule,
    IonicModule,
    ResourceDetailsPageRoutingModule,
    SwiperModule,
  ],
  declarations: [ResourceDetailsPage]
})
export class ResourceDetailsPageModule { }
