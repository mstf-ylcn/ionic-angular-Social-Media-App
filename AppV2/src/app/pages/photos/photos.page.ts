import { Component, ElementRef, ViewChild ,AfterViewInit, AfterViewChecked } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import { IonContent, ModalController, ToastController } from '@ionic/angular';
import {ModalPhotosComponent} from '../modal-photos/modal-photos.component'
import {Shared} from '../Shared';
import {Api} from '../Api';
import {ModalService} from '../ModalService';
import {GestureController} from '@ionic/angular';
// import {Gesture,GestureConfig} from '@ionic/core';
import { LoadingController } from '@ionic/angular';
import { AngularFirestore } from '@angular/fire/firestore';
import firebase from 'firebase/app';
import { Injectable } from '@angular/core';


declare var Masonry,imagesLoaded: any; 
@Component({
  selector: 'app-photos',
  templateUrl: './photos.page.html',
  styleUrls: ['./photos.page.scss'],
})
@Injectable({ providedIn: 'root' })
export class PhotosPage implements AfterViewInit,AfterViewChecked {
  @ViewChild('grid')
  grid:ElementRef  
  @ViewChild('close')
  close:ElementRef
  @ViewChild(IonContent) content: IonContent;
  @ViewChild('device_height',{read: ElementRef})device_height:ElementRef


    


constructor(
  private router:Router,
  private http:HttpClient,
  private modalctrl:ModalController,
  private shared:Shared,
  private gestureCtrl:GestureController,
  private api:Api,
  private modal:ModalService,
  public loadingController: LoadingController,
  private afs:AngularFirestore,
  private toastController:ToastController
  ) 
  {
    this.modal_css=this.shared.modal_css;
  }
  hide2=1;

  ngAfterViewChecked() //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  {
    if(this.shared.photosToTap==1)
    {
      this.ToTap();
      this.shared.photosToTap=0;
    }
  }
  ionViewDidEnter()
  {
    
    // // When the Searchbar is clicked, the masonry layout breaks down. 
    // If I make the images none, it gets fixed. But when I go back to the page again,
    //  it throws them to the top of the page. I took the height of the page and
    //   directed it to that point.
   
    console.log("enter yukseklijk:"+this.shared.photosY);
    this.content.scrollToPoint(0,this.shared.photosY,100);
    this.a=0;
    this.hide2=1;
   console.log("did:"+Math.floor(this.y));
   this.present();
   setTimeout(() => {
    this.gesture();
     
   }, 100);
   
  }

  ionViewDidLeave()
  {
   this.hide2=0;
  }



 like=[];
images=[];
modal_css:string="modal";


 yAxisElevation;
 yAxisControl=0;
 cc=0;


async openDynamicModal(id) {
  this.shared.photo_id=id;
  const modal = await this.modalctrl.create({
    component: ModalPhotosComponent,
    cssClass: 'modal_photo_class'
  });

  modal.onDidDismiss().then((data) => {
    this.modal_css = data['data'];
});
return await modal.present();

}



resize()
{
  console.log("resize");
  if(this.images.length==this.a+1)
  {
    setTimeout(() => {
      var elem = document.querySelector('.grid');
      var msnry = new Masonry(elem, {
      // options
      itemSelector: '.grid-item',
      fitWidth: true 
      });
      }, 50);

    // this.loadingController.dismiss();
    this.dismiss();
    this.photoHide="tut2";
  }
  this.a++;


}
page=0;
loadimage(event?)
{
  this.http.get(`${this.api.url}photos/random?client_id=${this.api.key}&count=${this.api.count}&page=${this.page}
   `).subscribe(res => {
    console.log(res);
    this.images=this.images.concat(res);
  if(event)
  {
    event.target.complete();
  }

  },(error:any)=>{
   console.log("Error===",error);
  })
}

xx=0;

async gesture()
{
  let gesture= await this.gestureCtrl.create({
    el:this.close.nativeElement,
    gestureName:'closemodal',
    gesturePriority:0,
    threshold:1,
    passive:false,
    direction:'y',
    
    onStart:()=>{
      console.log("start");

    },
    onMove:(ev)=>{
      // console.log(ev.startX);
      // console.log(ev.currentX);
     console.log("going");
    },

    onEnd:(ev)=>{
      this.modal_css="modal";
    //  console.log(ev);
      if((ev.startX+50)<+ev.currentX)
      {
       this.xx=1;
      }
 
  if(this.press==1 && this.xx==1)
  {
    console.log("if");
    this.modalctrl.dismiss();
    this.modal_css="modal";
    this.press=0;
    this.refresh_control="false";
    this.cc=0;
    this.xx=0;
    this.yAxisControl=0;
    this.shared.PhotosModalisClick=1;
     this.router.navigate(['tabs/fullModal']);
    // this.modal.openFUllModal(this.shared.photo_id);

  }    
  else if(this.press==1)
  {
    console.log("else");
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
 this.loadimage();
  }


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
    if(Math.abs((this.yAxisElevation)+50)<Math.abs(ev.deltaY))
   {
    this.cc=1;
    this.yAxisElevation=0;
   }
  }
 }, 100);
}



 refresh_control="false";
 press=0;
 
