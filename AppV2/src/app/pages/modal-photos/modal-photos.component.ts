import { Component, ElementRef, ViewChild ,AfterViewInit,Input} from '@angular/core';
import { ModalController } from '@ionic/angular';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import {Shared} from '../Shared'
import {GestureController} from '@ionic/angular';
import { AlertController } from '@ionic/angular';
// import {Gesture,GestureConfig} from '@ionic/core';

@Component({
  selector: 'app-modal-photos',
  templateUrl: './modal-photos.component.html',
  styleUrls: ['./modal-photos.component.scss'],
})
export class ModalPhotosComponent implements AfterViewInit {
  @ViewChild('close',{read: ElementRef})close:ElementRef   
  @ViewChild('height',{read: ElementRef})height:ElementRef    

  constructor(private modalctrl:ModalController,private socialSharing: SocialSharing,

    private shared:Shared,private gestureCtrl:GestureController,private element:ElementRef
    ,public alertController: AlertController) {
     this.photoid= this.shared.photo_id;
  console.log("dynamic modal open");
     }

photoid;
//  modal_css_back:string="modal";
//  modal_close=0;

closeModal(){
  this.shared.modal_css="modal";
  this.modalctrl.dismiss(this.shared.modal_css);
  this.shared.searchModalcss="modal";
  console.log("dynamic modal close")
  }

//  aync  closeModal()
//    {
//     if(this.modal_close==0)
//     {
//       this.modalctrl.dismiss(this.modal_css_back);
//     }
//     const a=setInterval(data => {
 
//       if(this.shared.pasive==1 && this.shared.ispress==1 )
//       {
//         clearInterval(a);
//         this.modalctrl.dismiss(this.modal_css_back); //modal kapanınca css degismesi icin geri gonderdik.
//         this.shared.pasive=0; 
//         this.shared.ispress=0;
//         console.log("event modal closed");  
//       }
//       }, 100);
//   }


   hidecontrol=1;
   likes(url)
   {
     
     if(this.hidecontrol==1)
     {
       this.hidecontrol=0;
     }
     else
     {
       this.hidecontrol=1;
     }

   }
   

   async openbrowser(url:string) {
    const alert = await this.alertController.create({
      cssClass: 'alert_css',
      header: 'Notice!',
      message: 'You are leaving Application',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Okay',
          handler: () => {
            console.log('Confirm Okay');
   window.open(url,'_system','location=yes');
       
          }
        }
      ]
    });

    await alert.present();
  }

   

  share(url)
{
  var options = {
    message:'Share together!',
    url:`${url}`,
  };
  this.socialSharing.shareWithOptions(options);
}

  modal_height;
  async  ngAfterViewInit() {
    setTimeout(() => {
      this.modal_height=this.height.nativeElement.offsetHeight;
      const el = document.querySelector('.modal_photo_class .modal-wrapper');


      // if(this.share1.device_height<this.modal_height)
      // {
      // el3.setAttribute('style',`height:${100}%`)
      // }
    
        el.setAttribute('style',`height:${this.modal_height}px`)

       console.log(this.modal_height);

     }, 100);

 

      // let gesture= await this.gestureCtrl.create({
      //   el:this.close.nativeElement,
      //   gestureName:'img',
      //   gesturePriority:100,
      //   threshold:5,
      //   passive:false,
      //   // direction: "y",
      //   onStart:()=>{
      //     console.log("start");
    
      //   },
      //   onMove:()=>{
      // console.log("going");
      //   },
    
      //   onEnd:ev=>{
          
      // console.log("end");
      //     // this.closeModal();
   
      //   }
    
    
      // })
      //   gesture.enable(true);
      // const options:GestureConfig={
      //  el:this.logo.nativeElement,
      //  gestureName:'logo',
      //   onStart:()=>{
      //     console.log("start");
      //   },
      //   onMove:ev=>{
      //     console.log(ev);
      //   },
      //   onEnd:ev=>{
      //     console.log("end");
      //   }
      // };
    
      // const gesture:Gesture=await this.gestureCtrl.create(options);
      // gesture.enable();
  
  }

 
  
}
