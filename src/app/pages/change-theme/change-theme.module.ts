import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ChangeThemePageRoutingModule } from './change-theme-routing.module';

import { ChangeThemePage } from './change-theme.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ChangeThemePageRoutingModule
  ],
  declarations: [ChangeThemePage]
})
export class ChangeThemePageModule {}
