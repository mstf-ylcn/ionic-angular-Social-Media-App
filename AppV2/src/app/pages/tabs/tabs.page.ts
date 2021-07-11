import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Shared } from '../Shared'; 
import { PhotosPage } from '../photos/photos.page';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.page.html',
  styleUrls: ['./tabs.page.scss'],
})
export class TabsPage implements OnInit {

  constructor(private shared:Shared,
    private router:Router,
    private photospage:PhotosPage) { }

  ngOnInit() {

  }
   selectedPhotos="active";
   selectedSearch="pasive";
   selectedProfile="pasive";
   url;

   photosTabCounter=0;
   photosTab()
    {
      this.selectedPhotos="active";
      this.selectedSearch="pasive";
      this.selectedProfile="pasive"
     console.log("photos:"+this.router.url);
     if(this.shared.PhotosModalisClick==1 && (this.router.url=="/tabs/search" || this.router.url=="/tabs/profile" || this.router.url=="/tabs/searchModal" || this.router.url=="/profileModal"))
     {
      this.router.navigate(['tabs/fullModal']);
     }
     else
     {
      this.shared.PhotosModalisClick=0;
      this.shared.PhotosModalisClose=1
      this.shared.enterCounter=0;
      this.router.navigate(['tabs/photos']);


      //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
      this.photosTabCounter++;
      if(this.photosTabCounter==2)
      {
      this.photosTabCounter=0;
      this.shared.photosToTap=1;
      // this.photos.ToTap();
      }
     //--------------------------------------
 
     }
    }
  
    searchTab()
    {
      // console.log("search:"+this.router.url);
      this.selectedPhotos="pasive";
      this.selectedSearch="active";
      this.selectedProfile="pasive"
      if(this.shared.SearchModalisClick==1 && (this.router.url=="/tabs/photos" || this.router.url=="/tabs/profile" || this.router.url=="/tabs/fullModal" ))
      {
         if(this.shared.isSearchPhoto==1)
         {
          this.router.navigate(['tabs/searchModal']);
          this.shared.isSearchPhoto=0;
         }
       else if(this.shared.isSearchUser==1)
        {
          this.router.navigate(['tabs/profileModal']);
          this.shared.isSearchUser=0;
        }
        else
        {
        this.shared.isSearchUser=0;
        this.shared.isSearchPhoto=0;
          this.router.navigate(['tabs/search']);
        }

      }
      else
      {
        console.log("else");

       this.router.navigate(['tabs/search']);
       this.shared.SearchModalisClick=0;
       this.shared.SearchModalisClose=1;
       this.shared.searchEnterCounter=0;
      
      }
  
    }
    
    profileTabCounter=0;
    profileTab()
    {
      this.selectedPhotos="pasive";
      this.selectedSearch="pasive";
      this.selectedProfile="active"
     console.log("profile:"+this.router.url);

      if(this.shared.ProfileModalisClick==1 && (this.router.url=="/tabs/photos" || this.router.url=="/tabs/search" || this.router.url=="/tabs/fullModal" || this.router.url=="/tabs/searchModal" ))
      {
        this.router.navigate(['tabs/profile']);
        this.shared.loadCounter=0;
      }
      else
      {
       this.shared.profilHide2=1;
       this.router.navigate(['tabs/profile']);
       this.shared.ProfileModalisClick=0;
       this.shared.ProfileModalisClose=1
       this.shared.profileEnterCounter=0;
       this.shared.loadCounter=0;
       
       //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
       this.profileTabCounter++;
       if(this.profileTabCounter==2)
       {
         this.profileTabCounter=0;
         this.shared.profileToTap=1;
       }
       //----------------------------------
   
      }
    }
}
