import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController,GestureController, IonContent, IonSlides, LoadingController, ModalController, ToastController } from '@ionic/angular';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { Api } from '../Api';
import { Shared } from '../Shared';
import {ModalPhotosComponent} from '../modal-photos/modal-photos.component';
import { AngularFirestore } from '@angular/fire/firestore';
import firebase from 'firebase/app';
declare var Masonry: any;

@Component({
  selector: 'app-modal-search',
  templateUrl: './modal-search.page.html',
  styleUrls: ['./modal-search.page.scss'],
})

export class ModalSearchPage implements OnInit {
  @ViewChild(IonContent) content: IonContent;
  @ViewChild('grid3') grid3:ElementRef ;
  @ViewChild('device_height',{read: ElementRef})device_height:ElementRef;



  constructor(private shared:Shared,
    private router:Router,
    private http:HttpClient,
    private api:Api,
    private modalctrl:ModalController,
    private socialSharing: SocialSharing,
    private gestureCtrl:GestureController,
     public alertController: AlertController,
    private loadingController:LoadingController,
    private afs:AngularFirestore,
    private toastController:ToastController) {

  }

  ngOnInit() {
  //  this.searchImagesApi();
  }

  async openDynamicModal(id) {
    this.shared.photo_id=id;
     const modal = await this.modalctrl.create({
       component: ModalPhotosComponent,
       cssClass: 'modal_photo_class'
     });
     modal.onDidDismiss()
     .then((data:any) => {
        this.shared.searchModalcss = data['data'];
   });

     return await modal.present();

   }


  tempAccountArray=[];
  cancelButton="focus";
  tempWord="";
  word='';
  searchPhotos()
  {
   this.tempWord=this.shared.searchWord.toLocaleLowerCase();
    this.word=this.shared.searchWord;
    if(this.shared.searchWord[0]!='@' && this.shared.searchWord!="")
    {

      for (let index = 0; index < this.tempWord.length; index++)
      {
      this.tempWord=this.tempWord.replace(" ",",");
      }
    // this.router.navigateByUrl('tabs/searchModal')
      console.log(this.tempWord);
      this.present();
      this.shared.searchWord=this.tempWord;
      this.images=[];
      this.page=0;
      this.loadCounter=0;
      // this.searchSave();!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
      this.searchImagesApi();
      }
    }

  //   searchSave()//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  //   {
  //     this.afs.collection('search').doc(this.shared.userArray.userName+'.'+this.shared.userArray.userId).update({
  //       'searchWord':firebase.firestore.FieldValue.arrayUnion(this.shared.searchWord),
  //     }).then((suc)=>{

  //     }).catch((err)=>{
  //       if(err.message=="Requested entity was not found.")
  //       {
  //       this.afs.collection('search').doc(this.shared.userArray.userName+'.'+this.shared.userArray.userId).set({
  //         'searchWord':firebase.firestore.FieldValue.arrayUnion(this.shared.searchWord),
  //       })
  //      }
  //     })
  // }

//   searchAccount(event)
//   {
//   this.tempAccountArray=[];
//    if(event.detail.value[0]=='@' && event.detail.value[1]!=null)
//    {
//   console.log(event.target.value);

//   this.tempAccountArray=this.arraySearch;
//    const a =event.target.value;
//    if(a && a.trim() !='')
//    {
//    this.tempAccountArray=this.tempAccountArray.filter((item)=>{
//      if((item.toLocaleLowerCase().indexOf(a.toLocaleLowerCase())>-1))
//      {
//        return true ;
//      }
//      return false;
//      })
//    }

//    }
//  }

//  Account(profile)
//  {
//    console.log(profile);

//    this.router.navigateByUrl('tabs/profileModal');
//  }

