import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { SearchPageRoutingModule } from './search-routing.module';
import {HttpClientModule} from '@angular/common/http';
import {ModalPhotosComponent} from '../modal-photos/modal-photos.component'
import { SearchPage } from './search.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SearchPageRoutingModule,
    HttpClientModule
  ],
  declarations: [SearchPage,ModalPhotosComponent],
  entryComponents: [ModalPhotosComponent]
})
export class SearchPageModule {}
