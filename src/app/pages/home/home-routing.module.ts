import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomePage } from './home.page';

const routes: Routes = [
  {
    path: '',
    component: HomePage,
    children: [
      {
        path: 'homepage',
        loadChildren: () => import('../../pages/homepage/homepage.module').then( m => m.HomepagePageModule)
      },
      {
        path: 'tree',
        loadChildren: () => import('../../pages/tree/tree.module').then( m => m.TreePageModule)
      },
      {
        path: 'profile',
        loadChildren: () => import('../../pages/profile/profile.module').then( m => m.ProfilePageModule),
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomePageRoutingModule {}
