import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DetailNewsletterPageRoutingModule } from './detail-newsletter-routing.module';

import { DetailNewsletterPage } from './detail-newsletter.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DetailNewsletterPageRoutingModule
  ],
  declarations: [DetailNewsletterPage]
})
export class DetailNewsletterPageModule {}
