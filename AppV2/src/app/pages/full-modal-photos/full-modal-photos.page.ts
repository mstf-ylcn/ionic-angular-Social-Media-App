import { Component, ElementRef, OnInit, ViewChild ,AfterViewInit} from '@angular/core';
import { IonContent, IonSlides, LoadingController, ModalController, NavController, ToastController } from '@ionic/angular';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import {Shared} from '../Shared';
import {Api} from '../Api';
import {GestureController} from '@ionic/angular';
import { AlertController } from '@ionic/angular';
// import {Gesture,GestureConfig} from '@ionic/core';
import {HttpClient} from '@angular/common/http';
import {ModalPhotosComponent} from '../modal-photos/modal-photos.component'
import { Router } from '@angular/router';

import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import firebase from 'firebase/app';
import { AngularFireStorage, createUploadTask } from '@angular/fire/storage';



declare var Masonry: any; 


@Component({
  selector: 'app-full-modal-photos',
  templateUrl: './full-modal-photos.page.html',
  styleUrls: ['./full-modal-photos.page.scss'],
})
export class FullModalPhotosPage implements OnInit,AfterViewInit {
  @ViewChild('grid2') grid2:ElementRef  
  @ViewChild(IonContent) content: IonContent;
  @ViewChild('device_height',{read: ElementRef})device_height:ElementRef
  

  constructor(private modalctrl:ModalController,
    private socialSharing: SocialSharing,
    private shared:Shared,
    private gestureCtrl:GestureController,
    private element:ElementRef,
    public alertController: AlertController,
    private api:Api,
    private http:HttpClient,
    private router:Router,
    private navctrl:NavController,
    private loadingController:LoadingController,
    private afAuth:AngularFireAuth,
    private afs:AngularFirestore,
    private storage:AngularFireStorage,
    private toastController:ToastController) 
    { 
    }

    async openFUllModal(id) {
      const modal = await this.modalctrl.create({
        component: FullModalPhotosPage,
        cssClass: 'full_modal_photo_class'
      });
      return await modal.present();
    }

    async openDynamicModal(id) {
     this.shared.photo_id=id;
      const modal = await this.modalctrl.create({
        component: ModalPhotosComponent,
        cssClass: 'modal_photo_class'
      });
      return await modal.present();
    }
    images=[];
    modal_css:string="modal";
  ngOnInit() {
    this.photoid=this.shared.photo_id; 
    // this.present();
    this.mainImages.push(this.photoid);  
  }
  hide2=1;

  ionViewDidEnter()
  { 

    console.log("did ente");
    this.present();
    setTimeout(() => {
      this.gesture();
    }, 100);
    this.content.scrollToPoint(0,this.shared.fullModalY,100);
    this.loadCounter=0;
    this.hide2=1;
      // this.photoid=this.shared.photo_id;
     if(this.shared.enterCounter==0)
     {
       this.photoid=this.shared.photo_id;
       this.mainImages.push(this.photoid); 
       for (let index = 0; index < this.shared.userArray.Like.length; index++) {
        if(this.photoid.urls.small==this.shared.userArray.Like[index].photoUrl) 
        {
           this.hidecontrol=1;
           break;
        } 
    }
       this.loadimage();
       this.shared.PhotosModalisClose=0;
     }
    this.shared.enterCounter++;
  }
  hideBackIcon=1;
  hideBackButton()
  {
      this.hideBackIcon=0;
  }

  hideBackButtonEnd()
  {
    this.hideBackIcon=1;
  }

   
 SwipeToClose()
 {
  this.hideBackIcon=1;
    // this.modalctrl.dismiss();
    if(this.imagesLib.length==1)
    {
      this.shared.PhotosModalisClick=0;
      this.images=[];
      this.loadCounter=0;
      this.imagesLib=[];
      this.shared.enterCounter=0;
       this.hidecontrol=0;
     this.router.navigate(['tabs/photos']);
     this.ToTap();
    }
    else
    {
      this.present();
      this.imagesLib.length--;
      this.mainImages.length--;
      this.loadCounter=0;
   
      for (let index = 0; index < this.shared.userArray.Like.length; index++) {
        if(this.mainImages[this.mainImages.length-1].urls.small==this.shared.userArray.Like[index].photoUrl) 
        {
           this.hidecontrol=1;
           break;
        } 
        else
        {
          this.hidecontrol=0;
        }
       }
      
    }

 }
    ionViewDidLeave()
 {
  this.hide2=0;

   if(this.shared.PhotosModalisClose==1)
   {
   this.shared.PhotosModalisClose=0;
   this.shared.PhotosModalisClick=0;
   this.images=[];
   this.loadCounter=0;
   this.imagesLib.length=0;
   this.ToTap();
   }
 }