modal_active(id)//press
{

    this.press=1;

this.refresh_control="true";
if(this.shared.pasive==0)
{
  this.shared.photo_id=id;

  console.log("dynamic modal open");
  // this.modal.openDynamicModal(id);
  this.openDynamicModal(this.shared.photo_id);
  this.modal_css="modal_blur";
}

}

modal_pasive(){
  console.log("press:"+this.press)
  console.log("cc"+this.cc)

  if(this.press==1 && this.cc==0)
  {
  console.log("pasive");
   console.log("pasive status:"+this.shared.pasive)
   this.refresh_control="false";
   this.press=0;
   this.modalctrl.dismiss();
   this.modal_css="modal";
  
 }
 else if(this.press==1 && this.cc==1)
 {
  this.modalctrl.dismiss();
  this.cc=0;
  this.press=0;
  this.refresh_control="false";
  this.modal_css="modal";
  this.shared.PhotosModalisClick=1;
  this.router.navigate(['tabs/fullModal']);
  // this.modal.openFUllModal(this.shared.photo_id);
 }
}



    //infinite scrool
   loadData(event) {
     setTimeout(() => {
       console.log('Loading more image');
       this.page++;
        this.loadimage(event);
       this.ngAfterViewInit();

       event.target.complete();
     }, 500);
   }
 


   //refresh
   doRefresh(event?) {
     console.log('Refresh start');
     event.target.disabled = true;

     this.images=[];
     this.a=0;
     this.page=0;
     this.present();
     this.loadimage();
     this.ngAfterViewInit();
     setTimeout(() => {
       console.log('Refresh end');
       event.target.disabled = false;
     event.target.complete();
     }, 1000);
   }
 
   likePhoto =  { photoUrl:'', pp:'',name:'',share:'',userUrl:''};
   
  click_counter:number = 0;
  double_click(id){ 
       this.click_counter++;
            setTimeout(() => {
       if (this.click_counter == 1) {
     this.click_counter = 0;
  this.shared.PhotosModalisClick=1;
  this.shared.photo_id=id;
  this.router.navigate(['tabs/fullModal']);
  // this.modal.openDynamicModal(id);
    // this.modal.openFUllModal(id);
    //  this.modal_css="modal_blur";
     console.log("click");
     console.log(id);


  
   }
   if(this.click_counter > 1){ 
     this.click_counter = 0;
     this.likePhoto={photoUrl:id.urls.small,pp:id.user.profile_image.small,name:id.user.username,share:id.links.html,userUrl:id.user.links.html};

     this.afs.collection('user').doc(this.shared.uid).update({
      'Like':firebase.firestore.FieldValue.arrayUnion(this.likePhoto)
    })
     
   this.presentToast();
   
   }
 }, 250);
  //300 ypa ?
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
y=0;
Scrolling(event){
  this.shared.photosY=Math.floor(event.detail.scrollTop);

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
  //  document.querySelector('ion-content').scrollToTop(500);
   this.content.scrollToPoint(0,0,500);
}



searchHide=0;

searchCancel()
{
  console.log("search cancel");
  this.searchHide=0;

}
searchFocus()
{
  console.log("search focus");
  this.searchHide=1;
  
}
cancelFocus()
{
  console.log("search focus cancel");
  this.searchHide=0;

}
a=0;
photoHide="tut";
  async test()
  {
    if(this.images.length==this.a+1)
    {
      // this.loadingController.dismiss();
      this.photoHide="tut2";
    }
    this.a++;
  }

  git()
  {
    this.shared.PhotosModalisClick=1;
    this.router.navigate(['tabs/fullModal']);
  }

  isLoading;
  async present() {
    this.isLoading = true;
    return await this.loadingController.create({
      cssClass: 'transparent',
      backdropDismiss: true,
    }).then(a => {
      a.present().then(() => {
        if (!this.isLoading) {
          a.dismiss().then();
        }
      });
    });
  }

  async dismiss() {
    this.isLoading = false;
    return await this.loadingController.dismiss().then();
  }


}
