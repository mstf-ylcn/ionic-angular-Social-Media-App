import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class Api {
    page=1;
    url="https://api.unsplash.com/";
    key;

    count="30";
    search_word="";
    user;
}