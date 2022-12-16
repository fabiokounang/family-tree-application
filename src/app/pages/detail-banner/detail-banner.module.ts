import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DetailBannerPageRoutingModule } from './detail-banner-routing.module';

import { DetailBannerPage } from './detail-banner.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DetailBannerPageRoutingModule
  ],
  declarations: [DetailBannerPage]
})
export class DetailBannerPageModule {}
