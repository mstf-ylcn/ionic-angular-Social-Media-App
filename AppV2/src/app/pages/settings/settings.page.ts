import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, LoadingController, ModalController, ToastController } from '@ionic/angular';
import { Shared } from '../Shared';
import {CameraModalPage}from '../camera-modal/camera-modal.page'
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage, createUploadTask } from '@angular/fire/storage';
import firebase from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {

  constructor
  (private modalCtrl:ModalController,
    private shared:Shared,
    private router:Router,
    private afs:AngularFirestore,
    private storage:AngularFireStorage,
    private toastController:ToastController,
    private loadingController:LoadingController,
    private alertController:AlertController,
    private afAuth:AngularFireAuth) { }

  ngOnInit() {
    this.validator();
    this.validator2();
    // this.validator3();
    this.form.setValue({
      userName:this.shared.userArray.userName.replace('@',''),
      name:this.shared.userArray.name,
      lastName:this.shared.userArray.lastName
    });

    // this.form.controls.userName.setValue(this.shared.userArray.userName);
    // this.form.controls.name.setValue(this.shared.userArray.name);
    // this.form.controls.lastName.setValue(this.shared.userArray.lastName);
  }

  a:String;

  form : FormGroup;
  data:any;

  validator(){
 
    this.form = new FormGroup({
      userName: new FormControl(null,{validators:[Validators.required,Validators.minLength(5),Validators.pattern('^(?=[a-zA-Z0-9._]{5,20}$)(?!.*[_.]{2})[^_.].*[^_.]$')]}),
      name: new FormControl(null,{validators:[Validators.required,Validators.minLength(2),Validators.pattern('[a-zA-Z şŞ iİ]*')]}),
      lastName: new FormControl(null,{validators:[Validators.required,Validators.minLength(2),Validators.pattern('[a-zA-Z şŞ iİ]*')]}),

      // // password2: new FormControl(null,{validators:[Validators.required,Validators.minLength(8),]}),
      // // tel: new FormControl(null,{validators:[Validators.required,Validators.minLength(10),Validators.pattern('[0-9]*')]}),
    });
  }
  
  ionViewDidEnter()
  {
    this.form.setValue({
      userName:this.shared.userArray.userName.replace('@',''),
      name:this.shared.userArray.name,
      lastName:this.shared.userArray.lastName
    }); 

    this.form2.setValue({
      email:this.shared.userArray.userMail,
    }); 
  }


  form2 : FormGroup;
  validator2(){
    this.form2 = new FormGroup({
      //  password1: new FormControl(null,{validators:[Validators.required,Validators.minLength(6)]}),
       email: new FormControl(null,{validators:[Validators.required,Validators.pattern("[A-Za-z0-9._%+-]{3,}@[a-zA-Z]{3,}([.]{1}[a-zA-Z]{2,}|[.]{1}[a-zA-Z]{2,}[.]{1}[a-zA-Z]{2,})")]}),
    });
  }


  // form3 : FormGroup;
  // validator3(){
  //   this.form3 = new FormGroup({
  //     password2: new FormControl(null,{validators:[Validators.required,Validators.minLength(6)]}),
  //     password3: new FormControl(null,{validators:[Validators.required,Validators.minLength(6)]}),
  //   });
  // }
  
  get userName()
  {
    return this.form.get('userName');
  }
  get name()
  {
    return this.form.get('name');
  }
  get lastName()
  {
    return this.form.get('lastName');
  }
  get email()
  {
    return this.form2.get('email');
  }

  // get password1()
  // {
  //   return this.form2.get('password1');
  // }



  // get password2()
  // {
  //   return this.form3.get('password2');
  // }
  // get password3()
  // {
  //   return this.form3.get('password3');
  // }

  hide=1;
  password_type="password";
  show_pw()
  {
   if(this.hide){
     this.password_type="text";
     this.hide=0;
   } 
   else
   {
     this.password_type="password";
     this.hide=1;
   }
  }




  hide2=1;
  password_type2="password";
  show_pw2()
  {
   if(this.hide2){
     this.password_type2="text";
     this.hide2=0;
   } 
   else
   {
     this.password_type2="password";
     this.hide2=1;
   }
  }
  


  
  hide3=1;
  password_type3="password";
  show_pw3()
  {
   if(this.hide3){
     this.password_type3="text";
     this.hide3=0;
   } 
   else
   {
     this.password_type3="password";
     this.hide3=1;
   }
  }
 

  editProfile()
    {
      if(!this.form.valid)
      {
        this.form.markAllAsTouched();
        console.log("Error");
    }
        else
    {
    this.data=this.form.getRawValue();
        console.log("Next page");
        console.log(this.data);
        console.log("name"+this.data.name);
        console.log("lastname:"+this.data.lastName);
        console.log("username:"+this.data.userName);
        this.databaseChange();

    }
    }

    databaseChange()
    {
      if(this.userControl!=1)
      {

      this.present();
      this.afs.collection('user').doc(this.shared.userArray.userId).update({
        'userName':'@'+this.data.userName.toLowerCase(),
        'name':this.data.name.toLowerCase(),
        'lastName':this.data.lastName.toLowerCase(),
      })
      this.err="Your profile has been updated.";
      this.presentToast();
      this.dismiss();
      // -----------------------------------------------
      // setTimeout(() => {
      //   //  this.router.navigateByUrl('tabs/profile');
      //   //  this.shared.editProfile=0;
      // }, 1000);
    }
else
{
  this.err="Username already taken.";
  this.presentToast();
}
    }


  // get password1()
  // {
  //   return this.form2.get('password1');
  // }

  // get password2()
  // {
  //   return this.form2.get('password2');
  // }
  // get email()
  // {
  //   return this.form2.get('email');
  // }

username=this.shared.userArray.userName;
Name=this.shared.userArray.name;
lastname=this.shared.userArray.lastName;


 err;
   array=[];
  userControl=0;
    inputFocus=0;
    user(ev) {
      this.inputFocus=1;
      if(ev.target.value=='')
      {
        this.inputFocus=0;
      }
      let val ='@'+ev.target.value;
      console.log(val);
      this.afs.collection('user',ref=>ref.where('userName','==',val)).snapshotChanges().subscribe(data=>{
        data.forEach(childData=>{
        this.array.push(childData.payload.doc.data())
        console.log(this.array);
        })
        })
        console.log("array:"+this.array.length);
        setTimeout(() => {
            if(this.array.length==1)
        {
          this.userControl=1;
          console.log("if:"+this.userControl);
          this.array=[];
        }
        else
        {
          this.userControl=0;
          this.array=[];

          console.log("else:"+this.userControl);

        }
        }, 300);
      
  }



  // if(this.userControl!=1)-----------------------------------------

 async changePw()
 {
  if(this.password2.length>=6 && this.password3.length>=6)
  {
  console.log(this.password2);
  console.log(this.password3);
  await this.afAuth.signInWithEmailAndPassword(this.shared.userArray.userMail,this.password2).then((suc)=>{
    firebase.auth().currentUser.updatePassword(`${this.password3}`).then(() => {
        this.err="Your password has been updated!"
        this.presentToast();
        this.password2='';
        this.password3='';
         }).catch((err)=>{
           this.err="Someting went wrong!";
           this.presentToast();
         })
  }).catch((err)=>{
    console.log(err);
    this.err="Please check your password!";
    this.presentToast();
  })
  } 
  else if(this.password2.length<6)
  {
    this.err="Please enter your password!"
    this.presentToast();
  }
  else if(this.password3.length<6)
  {
    this.err="Your password must be at least 6 characters!"
    this.presentToast();
  }

 }
 
 error=0;
 async changeEmail()
 {
  if(!this.form2.valid)
  {
    this.form.markAllAsTouched();
    console.log("Error");
  
}
    else
{
this.data=this.form2.getRawValue();
    console.log(this.data);
    this.form2.setValue({
      email:this.data.email,
    });
    console.log(this.password1)
    
    if(this.password1.length>=6)
    {
      console.log(this.shared.userArray.userMail);
      console.log(this.password1);
    await this.afAuth.signInWithEmailAndPassword(this.shared.userArray.userMail,this.password1).then((suc)=>{
   firebase.auth().currentUser.updateEmail(this.data.email).then(() => {
    this.afs.collection('user').doc(this.shared.userArray.userId).update({
      'userMail':this.data.email,
    })
    this.err="Your email address has been updated!"

    this.presentToast();

   this.shared.userArray.userMail=this.data.email;
  }).catch((error) => {
   this.err="This email already registered!"
   this.presentToast();
  });
      }).catch((err)=>{
        this.err="Please check your password!"
        this.presentToast();
      })

    }
    else
    {
     this.err="Please enter your password!"
     this.presentToast();
    }
    this.password1='';
}

 }

  async presentToast() {
    const toast = await this.toastController.create({
      message: `${this.err}`,
      duration: 1500,
      position: 'top',
      cssClass: 'toast'
    });
    toast.present();
  }

  async cameraModalOpen() {
    const modal = await this.modalCtrl.create({
      component: CameraModalPage,
      cssClass: 'cameraModal'
    });
    return await modal.present();
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


  back()
  {
    this.shared.accountSettings=0;
    this.shared.editProfile=0;
    this.shared.about=0;
    this.shared.feedBack=0;
    this.router.navigateByUrl('tabs/profile');
  }

  cameraModal()
  {
   this.cameraModalOpen();
  }

  async openAbout() {
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
   window.open('https://www.github.com/mstf-ylcn','_system','location=yes');
   
          }
        }
      ]
    });
   
    await alert.present();
   } 
   
 

   password1='';
   password2='';
   password3='';
   subject='';
   text='';
   feedBack =  { subject:'', text:''};

   feedback()
   {
   this.feedBack.subject=this.subject;
   this.feedBack.text=this.text;
   console.log(this.feedBack.text)
   console.log(this.feedBack.subject)

     if( this.feedBack.text.length>=10 &&  this.feedBack.subject.length>=5)
     {
      this.present();
       this.err="Thanks for your feedback."
  this.presentToast();
    this.afs.collection('feedback').doc(this.shared.userArray.userName).update({
    'feedback':firebase.firestore.FieldValue.arrayUnion(this.feedBack),
    
    }).then((suc)=>{
      this.dismiss();
    })
    .catch((err)=>{
     
       if(err.message=="Requested entity was not found.")
      {
      this.afs.collection('feedback').doc(this.shared.userArray.userName).set({
        'feedback':firebase.firestore.FieldValue.arrayUnion(this.feedBack),
      })
      this.dismiss();
     }
   }
  
)
this.text='';
this.subject='';


}
}



}
