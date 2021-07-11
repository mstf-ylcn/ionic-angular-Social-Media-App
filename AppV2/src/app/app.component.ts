import { Component } from '@angular/core';
import { MenuController, ModalController, NavController, Platform } from '@ionic/angular';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage, createUploadTask } from '@angular/fire/storage';
import { Shared } from './pages/Shared';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(private platform:Platform,
    private statusbar:StatusBar,
    private router:Router,
    private menu:MenuController,
    private afAuth:AngularFireAuth,
    private afs:AngularFirestore,
    private storage:AngularFireStorage,
    private modalctrl:ModalController,
    private nav:NavController,
    private shared:Shared) {
      this.initializeApp();
    }


    logout()
    {
      this.afAuth.signOut();
      console.log("log out");
      this.router.navigate(['login']);
      this.menu.close('first');
    }

  initializeApp() {
    this.platform.ready().then(() => {
      this.platform.backButton.subscribeWithPriority(9999, () => {
        document.addEventListener('backbutton', function (event) {
          event.preventDefault();
          event.stopPropagation();
        }, false);
      });
      this.statusbar.styleDefault();
    });
  }


  editProfile(){
    this.shared.editProfile=1;
   this.shared.hideBar=0;
  
    this.router.navigateByUrl('tabs/settings');
  }


  accountSettings(){
    this.shared.accountSettings=1;
    this.shared.hideBar=0;
   
     this.router.navigateByUrl('tabs/settings');
  }

  Feedback()
  {
    this.shared.feedBack=1;
    this.shared.hideBar=0;
   
     this.router.navigateByUrl('tabs/settings')
  }

  About()
  {
    this.shared.about=1;
    this.shared.hideBar=0;
   
     this.router.navigateByUrl('tabs/settings')
  }
}
