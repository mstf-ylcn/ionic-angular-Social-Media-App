import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FullModalPhotosPageRoutingModule } from './full-modal-photos-routing.module';

import { FullModalPhotosPage } from './full-modal-photos.page';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FullModalPhotosPageRoutingModule
  ],
  declarations: [FullModalPhotosPage]
})
export class FullModalPhotosPageModule {}
