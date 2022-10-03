import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RegisterEventPageRoutingModule } from './register-event-routing.module';

import { RegisterEventPage } from './register-event.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    RegisterEventPageRoutingModule
  ],
  declarations: [RegisterEventPage]
})
export class RegisterEventPageModule {}
