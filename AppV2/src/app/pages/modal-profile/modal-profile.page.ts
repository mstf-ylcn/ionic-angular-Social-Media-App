import { Component, OnInit, ViewChild } from '@angular/core';
import { AlertController, IonContent, IonSlides, LoadingController, ModalController, NavController, ToastController } from '@ionic/angular';
import { Shared } from '../Shared';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { AngularFirestore } from '@angular/fire/firestore';
import firebase from 'firebase/app';
import { Router } from '@angular/router';
declare var Masonry: any; 

@Component({
  selector: 'app-modal-profile',
  templateUrl: './modal-profile.page.html',
  styleUrls: ['./modal-profile.page.scss'],
})
export class ModalProfilePage implements OnInit {
  @ViewChild(IonContent) content: IonContent;

  constructor(
    private nav:NavController,
    public shared:Shared,
    private loadingController:LoadingController,
    private modalctrl:ModalController,
    private toastController:ToastController,
    private afs:AngularFirestore,
    private socialSharing:SocialSharing,
    private alertController:AlertController,
    private router:Router) { }

  ngOnInit() {
  }




modal_css="modal";
    
hide2=1;


  loadCounter=0;
  photoHide="loading"

photo=1;
pageHide=0;    
  ionViewDidEnter()
  {
  this.pageHide=1;
  this.loadCounter=0;
  this.shared.hideBar=1;
  this.shared.isSearchUser=1;
  this.content.scrollToPoint(0,this.scrool,100);

  //  this.hide2=1;
   if(this.shared.searchUserArray.Like.length!=0)
   {
     this.photo=1;
    this.present();
   }
   else
   {
  this.photo=0;
    this.present2();
   }
  }
  ionViewDidLeave()
  {
    this.pageHide=0;
  }

    clickPhoto:any;
    click=0;
    sayac:number = 0;
    double_click(index){ 
         this.sayac++;
              setTimeout(() => {
                  if (this.sayac == 1) {
       this.sayac = 0;
  
      this.hide2=0;
      this.present();
      this.click=1;
    //  console.log(this.shared.userArray.Like[index]);
    this.clickPhoto=this.shared.searchUserArray.Like[index];

      for (let index = 0; index < this.shared.userArray.Like.length; index++) {
        if(this.clickPhoto.photoUrl==this.shared.userArray.Like[index].photoUrl) 
        {
    
           this.hidecontrol=1;
           break;
        } 
    }
    
     }
     if(this.sayac > 1){ 
       this.sayac = 0;
      console.log(this.shared.searchUserArray.Like[index]);
      this.likePhoto={photoUrl:this.shared.searchUserArray.Like[index].photoUrl,pp:this.shared.searchUserArray.Like[index].pp,name:this.shared.searchUserArray.Like[index].name,share:this.shared.searchUserArray.Like[index].share,userUrl:this.shared.searchUserArray.Like[index].userUrl};
      this.afs.collection('user').doc(this.shared.uid).update({
       'Like':firebase.firestore.FieldValue.arrayUnion(this.likePhoto)
     }).then(()=>{
      this.presentToast();
     }).catch(err=>{

     })
     }
   }, 400);
   
   }
 
    resize()
  {
    if(this.shared.searchUserArray.Like.length==this.loadCounter+1)
    {
      setTimeout(() => {
        var elem = document.querySelector('.grid7');
        var msnry = new Masonry(elem, {
        // options
        itemSelector: '.grid-item7',
        // fitWidth: true 
        });
        }, 50);
  
      // this.loadingController.dismiss();
      console.log("yukleme bitti")
      this.photoHide="loaded";
      this.dismiss();
    }
  
    this.loadCounter++;
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
  }

  hideBackButtonEnd()
  {
    this.hideBackIcon=1;
  }
  
  SwipeToClose(){
    this.hideBackIcon=1;
    if(this.click==1)
    {
    console.log("swipe");
    this.hide2=1;
    this.click=0;
    this.hidecontrol=0;
    this.shared.hideBar=1;
    this.present();
    this.loadCounter=0;
  }
  else
  {
    this.hide2=1;
    this.click=0;
    this.hidecontrol=0;
    this.shared.hideBar=1;
    this.loadCounter=0;
    this.shared.isSearchUser=0;
    this.router.navigateByUrl('/tabs/search');
  }
  }

  back()
  {
    this.hide2=1;
    this.click=0;
    this.hidecontrol=0;
    this.shared.hideBar=1;
    this.loadCounter=0;
    this.shared.isSearchUser=0;
    this.router.navigateByUrl('/tabs/search');
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
            a.dismiss().then(() => console.log('abort presenting'));
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
      return await this.loadingController.dismiss().then(() => console.log('dismissed'));
    }
  
    sliderOpts={
      zoom:{
        maxRation:2,
        maxRatio:5//??
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
  

    cancelButton="focus";


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
      this.hidecontrol=1;
  }
  
  unlike(url)
  {
  //  this.likePhoto={photoUrl:url.urls.small,pp:url.user.profile_image.small,name:url.user.username,share:url.links.html,userUrl:url.user.links.html};
  
   this.afs.collection('user').doc(this.shared.uid).update({
    'Like':firebase.firestore.FieldValue.arrayRemove(this.clickPhoto)
  
  })
  this.hidecontrol=0;
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
