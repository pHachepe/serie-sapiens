import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SearchTabPage } from './search-tab.page';

const routes: Routes = [
  {
    path: '',
    component: SearchTabPage,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SearchTabPageRoutingModule {}
