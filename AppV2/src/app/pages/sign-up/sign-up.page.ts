import { Component, OnInit } from '@angular/core';
import { LoadingController, ModalController, NavController, ToastController } from '@ionic/angular';
import { FormGroup,FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import firebase from 'firebase/app';
import { Camera,CameraOptions } from '@ionic-native/camera/ngx';
import { AngularFireStorage, createUploadTask } from '@angular/fire/storage';
import { Shared } from '../Shared';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.page.html',
  styleUrls: ['./sign-up.page.scss'],
})
export class SignUpPage implements OnInit {

  constructor(private modalCtrl:ModalController,
    private formbuilder:FormBuilder,
    private nav:NavController,
    private afAuth:AngularFireAuth,
    private camera:Camera,
    private afs:AngularFirestore,
    private storage:AngularFireStorage,
    private router:Router,
    private loadingController:LoadingController,
    public toastController: ToastController,
    private shared:Shared) {
   }
   
  time;
  ngOnInit() {
    // this.time=new Date().toISOString();
    this.validator();
    this.validator2();

    var y= new Date().getFullYear();
    var a= new Date().getMonth();
    var g= new Date().getDate();
    var s= new Date().getHours();
    var d= new Date().getMinutes();
   var x=(y+"/"+(a+1)+"/"+g+"  "+s+":"+d);
    this.time=x;
  }

  back() {

   this.nav.back();
    }

    form : FormGroup;
    data:any;

    validator(){
      this.form = new FormGroup({
        userName: new FormControl(null,{validators:[Validators.required,Validators.minLength(5),Validators.pattern('^(?=[a-zA-Z0-9._]{5,20}$)(?!.*[_.]{2})[^_.].*[^_.]$')]}),
        name: new FormControl(null,{validators:[Validators.required,Validators.minLength(2),Validators.pattern('[a-zA-Z şŞ iİ]*')]}),
        lastName: new FormControl(null,{validators:[Validators.required,Validators.minLength(2),Validators.pattern('[a-zA-Z şŞ iİ]*')]}),
        gender: new FormControl(null,{validators:[Validators.required]}),
        policy: new FormControl(null,{validators:[Validators.requiredTrue]}),
        password1: new FormControl(null,{validators:[Validators.required,Validators.minLength(6)]}),
        // password2: new FormControl(null,{validators:[Validators.required,Validators.minLength(8),]}),
        // tel: new FormControl(null,{validators:[Validators.required,Validators.minLength(10),Validators.pattern('[0-9]*')]}),
        email: new FormControl(null,{validators:[Validators.required,Validators. pattern("[A-Za-z0-9._%+-]{3,}@[a-zA-Z]{3,}([.]{1}[a-zA-Z]{2,}|[.]{1}[a-zA-Z]{2,}[.]{1}[a-zA-Z]{2,})")]}),
      });
    }
    

    form2 : FormGroup;
    validator2(){
      this.form2 = new FormGroup({
      });
    }
    
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

    get gender()
    {
      return this.form.get('gender');
    }

    get policy()
    {
      return this.form.get('policy');
    }


    get password1()
    {
      return this.form2.get('password1');
    }
 
    get password2()
    {
      return this.form2.get('password2');
    }
    get email()
    {
      return this.form2.get('email');
    }


