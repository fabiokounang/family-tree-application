import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ChangeThemePage } from './change-theme.page';

const routes: Routes = [
  {
    path: '',
    component: ChangeThemePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ChangeThemePageRoutingModule {}
