import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class Shared {


    pasive=0;
    control=0;
    device_height;
    photo_id;
    modal_css="modal";
    searchModalcss="modal";
    PhotosModalisClick=0;
    SearchModalisClick=0;
    ProfileModalisClick=0;
    PhotosModalisClose=0;
    SearchModalisClose=0;
    ProfileModalisClose=0;
    SearchModalPageCounter=0;
    photosY=0;
    fullModalY=0;
    hideBar=1;
    enterCounter=0;
    searchEnterCounter=0;
    profileEnterCounter=0;
    searchWord;
    blur="modal";
    uid;
    userArray;
    pp="../../../assets/pp.jpg";
    searchUserArray;
    isSearchUser=0;
    isSearchPhoto=0;
    likePhotoClick=0;
    isProfilPhotoClick=0;
    
    profilHide2=0;
    editProfile=0;
    accountSettings=0;
    feedBack=0;
    about=0;
    loadCounter=0;

    photosToTap=0;
    profileToTap=0;
    
    // userLike;



    
    
}