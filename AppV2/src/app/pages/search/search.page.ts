import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {Router,ActivatedRoute} from '@angular/router';
import { LoadingController, ModalController, NavController } from '@ionic/angular';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { Shared } from '../Shared';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})
export class SearchPage implements OnInit {

  constructor(private http:HttpClient,
    private router:Router,
    private active:ActivatedRoute,
    private modalctrl:ModalController,
    private socialSharing: SocialSharing,
    private navCtrl:NavController,
    public shared:Shared,
    private loadingController:LoadingController,
    private afs:AngularFirestore) { 

  }

  ngOnInit() {

  }

 tempAccountArray=[];
 searchBarCss="searchBar";
 cancelButton="focus";
 tempWord=""; 
 debounce=0;
 searchPhotos()
 {
   console.log(this.shared.searchWord)
  this.tempWord=this.shared.searchWord.toLocaleLowerCase();

   if(this.shared.searchWord[0]!='@' && this.shared.searchWord!="")
   {
     for (let index = 0; index < this.tempWord.length; index++) 
     {
     this.tempWord=this.tempWord.replace(" ",","); 
     }
     this.shared.SearchModalisClick=1;
     this.shared.isSearchPhoto=1;
     this.router.navigateByUrl('tabs/searchModal');
      this.result=0;

     this.searchBarCss="searchBar";
     console.log(this.tempWord);
     }

 }
 
 a:string;

 result=0;
 test=0;
 async searchAccount(event)
 { 
 this.tempAccountArray=[];

  if(event.detail.value=='')
  {
    this.result=0;
  }

  if(event.detail.value[0]=='@' && event.detail.value[1]!=null)
  {

//  this.debounce=500;
 console.log(event.target.value.toLocaleUpperCase());
//  console.log(this.debounce);
 
 var temp;
 await this.afs.collection('user').ref.orderBy('userName').startAt(event.target.value.toLowerCase()).endAt(event.target.value.toLowerCase()+'\uf8ff').get().then((snapshot)=>{
  snapshot.docs.forEach(doc => {
 console.log(doc.data()); 
 temp=doc.data()
 if(temp.userId!=this.shared.uid)
 {
  this.tempAccountArray.push(doc.data());     
 }


  });
  if(this.tempAccountArray.length==0)
  {
    this.result=1;
  }
  else
  {
    console.log("else");
    this.result=0;
  }
})
  }
  else if(event.detail.value[0]!='@' && event.detail.value[0]!=null)
  {
 await  this.afs.collection('user').ref.orderBy('name').startAt(event.target.value.toLowerCase()).endAt(event.target.value.toLowerCase()+'\uf8ff').get().then((snapshot)=>{
      snapshot.docs.forEach(doc => {
     console.log(doc.data()); 
     temp=doc.data()
     if(temp.userId!=this.shared.uid)
     {
      this.tempAccountArray.push(doc.data());     
     }

      });
      if(this.tempAccountArray.length==0)
      {
        this.result=1;
      }
      else
      {
        console.log("else");
        this.result=0;
      }
    })
  }
  else
  {
    // this.debounce=0;
    console.log(event.detail.value);
  }
}

Account(user)
{
  this.shared.searchUserArray=user;
   console.log(this.shared.searchUserArray);
   if(this.shared.searchUserArray.Like!=null)
   {
     console.log("if");
     this.shared.searchUserArray.Like=this.shared.searchUserArray.Like.reverse();
   }
   else
   {
     console.log("else");
     this.shared.searchUserArray.Like=[];

   }
  this.shared.SearchModalisClick=1;
  this.shared.isSearchPhoto=0;
  this.shared.isSearchUser=1;
  this.router.navigateByUrl('tabs/profileModal');
}

  searchCancel()
{
  // console.log("search cancel");
  this.searchBarCss="searchBar";  
  this.cancelButton="focus";

  this.shared.hideBar=1;
}
searchFocus()
{
  // console.log("search focus");
  this.searchBarCss="searchBar-Focus";
  this.cancelButton="always";
  this.shared.hideBar=0;
}
cancelFocus()
{
  // console.log("search focus cancel");
  this.shared.hideBar=1;
}


async present() {
  const loading = await this.loadingController.create({
    cssClass: 'transparent',
    duration: 200
  });
  await loading.present();

}

ionViewDidEnter()
{
  this.shared.hideBar=1; //---------------  
  this.tempAccountArray=[];
  this.shared.searchWord=null;
  this.searchCancel();   //------------

  this.present(); 
}

}
