import { Component, OnInit } from '@angular/core';
import { FormGroup,FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { LoadingController, MenuController, ModalController, ToastController } from '@ionic/angular';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import firebase from 'firebase/app';
import { AngularFireStorage, createUploadTask } from '@angular/fire/storage';
import { Shared } from '../Shared';
import { Api } from '../Api';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(private modalCtrl:ModalController, private formbuilder:FormBuilder,private menu:MenuController,
    private router:Router,
    private afAuth:AngularFireAuth,
    private afs:AngularFirestore,private storage:AngularFireStorage,
    private shared:Shared,
   private toastController:ToastController,
   private loadingController:LoadingController,
   private api:Api) { }


  

  form : FormGroup;
  date=new Date().toISOString(); 
  data;

  ngOnInit() {
   this.validator();
   this.menu.enable(false);
   document.body.setAttribute('color-theme','dark');
   this.getApiKey();

  }
  ionViewDidEnter()
  {
    // this.menu.enable(false);

  }
 
  getApiKey()
  {
   firebase.firestore().collection('api').doc('api').get().then(data=>{
    this.api.key = data.data().key;
   })
  }


  validator(){
    this.form = new FormGroup({
      password: new FormControl(null,{validators:[Validators.required,Validators.minLength(6)]}),
      email: new FormControl(null,{validators:[Validators.required,Validators. pattern("[A-Za-z0-9._%+-]{3,}@[a-zA-Z]{3,}([.]{1}[a-zA-Z]{2,}|[.]{1}[a-zA-Z]{2,}[.]{1}[a-zA-Z]{2,})")]}),

    });
  }

  get email()
  {
    return this.form.get('email');
  }

  get pw()
  {
    return this.form.get('pw');
  }



  login()
  {
    if(!this.form.valid)
    {
      this.form.markAllAsTouched();
  }
  else
  {
   this.data=this.form.getRawValue();
      console.log(this.data.email);
      console.log(this.data.password);
      this.login2();
  
  }
}

async login2()
{
try {
  this.present();
 await this.afAuth.signInWithEmailAndPassword(this.data.email,this.data.password).then(data=>{
  this.form.reset();
  firebase.auth().onAuthStateChanged(data=>{
  this.afs.doc(`/user/${this.shared.uid}`).valueChanges().subscribe(profile=>{
      this.shared.userArray=profile;
      this.shared.uid=data.uid;
      console.log(this.shared.userArray.Like);
      if(this.shared.userArray.Like!=null)
      {
        this.shared.userArray.Like=this.shared.userArray.Like.reverse();
      }
      else
      {
        this.shared.userArray.Like=[];
      }

      console.log(this.shared.userArray);
      console.log(this.shared.userArray.profilPhoto);
      this.shared.pp=this.shared.userArray.profilPhoto;
      })
     })


  this.shared.uid=data.user.uid;
  this.dismiss();
  this.router.navigateByUrl('tabs/photos');
  console.log(data);
 })
}
catch(error){
  this.dismiss();
 this.presentToast();
}
}


async presentToast() {
  const toast = await this.toastController.create({
    message: `The password you entered is incorrect. Please try again`,
    duration: 1500,
    position: 'middle',
    cssClass: 'toast'
  });
  toast.present();
}

async presentToast2() {
  const toast = await this.toastController.create({
    message: `${this.message}`,
    duration: 1500,
    position: 'middle',
    cssClass: 'toast'
  });
  toast.present();
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




  password_type="password";
  hide=1;



  modaldismiss() {

  this.modalCtrl.dismiss();
  }



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
  

  signUp()
  {
    this.router.navigateByUrl('/sign-up');
  }
  
  hidePage=0;

 forget()
 {
   this.hidePage=1;
 }
 back()
 {
   this.hidePage=0;
 }
 
message;
datamail;
 mailData(event)
 {
  let val =event.target.value;
  this.datamail=val;
  console.log(val);
 }

 async resetPw(){
  try {
    await this.afAuth.sendPasswordResetEmail(this.datamail).then(data=>{
      console.log(data);
      this.message="Please check your email adress."
      this.presentToast2();
    })
  } catch (error) {
  // this.message="Please enter yor email adress."
  // this.presentToast2();

  }
 }



}
