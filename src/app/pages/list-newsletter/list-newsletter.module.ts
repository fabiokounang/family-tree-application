import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListNewsletterPageRoutingModule } from './list-newsletter-routing.module';

import { ListNewsletterPage } from './list-newsletter.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListNewsletterPageRoutingModule
  ],
  declarations: [ListNewsletterPage]
})
export class ListNewsletterPageModule {}
