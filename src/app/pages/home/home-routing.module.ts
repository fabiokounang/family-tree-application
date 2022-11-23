import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GuardService } from 'src/app/services/guard.service';

import { HomePage } from './home.page';

const routes: Routes = [
  {
    path: '',
    component: HomePage,
    children: [
      {
        path: 'homepage',
        canActivate: [GuardService],
        loadChildren: () => import('../../pages/homepage/homepage.module').then( m => m.HomepagePageModule)
      },
      {
        path: 'historypoint',
        canActivate: [GuardService],
        loadChildren: () => import('../../pages/historypoint/historypoint.module').then( m => m.HistorypointPageModule)
      },
      {
        path: 'tree',
        canActivate: [GuardService],
        loadChildren: () => import('../../pages/tree/tree.module').then( m => m.TreePageModule)
      },
      {
        path: 'merchant',
        canActivate: [GuardService],
        loadChildren: () => import('../../pages/merchant/merchant.module').then( m => m.MerchantPageModule)
      },
      {
        path: 'calendar',
        loadChildren: () => import('../../pages/calendar/calendar.module').then( m => m.CalendarPageModule)
      },
      {
        path: 'profile',
        canActivate: [GuardService],
        loadChildren: () => import('../../pages/profile/profile.module').then( m => m.ProfilePageModule),
      },
      {
        path: 'notification',
        canActivate: [GuardService],
        loadChildren: () => import('../../pages/notification/notification.module').then( m => m.NotificationPageModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomePageRoutingModule {}
