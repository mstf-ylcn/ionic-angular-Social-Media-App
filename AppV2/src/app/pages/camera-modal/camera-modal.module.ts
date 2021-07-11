import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CameraModalPageRoutingModule } from './camera-modal-routing.module';

import { CameraModalPage } from './camera-modal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CameraModalPageRoutingModule
  ],
  declarations: [CameraModalPage]
})
export class CameraModalPageModule {}
