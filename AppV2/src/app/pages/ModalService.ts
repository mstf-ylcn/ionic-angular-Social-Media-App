import { Injectable } from '@angular/core';
import { ModalController } from '@ionic/angular';
import {ModalPhotosComponent} from './modal-photos/modal-photos.component';
import {FullModalPhotosPage} from './full-modal-photos/full-modal-photos.page';
@Injectable({ providedIn: 'root' })
export class ModalService {

   constructor(private modalctrl:ModalController){

   }
   
   modal_css="modal";
    async  openDynamicModal(send_info)
    {
  
      const modal = await this.modalctrl.create(
       {
         
         component: ModalPhotosComponent,
         swipeToClose: true,
         cssClass: 'modal_photo_class',
         componentProps:{photoid : send_info},
         
         
       });
       await modal.present();
 
    //    modal.onDidDismiss() 
    //    .then((data) => {
    //      this.modal_css = data['data'];
    //      console.log("Photos page modal close:"+this.modal_css);
    //  });
 return await modal.present();
 
    } 
    
    async  openFUllModal(send_info)
    {
  
      const modal = await this.modalctrl.create(
       {
         
         component: FullModalPhotosPage,
         swipeToClose: true,
         cssClass: 'full_modal_photo_class',
         componentProps:{photoid : send_info},
         
         
       });
       await modal.present();

 return await modal.present();
 
    } 

}