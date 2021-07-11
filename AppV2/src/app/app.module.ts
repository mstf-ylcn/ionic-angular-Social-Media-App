import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import {HttpClientModule} from '@angular/common/http';

import {HammerModule } from '@angular/platform-browser'
import {HammerGestureConfig,HAMMER_GESTURE_CONFIG} from '@angular/platform-browser'
import * as Hammer from 'hammerjs';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import {AngularFireModule} from '@angular/fire'
import {environment} from '../environments/environment';
import {AngularFireAuthModule} from '@angular/fire/auth';
import {AngularFirestoreModule} from '@angular/fire/firestore';
import {AngularFireStorageModule} from '@angular/fire/storage';

import { Camera } from '@ionic-native/camera/ngx';



var doubleTap = new Hammer.Tap({event: 'doubletap', taps: 2 ,time:250});
doubleTap.recognizeWith(doubleTap);

export class CustomHammerConfig extends HammerGestureConfig{
  
  overrides= <any>{
    'pinch': { enable: false },
    'rotate': { enable: false },
   'press': { time: 400 ,},
    'pan':{
    direction:Hammer.DIRECTION_HORIZONTAL
    },
  
    // 'press': { time: 500 ,
    //   hold: true,
    //   release: true},
    // 'pan':{
    //   event:'panend'
    //   direction:Hammer.DIRECTION_HORIZONTAL
    //   },
  }
  
}

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule,
     IonicModule.forRoot(),
      AppRoutingModule,
      HammerModule,
      HttpClientModule, 
       AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,AngularFireStorageModule,AngularFireAuthModule],
  providers: [Camera,{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy },{provide:HAMMER_GESTURE_CONFIG,useClass:CustomHammerConfig},SocialSharing,StatusBar],
  bootstrap: [AppComponent],
})
export class AppModule {}
