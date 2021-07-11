import { Component, OnInit } from '@angular/core';
import { Camera,CameraOptions } from '@ionic-native/camera/ngx';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage, createUploadTask } from '@angular/fire/storage';
import firebase from 'firebase/app';
import { Shared } from '../Shared';
import { LoadingController, ModalController } from '@ionic/angular';
@Component({
  selector: 'app-camera-modal',
  templateUrl: './camera-modal.page.html',
  styleUrls: ['./camera-modal.page.scss'],
})
export class CameraModalPage implements OnInit {

  constructor( private afs:AngularFirestore,
    private storage:AngularFireStorage,
    private camera:Camera,
    private shared:Shared,
    private loadingController:LoadingController,
    private modalCtrl:ModalController) { }
 time;
  ngOnInit() {
    this.time=new Date().toISOString();
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
  this.modalCtrl.dismiss();
  this.shared.userArray
this.time=new Date().toISOString();
var upload= this.storage.upload(`${this.shared.userArray.name}.${this.shared.userArray.lastName}.${this.shared.userArray.userId}.${this.time}.jpg`,this.imgURL);
this.present();
var b= upload.percentageChanges();
upload.then(res=>{
res.task.snapshot.ref.getDownloadURL().then(downloadableUrl=>{
this.dismiss();
this.shared.pp=downloadableUrl; 
var result = this.afs.collection('user').doc(this.shared.userArray.userId).update({
  'profilPhoto':this.shared.pp,
})
firebase.auth().onAuthStateChanged(data=>{
  this.afs.doc(`/user/${this.shared.userArray.userId}`).valueChanges().subscribe(profile=>{
      this.shared.userArray=profile;
      console.log(this.shared.userArray);
      console.log(this.shared.userArray.profilPhoto);
      this.shared.pp=this.shared.userArray.profilPhoto;
      })
     })
})
})
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
