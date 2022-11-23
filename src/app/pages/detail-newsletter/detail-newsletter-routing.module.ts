import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DetailNewsletterPage } from './detail-newsletter.page';

const routes: Routes = [
  {
    path: '',
    component: DetailNewsletterPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DetailNewsletterPageRoutingModule {}
