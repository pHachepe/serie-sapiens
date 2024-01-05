import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { HeaderModule } from 'src/app/components/header/header.component';
import { SapiensTabPageRoutingModule } from './sapiens-tab-routing.module';
import { SapiensTabPage } from './sapiens-tab.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HeaderModule,
    IonicModule,
    SapiensTabPageRoutingModule
  ],
  declarations: [SapiensTabPage]
})
export class SapiensTabPageModule { }
