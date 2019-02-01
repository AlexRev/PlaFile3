import { Injectable, } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as firebase from 'firebase';

//import firestore from 'firebase/firestore';


@Injectable({
  providedIn: 'root'
})
export class FsService {

  //collections: DISCIPLINE -name,tag / DOC_TYPE - name, tag  / FROM - name,tag
  //CRUD GET CONTACTS
  c_ref = firebase.firestore().collection('CONTACTS');
  d_ref = firebase.firestore().collection('DISCIPLINES');
  dt_ref = firebase.firestore().collection('DOC_TYPES');

  constructor() { }

  getContacts(): Observable<any> {
    
    return new Observable((observer) => {
      
      this.c_ref.onSnapshot((querySnapshot) => {
        let boards = [];
        querySnapshot.forEach((doc) => {
          let data = doc.data();
          boards.push({
            key: doc.id,
            name: data.name,
            tag: data.tag,
          });
        });
        observer.next(boards);
      });
    });
  }

  getDisciplines(): Observable<any> {
    
    return new Observable((observer) => {
      
      this.d_ref.onSnapshot((querySnapshot) => {
        let boards = [];
        querySnapshot.forEach((doc) => {
          let data = doc.data();
          boards.push({
            key: doc.id,
            name: data.name,
            tag: data.tag,
          });
        });
        observer.next(boards);
      });
    });
  }

  getDocTypes(): Observable<any> {
    
    return new Observable((observer) => {
      
      this.dt_ref.onSnapshot((querySnapshot) => {
        let boards = [];
        querySnapshot.forEach((doc) => {
          let data = doc.data();
          boards.push({
            key: doc.id,
            name: data.name,
            tag: data.tag,
          });
        });
        observer.next(boards);
      });
    });
  }

  postDoc(collection, data): Observable<any> {
    return new Observable((observer) => {
      firebase.firestore().collection(collection).add(data).then((doc) => {
        observer.next({
          key: doc.id,
        });
      });
    });
  }

  deleteDoc(collection,id: string): Observable<{}> {
    return new Observable((observer) => {
      firebase.firestore().collection(collection).doc(id).delete().then(() => {
        observer.next();
      });
    });
  }


}




