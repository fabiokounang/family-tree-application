import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HomepagePageRoutingModule } from './homepage-routing.module';

import { HomepagePage } from './homepage.page';
import { WeekendDirective } from 'src/app/directives/weekend.directive';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomepagePageRoutingModule
  ],
  schemas: [NO_ERRORS_SCHEMA],
  declarations: [HomepagePage, WeekendDirective]
})
export class HomepagePageModule {}