   searchCancel()
 {
   this.cancelButton="focus";

   this.shared.hideBar=1;
   //---------------------
   this.router.navigateByUrl('/tabs/search');
 }
 searchFocus()
 {
   this.cancelButton="always";
   this.shared.hideBar=0;
 }
 cancelFocus()
 {

   this.shared.hideBar=1;
 }

photo=1;
images=[];
page=1;
maxPage;
similarWord:String;
 searchImagesApi()
 {
   console.log("api page:"+this.page)
   this.http.get(`${this.api.url}search/photos/?client_id=${this.api.key}&query=${this.shared.searchWord}&per_page=${this.api.count}&page=${this.page}`)
    .subscribe(res => {
      console.log(res);
    if(res)
    {
     this.photo=1;
      this.maxPage=res['total_pages'];
      this.images=this.images.concat(res['results']);
      console.log(this.images);
  if(this.images.length==0)
  {
    console.log("no result");
    this.photo=0;
    this.dismiss();
  }

    }
    },(error:any)=>{
     console.log("Error===",error);


    })
 }

// imagesLib=[];
// positionY=[];
// images2=[];
page2=0;
//  searchImagesApi2()
//  {


//    console.log("api page:"+this.page)
//    this.http.get(`${this.api.url}photos/random?client_id=${this.api.key}&count=${this.api.count}`)
//     .subscribe(res => {
//       console.log(res);
//     if(res)
//     {
//       this.maxPage=res['total_pages'];
//       this.images2=this.images2.concat(res);
//       this.imagesLib.push(this.images2);
//       this.images2=[];

//   if(this.images.length==0)
//   {
//     this.dismiss();
//   }

//     }
//     },(error:any)=>{
//      console.log("Error===",error);


//     })
//  }