  loadCounter=0;
  photoHide="loading"
  resize()
{
  if(this.images.length==this.loadCounter+1)
  {
    setTimeout(() => {
      var elem = document.querySelector('.grid2');
      var msnry = new Masonry(elem, {
      // options
      itemSelector: '.grid-item2',
      fitWidth: true 
      });
      }, 50);
    this.photoHide="loaded";
  }
   if(this.images.length/2==this.loadCounter+1)
   {
    this.dismiss();
   }

  this.loadCounter++;
}
  
  photoid;
  loadimage(event?)
  {
 
    // for (let index = 0; index < this.word.length; index++) {
    //   this.word=this.word.replace(" ","-");
      
    //   console.log(this.word);
      
    // }
    // -----------------------------------------------------------
    this.photoHide="loading";
    this.http.get(`${this.api.url}photos/random?client_id=${this.api.key}&count=${this.api.count}&page=${this.api.page}
    `).subscribe(res => 
      {
      console.log(res);
      this.ToTap();
      this.images=this.images.concat(res);
      this.imagesLib.push(this.images);
      this.gesture();
    if(event)
    {
      event.target.complete();
    }
  
    },(error:any)=>{
     console.log("Error===",error);
     console.log("Api limit");
 
    })
  }


   hidecontrol=0;
   tut=1;
   likePhoto =  { photoUrl:'', pp:'',name:'',share:'',userUrl:''};
   like(url)
   {
     console.log("liked photo:"+url);
     this.likePhoto={photoUrl:url.urls.small,pp:url.user.profile_image.small,name:url.user.username,share:url.links.html,userUrl:url.user.links.html};

     this.afs.collection('user').doc(this.shared.uid).update({
      'Like':firebase.firestore.FieldValue.arrayUnion(this.likePhoto)//array e ekleme
    })
     this.hidecontrol=1;
   }
   unlike(url)
   {
    this.likePhoto={photoUrl:url.urls.small,pp:url.user.profile_image.small,name:url.user.username,share:url.links.html,userUrl:url.user.links.html};

    this.afs.collection('user').doc(this.shared.uid).update({
     'Like':firebase.firestore.FieldValue.arrayRemove(this.likePhoto)//array e ekleme

   })
   this.hidecontrol=0;
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
          }
        }, {
          text: 'Okay',
          handler: () => {
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
 

yAxisElevation;
yAxisControl=0;
cc=0;
heightControl(ev)
{
setTimeout(() => {
 if(this.press==1)
 {
  if(this.yAxisControl==0)
  {
   this.yAxisElevation=ev.deltaY;
   this.yAxisControl++;
   console.log(this.yAxisControl);
  }    
   if((Math.abs(this.yAxisElevation)+50)<Math.abs(ev.deltaY))
  {
   this.cc=1;
   this.yAxisElevation=0;
  }
 }
}, 100);
}
xx=0;
interval_counter=0;
async gesture()
{
  
  let gesture= await this.gestureCtrl.create({
    el:this.device_height.nativeElement,
    gestureName:'closemodal',
    gesturePriority:100,
    threshold:1,
    passive:false,
    direction:'y',
    
    onStart:()=>{
      console.log("start");

    },
    onMove:(ev)=>{
     console.log("going");
    },

    onEnd:(ev)=>{
      this.modal_css="modal";
      this.shared.modal_css="modal";

      if((ev.startX+30)<ev.currentX)
      {
       this.xx=1;
      }
 
  if(this.press==1 && this.xx)
  {
    console.log("end");
    this.modalctrl.dismiss();
    this.modal_css="modal";
    this.shared.modal_css="modal"

    this.press=0;
    this.refresh_control="false";
    this.cc=0;
    this.yAxisControl=0;
    this.xx=0;
   this.images=[];
   this.loadCounter=0;
   this.ToTap();
   // this.present();
   this.mainImages.push(this.shared.photo_id);
   for (let index = 0; index < this.shared.userArray.Like.length; index++) {
    if(this.photoid.urls.small==this.shared.userArray.Like[index].photoUrl) 
    {
       this.hidecontrol=1;
       break;
    } 
}




   this.loadimage();
  } 
  else
  {
    this.modalctrl.dismiss();
   this.modal_css="modal";
   this.press=0;
   this.refresh_control="false";
   this.cc=0;
   this.xx=0;
   this.yAxisControl=0;
  }   
    }
  })
    gesture.enable(true);
}


async  ngAfterViewInit(){
  this.resize();
 }

refresh_control="false";
press=0;

modal_active(id)//press
{

   this.press=1;

this.refresh_control="true";
if(this.shared.pasive==0)
{
  this.photoid=id;
 this.openDynamicModal(id);
 this.modal_css="modal_blur";
 this.shared.modal_css="modal_blur";
}

}

modal_pasive(){
 console.log("press:"+this.press)
 console.log("cc"+this.cc)

 if(this.press==1 && this.cc==0)
 {
  console.log("pasive status:"+this.shared.pasive)
  this.refresh_control="false";
  this.press=0;
  this.modalctrl.dismiss();
  this.modal_css="modal";
  this.shared.modal_css="modal";
}
else if(this.press==1 && this.cc==1)
{
 this.modalctrl.dismiss();
 this.cc=0;
 this.press=0;
 this.refresh_control="false";
 this.modal_css="modal";
 this.shared.modal_css="modal"
this.images=[];
this.loadCounter=0;
 this.present();
this.mainImages.push(this.photoid);
for (let index = 0; index < this.shared.userArray.Like.length; index++) {
  if(this.photoid.urls.small==this.shared.userArray.Like[index].photoUrl) 
  {
     this.hidecontrol=1;
     break;
  } 
}
this.loadimage();
// console.log("full modal will open");
}
}



search_url(event?)
{
  this.tut=event.target.value;
   console.log(event);
this.api.search_word=event.target.value;
event.target.value="";
this.api.search_word=event.target.value;
}

   //infinite scrool
  loadData(event) {
    setTimeout(() => {
      console.log('Loading more image');
      this.api.page++;
      //  this.loadimage(event);

      event.target.complete();
    }, 500);
  }

 click_counter:number = 0;
 double_click(id){ 
      this.click_counter++;
           setTimeout(() => {
      if (this.click_counter == 1) {
    this.click_counter = 0;
  //  this.openFUllModal(id);
  this.images=[];
  this.loadCounter=0;
  this.ToTap();
  this.present();
  this.mainImages.push(id);
  console.log(id.urls.small);
  for (let index = 0; index < this.shared.userArray.Like.length; index++) {
    if(id.urls.small==this.shared.userArray.Like[index].photoUrl) 
    {
       this.hidecontrol=1;
       break;
    }
    else
    {
      this.hidecontrol=0;
    } 
}

  this.loadimage();
   //  this.modal_css="modal_blur";
    console.log("full modal click");
    console.log(id);
 
  }
  //double click
  if(this.click_counter > 1){ 
    this.click_counter = 0;

    this.likePhoto={photoUrl:id.urls.small,pp:id.user.profile_image.small,name:id.user.username,share:id.links.html,userUrl:id.user.links.html};

    this.afs.collection('user').doc(this.shared.uid).update({
     'Like':firebase.firestore.FieldValue.arrayUnion(this.likePhoto)
   })
   this.presentToast();
  
  }
}, 250);
 //300 
}

async presentToast() {
  const toast = await this.toastController.create({
    message: `Photo saved`,
    duration: 1500,
    position: 'top',
    cssClass: 'toast2'
  });
  toast.present();
}


hide=1;
counter=0;
scrool_height;

ScrollStart()
{
  // console.log("start scrool") 
}
Scrolling(event){
  this.shared.fullModalY=Math.floor(event.detail.scrollTop);
  if(this.counter==0)
  {
   this.scrool_height=event.detail.scrollTop;
  }
  if((Math.abs(this.scrool_height+50))>=Math.abs(event.detail.scrollTop))//scroolup
  {
   this.hide=1;
   setTimeout(() => {
    this.shared.hideBar=1;
      
    }, 200);
  }
  else
  {
    this.hide=0;
   this.shared.hideBar=0;
  }
  // if(event.detail.scrollTop==0)
  // {
  //   this.hide=1;
  // }
  this.counter++;
}
ScrollEnd(){
    this.counter=0;
  // console.log("scrool end");
}

ToTap(){
  console.log("to tap");
  // setTimeout(() => {
  //   document.querySelector('ion-content').scrollToTop(500);
    
  // }, 200);
  
  this.content.scrollToPoint(0,0);
}

ToTap2(){
  console.log("to tap");
  // setTimeout(() => {
  //   document.querySelector('ion-content').scrollToTop(500);
    
  // }, 200);
  
  this.content.scrollToPoint(0,0,500);
}

imagesLib=[];
mainImages=[];

sliderOpts={
  zoom:{
    maxRation:2,
    maxRatio:5// ????
  }
};
 

barVisible()
{
  this.shared.hideBar=0;
  this.hideBackIcon=0;
}

async zoomEnd(zoomslides:IonSlides)
{

 const slider= await zoomslides.getSwiper();
 const zoom=slider.zoom;
 zoom.out();
 this.shared.hideBar=1;
 this.hideBackIcon=1;
}



isLoading;
  async present() {
    this.isLoading = true;
    return await this.loadingController.create({
      cssClass: 'transparent',
      backdropDismiss: true,
    }).then(a => {
      a.present().then(() => {
        console.log('presented');
        if (!this.isLoading) {
          a.dismiss();
        }
      });
    });
  }

  async dismiss() {
    this.isLoading = false;
    return await this.loadingController.dismiss();
  }

}
