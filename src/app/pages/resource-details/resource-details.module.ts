import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ResourceDetailsPageRoutingModule } from './resource-details-routing.module';

import { ResourceDetailsPage } from './resource-details.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ResourceDetailsPageRoutingModule
  ],
  declarations: [ResourceDetailsPage]
})
export class ResourceDetailsPageModule {}
