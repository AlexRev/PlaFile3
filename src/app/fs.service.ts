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

  constructor() { }

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




