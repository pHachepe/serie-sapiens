import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/tabs/trendingtab',
    pathMatch: 'full',
  },
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: '',
        redirectTo: '/tabs/trendingtab',
        pathMatch: 'full',
      },
      {
        path: 'searchtab',
        loadChildren: () =>
          import('./search-tab/search-tab.module').then(
            (m) => m.SearchTabPageModule
          ),
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
        path: 'settingstab',
        loadChildren: () =>
          import('./settings-tab/settings-tab.module').then((m) => m.SettingsTabPageModule),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class TabsPageRoutingModule { }
