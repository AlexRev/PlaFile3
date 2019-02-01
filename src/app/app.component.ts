import { Component, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import * as firebase from 'firebase';
//import firestore from 'firebase/firestore';

const config = {
  apiKey: "AIzaSyDNwo0J-JI5ApQ3lM3XoSm7eRp3ZMQ9W0E",
  authDomain: "filer-183a7.firebaseapp.com",
  databaseURL: "https://filer-183a7.firebaseio.com",
  projectId: "filer-183a7",
  storageBucket: "filer-183a7.appspot.com",
  messagingSenderId: "110090761741"
  };

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

@NgModule({
  imports: [
    BrowserModule,
    AppRoutingModule,
  ]
})



export class AppComponent {
  title = 'plaFile3';
  
  
  ngOnInit() {
    firebase.initializeApp(config);
    //firebase.firestore().settings(settings);
  }
}


