import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { HeaderModule } from 'src/app/components/header/header.component';
import { SearchTabPageRoutingModule } from './search-tab-routing.module';
import { SearchTabPage } from './search-tab.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HeaderModule,
    IonicModule,
    SearchTabPageRoutingModule,
  ],
  declarations: [SearchTabPage],
})
export class SearchTabPageModule { }
