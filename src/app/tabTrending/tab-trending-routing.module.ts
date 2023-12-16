import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabTrendingPage } from './tab-trending.page';

const routes: Routes = [
  {
    path: '',
    component: TabTrendingPage,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabTrendingPageRoutingModule {}
