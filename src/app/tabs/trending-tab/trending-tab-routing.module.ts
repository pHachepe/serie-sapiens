import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TrendingTabPage } from './trending-tab.page';

const routes: Routes = [
  {
    path: '',
    component: TrendingTabPage,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TrendingTabPageRoutingModule {}