  next()
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
        this.register();
        console.log("mail:"+this.data.email);
        console.log("name"+this.data.name);
        console.log("lastname:"+this.data.lastName);
        console.log("username:"+this.data.userName);
        console.log("pw:"+this.data.password1);
        console.log("gender:"+this.data.gender);
    }
    }
   
    page=1;
    pp="../../../assets/pp.jpg";
    uid;
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

    async register(){
      
      // let pw = CryptoJS.SHA256(this.data.password1).toString(CryptoJS.enc.Hex); //hash
  
     if(this.userControl!=1){
        
      this.present();
      try {
        await this.afAuth.createUserWithEmailAndPassword(this.data.email,this.data.password1).then(data =>{
          this.afs.collection('user').doc(data.user.uid).set({
            'userId':data.user.uid,
            'userName':'@'+this.data.userName.toLowerCase(),
            'name':this.data.name.toLowerCase(),
            'lastName':this.data.lastName.toLowerCase(),
            'userMail':this.data.email.toLowerCase(),
            'gender':this.data.gender,
            'profilPhoto':this.pp,
            'createdDate':this.time,
            'Like':[]
            // 'Likes':null
          })
          console.log(data);
          this.uid=data.user.uid;
          this.shared.uid=data.user.uid;
          this.form.reset();
          this.page=0;
          firebase.auth().onAuthStateChanged(data=>{
            this.afs.doc(`/user/${this.shared.uid}`).valueChanges().subscribe(profile=>{
                this.shared.userArray=profile;
                console.log(this.shared.userArray);
                console.log(this.shared.userArray.profilPhoto);
                this.shared.pp=this.shared.userArray.profilPhoto;
                })
               })
          //success
        this.dismiss();
        });
      } catch (error) {
        //error
        console.log(error.message);
      this.err=error.message;
      this.dismiss();
      
        this.presentToast();
        

      }

     }
     else
     {
       this.err="Username already taken."
       this.presentToast();
     }

    }
 err;

        async presentToast() {
          const toast = await this.toastController.create({
            message: `${this.err}`,
            duration: 1500,
            position: 'middle',
            cssClass: 'toast'
          });
          toast.present();
        }

        imgURL;
        getCamera()
        {
          const options: CameraOptions = {
            quality: 100,
            destinationType: this.camera.DestinationType.DATA_URL,
            sourceType:this.camera.PictureSourceType.CAMERA,
            saveToPhotoAlbum:true,
            targetHeight:500,
            targetWidth:500,
            correctOrientation: true 
          }
          this.camera.getPicture(options ).then((res)=>
          {
        this.imgURL=this.dataUrltoBlob('data:image/jpeg;base64,'+res);
        this.uploadImage();
          }).catch(e=>{
            console.log(e); 
          })
        }
            
        getGallery()
        {
          this.camera.getPicture({
            sourceType:this.camera.PictureSourceType.PHOTOLIBRARY,
            destinationType:this.camera.DestinationType.DATA_URL,
            allowEdit:true,
            targetHeight:500,
            targetWidth:500,
            quality:100,
            correctOrientation: true 
          }).then((res)=>
          {
        this.imgURL=this.dataUrltoBlob('data:image/jpeg;base64,'+res);
        this.uploadImage();
          }).catch(e=>{
            console.log(e); 
          })
        }

        dataUrltoBlob(dataURL)
        {
        let binary=atob(dataURL.split(',')[1]);
        let array=[];
      
         for (let index = 0; index < binary.length; index++) {
         array.push(binary.charCodeAt(index));     
         }
         return new Blob([new Uint8Array(array)],{type:'image/jpeg'});
        }     
      
 uploadImage()
 {
  this.time=new Date().toISOString();
  var upload= this.storage.upload(`${this.data.name}.${this.data.lastName}.${this.uid}.${this.time}.jpg`,this.imgURL);
  this.present();
   var b= upload.percentageChanges();
   upload.then(res=>{
    res.task.snapshot.ref.getDownloadURL().then(downloadableUrl=>{
      this.dismiss();
      this.pp=downloadableUrl; 
      var result = this.afs.collection('user').doc(this.uid).update({
        'profilPhoto':this.pp,
      })
      firebase.auth().onAuthStateChanged(data=>{
        this.afs.doc(`/user/${this.uid}`).valueChanges().subscribe(profile=>{
            this.shared.userArray=profile;
            console.log(this.shared.userArray);
            console.log(this.shared.userArray.profilPhoto);
            this.shared.pp=this.shared.userArray.profilPhoto;
            })
           })
     })
  })
}
route()
{
  this.router.navigateByUrl('/tabs/photos');
  this.page=1;
 
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
    show = false;
    hide=1;
  
    
    password_type2="password";
    hide2=1;

    show_pw1()
    {
     if(this.show){
       this.password_type="text";
       this.show=false;
       this.hide=0;
     } 
     else
     {
      this.show=true;
       this.password_type="password";
       this.hide=1;
  
     }
    }

     show_pw2(){
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
    
  //   date:any;

  //     //tarih format

  // cevir()
  // {
  //   this.date=format(new Date(this.date), "yyyy-MM-dd");
  // }

}
