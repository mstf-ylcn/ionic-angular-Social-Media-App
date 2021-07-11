import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ModalPhotosComponent } from '../modal-photos/modal-photos.component';

const routes: Routes = [
  {
    path: '',
    component: ModalPhotosComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModalPhotosPageRoutingModule {}
