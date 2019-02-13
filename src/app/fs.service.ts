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

  filePathCon(template_string, data): string {
    
    //1 LOAD STRING TO URL-TEMPALTE CODE
    var load_string = require('url-template').parse(template_string);
    //2. SEND FORM VALUE TO URL-TEMPLATE
    //@ts-ignore
    var parse_string = load_string.expand(data);
    //3. SAVE FILE PATH IN FORM
    return parse_string;

  };


}




