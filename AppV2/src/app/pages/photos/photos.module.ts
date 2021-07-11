import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import { IonicModule } from '@ionic/angular';
import { PhotosPageRoutingModule } from './photos-routing.module';
import { PhotosPage } from './photos.page';
import {ModalPhotosComponent} from '../modal-photos/modal-photos.component'


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PhotosPageRoutingModule,
    HttpClientModule,

  ],
  declarations: [PhotosPage,ModalPhotosComponent],
  entryComponents: [ModalPhotosComponent]
})
export class PhotosPageModule {}
