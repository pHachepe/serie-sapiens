import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { HeaderModule } from 'src/app/components/header/header.component';
import { SwiperModule } from 'src/app/components/swiper/swiper.component';
import { UserListsTabPageRoutingModule } from './user-lists-tab-routing.module';
import { UserListsTabPage } from './user-lists-tab.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HeaderModule,
    IonicModule,
    SwiperModule,
    UserListsTabPageRoutingModule
  ],
  declarations: [UserListsTabPage]
})
export class UserListsTabPageModule { }
