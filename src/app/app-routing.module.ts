import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { GuardService } from './services/guard.service';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'signin',
    pathMatch: 'full'
  },
  {
    path: 'signin',
    loadChildren: () => import('./pages/signin/signin.module').then( m => m.SigninPageModule)
  },
  {
    path: 'signup',
    loadChildren: () => import('./pages/signup/signup.module').then( m => m.SignupPageModule)
  },
  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.module').then( m => m.HomePageModule),
    canActivate: [GuardService]
  },
  {
    path: 'change-password',
    loadChildren: () => import('./pages/change-password/change-password.module').then( m => m.ChangePasswordPageModule),
    canActivate: [GuardService]
  },
  {
    path: 'change-theme',
    loadChildren: () => import('./pages/change-theme/change-theme.module').then( m => m.ChangeThemePageModule),
    canActivate: [GuardService]
  },
  {
    path: 'list-newsletter',
    loadChildren: () => import('./pages/list-newsletter/list-newsletter.module').then( m => m.ListNewsletterPageModule),
    canActivate: [GuardService],
  },
  {
    path: 'detail-newsletter/:id',
    canActivate: [GuardService],
    loadChildren: () => import('./pages/detail-newsletter/detail-newsletter.module').then( m => m.DetailNewsletterPageModule)
  },
  {
    path: 'detail-banner/:id',
    canActivate: [GuardService],
    loadChildren: () => import('./pages/detail-banner/detail-banner.module').then( m => m.DetailBannerPageModule)
  },
  {
    path: 'profile-information',
    loadChildren: () => import('./pages/profile-information/profile-information.module').then( m => m.ProfileInformationPageModule),
    canActivate: [GuardService]
  },
  {
    path: 'event/:id',
    loadChildren: () => import('./pages/register-event/register-event.module').then( m => m.RegisterEventPageModule),
    canActivate: [GuardService]
  },
]


@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules, useHash: true })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
