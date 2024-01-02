import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SearchTabPage } from './search-tab.page';

const routes: Routes = [
  {
    path: '',
    component: SearchTabPage,
  },
  {
    path: 'details/:media_type/:id',
    loadChildren: () =>
      import('../../pages/resource-details/resource-details.module').then(
        (m) => m.ResourceDetailsPageModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SearchTabPageRoutingModule { }
