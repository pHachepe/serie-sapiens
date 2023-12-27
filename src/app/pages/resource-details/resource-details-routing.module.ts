import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ResourceDetailsPage } from './resource-details.page';

const routes: Routes = [
  {
    path: '',
    component: ResourceDetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ResourceDetailsPageRoutingModule {}
