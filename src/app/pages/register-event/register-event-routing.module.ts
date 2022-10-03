import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RegisterEventPage } from './register-event.page';

const routes: Routes = [
  {
    path: '',
    component: RegisterEventPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RegisterEventPageRoutingModule {}