 loadCounter=0;
 photoHide="loading"
 resize()
{

 if(this.images.length==this.loadCounter+1)
 {
   setTimeout(() => {
     var elem = document.querySelector('.grid3');
     var msnry = new Masonry(elem, {

     itemSelector: '.grid-item3',
     fitWidth: true
     });
     }, 50);

   // this.loadingController.dismiss();
   console.log("loading done")
   this.photoHide="loaded";
   this.dismiss();
 }
 if(this.images.length/2==this.loadCounter)
 {
  //  this.dismiss();
 }
 this.loadCounter++;
}


resize2()
{

 if(this.images.length==this.loadCounter+1)
 {

   // this.loadingController.dismiss();
   console.log("loading done")
   this.photoHide="loaded";
   this.dismiss();
 }
 this.dismiss();
 this.loadCounter++;
}



// resize2()
// {

//  if(this.images.length==this.loadCounter+1)
//  {
//    setTimeout(() => {
//      var elem = document.querySelector('.grid7');
//      var msnry = new Masonry(elem, {
//      // options
//      itemSelector: '.grid-item7',
//      fitWidth: true
//      });
//      }, 50);

//    // this.loadingController.dismiss();
//    console.log("loading done")
//    this.photoHide="loaded";
//    this.dismiss();
//  }
//  if(this.images.length/2==this.loadCounter)
//  {
//   //  this.dismiss();
//  }
//  this.loadCounter++;
// }



hidePage=1;
hide2=1;
te=1;
ionViewDidEnter()
{
  this.hidePage=1;
  this.loadCounter=0;
  this.gesture();
  this.shared.hideBar=1;
  this.shared.isSearchPhoto=1;

  // this.hide2=1;
  this.present();
  console.log(this.shared.SearchModalisClose);
   if(this.shared.searchEnterCounter==0)
   {
    this.shared.SearchModalisClose=0;
     this.searchImagesApi();
     this.word=this.shared.searchWord;
    //  this.searchSave();!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    //  this.photoid=this.shared.photo_id;
    //  this.mainImages.push(this.photoid);
    // console.log(this.shared.photo_id);
   }
   this.content.scrollToPoint(0,this.scrool,100);
  this.shared.searchEnterCounter++;
}

ionViewDidLeave()
{
  // this.hide2=0;
  this.hidePage=0;
  if(this.shared.SearchModalisClose==1)
  {
  this.shared.SearchModalisClose=0;
  this.shared.SearchModalisClick=0;
  this.images=[];
  this.page=1;
  this.loadCounter=0;
  // this.imagesLib.length=0;
  this.ToTap();
  }
  // this.shared.SearchModalisClose++;
}

loadData(event) {
  setTimeout(() => {
    event.target.disabled = false;

    this.page=this.page+1;
    console.log("page:"+this.page);
    this.searchImagesApi();
    event.target.complete();
    if (this.page == this.maxPage) {
       event.target.disabled = true;
     }
  }, 500);
}


ToTap(){
  console.log("to tap");
  this.content.scrollToPoint(0,0);
}

ToTap2()
{
  console.log("To tap2:"+this.scrool);
  this.content.scrollToPoint(0,this.scrool,100);
}

ToTap3()
{
  this.content.scrollToPoint(0,0,500);
}


hide=1;
counter=0;
scrool_height;
// scroolY=[];
// scroolYY=0;
scrool=0;

Scrolling(event){

  if(this.scroolYcount==1)
  {
    // console.log(event.detail.scrollTop);
  //  this.scroolYY=Math.floor(event.detail.scrollTop);

  }
  else
  {
    this.scrool=Math.floor(event.detail.scrollTop);
  }




  if(this.counter==0)
  {
   this.scrool_height=event.detail.scrollTop;
  }
  if(Math.abs(this.scrool_height+20)>=Math.abs(event.detail.scrollTop))
  {
   setTimeout(() => {
    this.shared.hideBar=1;
   this.hide=1;

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
ScrollEnd(event){
    this.counter=0;
  // console.log("scrool end");
}



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
  console.log("mainImages.length"+this.mainImages.length);
    this.hideBackIcon=1;
    if(this.mainImages.length==1)
    {
      console.log("swipe if");
      this.present();
      this.ToTap2();
     
      this.loadCounter=0;
      this.hide2=1;
      this.mainImages.length=0;
      this.scroolYcount=0;
      this.hidecontrol=0;
      // this.ToTap3();
      // this.imagesLib.length=0;
      // this.images2.length=0;
      // this.scroolY.length=1;
      // this.router.navigate(['tabs/search']);
      this.shared.enterCounter=0;

    }
    else
    {
      console.log("swipe else");
      this.loadCounter=0;
      this.images=[];
      this.shared.searchEnterCounter=0;
      this.page=0;
        this.shared.SearchModalisClick=0;
       this.router.navigate(['tabs/search']);

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

      // this.ToTap2();
      // this.present();
      // this.imagesLib.length--;
      // this.mainImages.length--;
      // this.scroolY.length--;

      // console.log(this.imagesLib);

    }
}

// }
//    ionViewDidLeave()
// {

//   if(this.shared.PhotosModalisClose==1)
//   {
//   console.log("did leave")
//   this.shared.PhotosModalisClose=0;
//   this.shared.PhotosModalisClick=0;
//   this.images=[];
//   this.loadCounter=0;
//   // this.imagesLib.length=0;-----------------
//   this.ToTap();
//  // window.location.reload();

//   }
// }


hidecontrol=0;
tut=1;

likes(url)
{
  this.likePhoto={photoUrl:url.urls.small,pp:url.user.profile_image.small,name:url.user.username,share:url.links.html,userUrl:url.user.links.html};

     this.afs.collection('user').doc(this.shared.uid).update({
      'Like':firebase.firestore.FieldValue.arrayUnion(this.likePhoto)
    })
    this.hidecontrol=1;
}

unlike(url)
{
 this.likePhoto={photoUrl:url.urls.small,pp:url.user.profile_image.small,name:url.user.username,share:url.links.html,userUrl:url.user.links.html};

 this.afs.collection('user').doc(this.shared.uid).update({
  'Like':firebase.firestore.FieldValue.arrayRemove(this.likePhoto)

})
this.hidecontrol=0;
//     this.afs.collection('user').doc(data.user.uid).update({
//       'Like' : firebase.firestore.FieldValue.arrayRemove(
// '1'//aranan string eleman
//       )
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
if(Math.abs(this.yAxisElevation)+25<Math.abs(ev.deltaY))
{
this.cc=1;
this.yAxisElevation=0;
}
}
}, 100);
}

interval_counter=0;
xx=0;

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
      this.shared.searchModalcss="modal";

      if((ev.startX+30)<ev.currentX)
      {
       this.xx=1;
      }
  if(this.press==1 && this.xx==1)
  {
    console.log("modal will open");
    this.modalctrl.dismiss();
    this.present();
    this.shared.searchModalcss="modal";
    this.press=0;
    this.refresh_control="false";
    this.cc=0;
    this.xx=0;
    this.yAxisControl=0;
   //  this.openFUllModal(this.shared.photo_id);
  //  this.images=[];
   this.loadCounter=0;


   this.mainImages.push(this.photoId);
   this.hide2=0;
   this.page2=0;
   this.scroolYcount=1;
   this.ToTap();
   for (let index = 0; index < this.shared.userArray.Like.length; index++) {
    if(this.photoId.urls.small==this.shared.userArray.Like[index].photoUrl) 
    {
       this.hidecontrol=1;
       break;
    } 
  }


   
    //  this.loadimage();--------------

  }
       else if(this.press==1)
     {
       this.modalctrl.dismiss();
      this.shared.searchModalcss="modal";
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
  this.gesture();
this.resize();

}

refresh_control="false";
press=0;
photoId;

modal_active(id)//press
{
this.photoId=id;
this.press=1;

this.refresh_control="true";
if(this.shared.pasive==0)
{
console.log("dynamic modal open");
// this.photoid=id;--------------------
this.openDynamicModal(id);
this.shared.searchModalcss="modal_blur";
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
this.shared.searchModalcss="modal";

}
// else if(this.press==1 && this.cc==1)
else if(this.press==1 && this.cc==1)
{
this.modalctrl.dismiss();
this.cc=0;
this.press=0;
this.refresh_control="false";
this.shared.searchModalcss="modal";
//  this.openFUllModal(this.shared.photo_id);
// this.images=[];------------------------------------
this.loadCounter=0;
// this.mainImages.push(this.photoid);--------------------
// this.loadimage();--------------------------
this.present();
this.mainImages.push(this.photoId);
this.hide2=0;
this.page2=0;
this.scroolYcount=1;
this.ToTap();
for (let index = 0; index < this.shared.userArray.Like.length; index++) {
  if(this.photoId.urls.small==this.shared.userArray.Like[index].photoUrl) 
  {
     this.hidecontrol=1;
     break;
  } 
}
console.log("else if full will open");
}
}






likePhoto =  { photoUrl:'', pp:'',name:'',share:'',userUrl:''};

click_counter:number = 0;
scroolYcount=0;
double_click(id){
   this.click_counter++;
        setTimeout(() => {
   if (this.click_counter == 1) {
 this.click_counter = 0;
//  this.similarWord=id.alt_description;
//  this.similarWord= this.similarWord.split(' ').slice(0,4).join(',');
// console.log(this.similarWord);
// this.scroolY.push(this.scroolYY);

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

this.present();
this.mainImages.push(id);



this.hide2=0;
this.page2=0;
this.loadCounter=0;
 this.scroolYcount=1;
this.ToTap();

// this.searchImagesApi2();

//  this.openDynamicModal(id);
//  this.openFUllModal(id);
// this.images=[];
// this.ToTap();
//-----------------------------------------------------------------------------------------------------


  // this.shared.searchModalcss="modal_blur";
 console.log("full modal click");
 console.log(id);

}
//double click icin
if(this.click_counter > 1){
 this.click_counter = 0;
 this.likePhoto={photoUrl:id.urls.small,pp:id.user.profile_image.small,name:id.user.username,share:id.links.html,userUrl:id.user.links.html};

 this.afs.collection('user').doc(this.shared.uid).update({
  'Like':firebase.firestore.FieldValue.arrayUnion(this.likePhoto)//array e ekleme
})
 
this.presentToast();


}
}, 250);
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


isLoading;
async present() {
  this.isLoading = true;
  return await this.loadingController.create({
    cssClass: 'transparent',
    backdropDismiss:true,
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


async presentLoading() {
  const loading = await this.loadingController.create({
    cssClass: 'transparent',
    duration: 100
  });
  await loading.present();

}

}
