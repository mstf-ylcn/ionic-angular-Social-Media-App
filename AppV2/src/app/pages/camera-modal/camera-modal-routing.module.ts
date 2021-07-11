import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CameraModalPage } from './camera-modal.page';

const routes: Routes = [
  {
    path: '',
    component: CameraModalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CameraModalPageRoutingModule {}
