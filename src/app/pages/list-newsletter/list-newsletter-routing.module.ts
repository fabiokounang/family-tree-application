import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListNewsletterPage } from './list-newsletter.page';

const routes: Routes = [
  {
    path: '',
    component: ListNewsletterPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListNewsletterPageRoutingModule {}
