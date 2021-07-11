import { AfterViewChecked, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AlertController, GestureController, IonContent, IonSlides, LoadingController, MenuController, ModalController, NavController, ToastController } from '@ionic/angular';
import {Router} from '@angular/router';
import {ModalPhotosComponent} from '../modal-photos/modal-photos.component'
import { Shared } from '../Shared';
import { Api } from '../Api';
import { HttpClient } from '@angular/common/http';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { AngularFirestore } from '@angular/fire/firestore';
import firebase from 'firebase/app';
declare var Masonry: any; 
@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit,AfterViewChecked {
  @ViewChild(IonContent) content: IonContent;
  @ViewChild('device_height',{read: ElementRef})device_height:ElementRef;

  constructor(private modalctrl:ModalController,
    private navctrl:NavController,
    private router:Router,
    public shared:Shared,
    private api:Api,
    private http:HttpClient,
    private menu:MenuController,
    private loadingController:LoadingController,
    private socialSharing:SocialSharing,
    private alertController:AlertController,
    private toastController:ToastController,
    private afs:AngularFirestore,
    private gestureCtrl:GestureController) { 
      for (let index = 0; index < this.shared.userArray.Like.length; index++) {
         console.log(this.shared.userArray.Like[index].photoUrl);
        
      }
    }

     
modal_css="modal";
pageHide=0;    
hide2=1;
photo=1;

ngAfterViewChecked() //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
{
  if(this.shared.profileToTap==1)
  {
    this.ToTap3();
    this.shared.profileToTap=0;
  }
}
  ionViewDidEnter()
  {
    console.log("enter");
    this.pageHide=1;

    if(this.shared.ProfileModalisClick==1)
    {
    this.shared.profilHide2=0;
    }
    else
    {
   this.shared.profilHide2=1;
    }
    // this.hide2=1;
    console.log(this.menu.isEnabled());
   this.menu.enable(true);
   this.shared.loadCounter=0;
   this.resize();
   this.shared.hideBar=1;
   this.content.scrollToPoint(0,this.scrool,100);
  
  //  this.hide2=1;
   if(this.shared.userArray.Like.length!=0)
   {
     this.shared.loadCounter=0;

    this.present();
    this.photo=1;
    console.log("if");

   }
   else
   {
    console.log("else");
    this.photo=0;
    this.present2();
   }
  }
  ionViewDidLeave()
  {
    // var a =  this.menu.isEnabled();
    console.log()
    console.log("leave");
  this.shared.profilHide2=0;
  this.pageHide=0;
  this.menu.enable(false);
  }

 

  clickPhoto=[];
  click=0;
  sayac:number = 0;
  double_click(index){ 
       this.sayac++;
            setTimeout(() => {
                if (this.sayac == 1) {
     this.sayac = 0;

    this.shared.likePhotoClick=1;
    this.shared.profilHide2=0;
    this.present();
    this.click=1;
  //  console.log(this.shared.userArray.Like[index]);
  this.clickPhoto=this.shared.userArray.Like[index];
  this.shared.ProfileModalisClick=1;
  
   }
   if(this.sayac > 1){ 
     this.sayac = 0;

   
   }
 }, 400);
 
 }
 back(){
   this.navctrl.back();
   this.modalctrl.dismiss();
 }



   loadData(event) {
    setTimeout(() => {
      
      event.target.complete();
    }, 500);
  }


  //refresh
  // doRefresh(event) {
  //   setTimeout(() => {
      
  //     event.target.complete();
  //   }, 1000);
  // }

  // git()
  // {
  //   this.shared.ProfileModalisClick=1;
  //   this.router.navigate(['/tabs/profileModal'])
  // }

  ngOnInit() {
  }
  loadCounter=0;
  photoHide="loading"


  resize()
{
  if(this.shared.userArray.Like.length==this.shared.loadCounter+1)
  {
    setTimeout(() => {
      var elem = document.querySelector('.grid6');
      var msnry = new Masonry(elem, {
      itemSelector: '.grid-item6',
      // fitWidth: true 
      });
      }, 50);

    // this.loadingController.dismiss();
    console.log("yukleme bitti")
    this.photoHide="loaded";
    this.dismiss();
  }

  this.shared.loadCounter++;
}

mainImages;
resize2()
{

 this.dismiss();
//  this.loadCounter++;
}

hideBackIcon=1;
hideBackButton()
{
  this.hideBackIcon=0;
  console.log("hide 0")
}

hideBackButtonEnd()
{
  console.log("hide 1")

  this.hideBackIcon=1;
}

SwipeToClose(){
  this.hideBackIcon=1;

  if(this.click==1)
  {
  console.log("swipe");
  this.shared.profilHide2=1;
  this.click=0;
  this.hidecontrol=0;
  this.shared.hideBar=1;
  this.shared.loadCounter=0;
  this.shared.ProfileModalisClick=0;
  this.present();
  }
  if(this.shared.userArray.Like.length==0)
  {
    this.shared.profilHide2=1;
    this.photo=0;
    this.dismiss();
  }

}

open()
{
 this.menu.open('first');
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
  async present2() {
    const loading = await this.loadingController.create({
      duration: 500,
      cssClass: 'transparent',
      backdropDismiss: true
    });
    await loading.present();
}




  async dismiss() {
    this.isLoading = false;
    return await this.loadingController.dismiss();
  }

  sliderOpts={
    zoom:{
      maxRation:2,
      maxRatio:5//sonradan bak ????
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
  searchPhotos()
  {
   this.tempWord=this.shared.searchWord.toLocaleLowerCase();

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
      this.shared.loadCounter=0;
      this.searchImagesApi();
      }
    }


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

      console.log("if");
      this.maxPage=res['total_pages'];
      this.images=this.images.concat(res['results']);
      console.log("test");
      console.log(this.images);

  if(this.images.length==0)
  {
    console.log("no result");
    this.dismiss();
  }

    }
    },(error:any)=>{
     console.log("Error===",error);


    })
 }


page2=0;


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

scrool=0;

Scrolling(event){

  if(this.click=0)
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





hidecontrol=0;
tut=1;
likePhoto;

likes(url)
{
  // this.likePhoto={photoUrl:url.urls.small,pp:url.user.profile_image.small,name:url.user.username,share:url.links.html,userUrl:url.user.links.html};

     this.afs.collection('user').doc(this.shared.uid).update({
      'Like':firebase.firestore.FieldValue.arrayUnion(this.clickPhoto)
    })
    this.hidecontrol=0;
}

unlike(url)
{
//  this.likePhoto={photoUrl:url.urls.small,pp:url.user.profile_image.small,name:url.user.username,share:url.links.html,userUrl:url.user.links.html};

 this.afs.collection('user').doc(this.shared.uid).update({
  'Like':firebase.firestore.FieldValue.arrayRemove(this.clickPhoto)

})
this.hidecontrol=1;
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

async presentLoading() {
  const loading = await this.loadingController.create({
    cssClass: 'transparent',
    duration: 100
  });
  await loading.present();

}


}
