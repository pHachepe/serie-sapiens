import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { HeaderModule } from 'src/app/components/header/header.component';
import { SettingsTabPageRoutingModule } from './settings-tab-routing.module';
import { SettingsTabPage } from './settings-tab.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HeaderModule,
    IonicModule,
    SettingsTabPageRoutingModule,
  ],
  declarations: [SettingsTabPage],
})
export class SettingsTabPageModule { }
