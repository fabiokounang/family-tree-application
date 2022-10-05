import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HistorypointPageRoutingModule } from './historypoint-routing.module';

import { HistorypointPage } from './historypoint.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HistorypointPageRoutingModule
  ],
  declarations: [HistorypointPage]
})
export class HistorypointPageModule {}
