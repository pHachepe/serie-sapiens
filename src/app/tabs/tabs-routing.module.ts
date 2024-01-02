import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'searchtab',
        loadChildren: () =>
          import('./search-tab/search-tab.module').then(
            (m) => m.SearchTabPageModule
          ),
      },
      {
        path: 'tab1',
        loadChildren: () =>
          import('../tab1/tab1.module').then((m) => m.Tab1PageModule),
      },
      {
        path: 'trendingtab',
        loadChildren: () =>
          import('./trending-tab/trending-tab.module').then(
            (m) => m.TrendingTabPageModule
          ),
      },
      {
        path: 'tab3',
        loadChildren: () =>
          import('../tab3/tab3.module').then((m) => m.Tab3PageModule),
      },
      {
        path: '',
        redirectTo: '/tabs/trendingtab',
        pathMatch: 'full',
      },
      {
        path: 'details/:media_type/:id',
        loadChildren: () =>
          import('../pages/resource-details/resource-details.module').then(
            (m) => m.ResourceDetailsPageModule
          ),
      },
    ],
  },
  {
    path: '',
    redirectTo: '/tabs/trendingtab',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class TabsPageRoutingModule {}
