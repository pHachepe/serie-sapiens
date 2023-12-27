import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { ResourceDetailsPage } from './pages/resource-details/resource-details.page';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./tabs/tabs.module').then((m) => m.TabsPageModule),
  },
  {
    path: 'resource-details',
    loadChildren: () =>
      import('./pages/resource-details/resource-details.module').then(
        (m) => m.ResourceDetailsPageModule
      ),
  },
  { path: 'resource-details/:media_type/:id', component: ResourceDetailsPage },
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
