import { Component, OnInit } from '@angular/core';
import { DataSource } from '@angular/cdk/collections';
import { FsService } from '../../fs.service';
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import * as firebase from 'firebase';
//add disciplines
import { AngularFirestore } from '@angular/fire/firestore';

//UPDATE IN 3 PlACES FOR NEW COLLECTION

//1 . update collection and fields here
const collection = "CONTACTS"

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css']
})
export class ContactsComponent implements OnInit {

 //2. UPDATE DISPLAYED COLUMNS HERE
 displayedColumns = ['name', 'tag', 'disc' ,'pathConstructor', 'del'];
  
 dataSource = new BoardDataSource(this.fs);

//4. ADD OPTIONDATA
disc_items: Observable<any[]>;
//


//5. RETURN DATA
 boardsForm: FormGroup;
 name:string='';
 tag:string='';
 disc_tag:string='';
 pathConstructor:string='';

 
 constructor(db:AngularFirestore, private fs: FsService, private formBuilder: FormBuilder) {
  //GET OPTION DATA HERE  
  this.disc_items = db.collection('DISCIPLINES').valueChanges();
 }

 //5. get data from forms
 ngOnInit() {
   this.boardsForm = this.formBuilder.group({
     'name' : [null, Validators.required],
     'tag' : [null, Validators.required],
     'disc_tag' : [null, Validators.required],
     'pathConstructor': [null, Validators.required],
   });
   
 }

 onFormSubmit(form:NgForm) {
   this.fs.postDoc(collection,form)
     .subscribe(res => {
         let id = res['key'];
         //this.router.navigate(['/boards-details', id]);
       }, (err) => {
         console.log(err);
       });
 }

 deleteDoc(id) {
   this.fs.deleteDoc(collection,id)
     .subscribe(res => {
         //this.router.navigate(['/boards']);
       }, (err) => {
         console.log(err);
       }
     );
 }

}

export class BoardDataSource extends DataSource<any> {

 constructor(private fs: FsService) {
   super()
 }

 ref = firebase.firestore().collection(collection);

//3 Update Field Mapping

 getDocs(): Observable<any> {
   
    return new Observable((observer) => {  

     this.ref.onSnapshot((querySnapshot) => {
       let boards = [];
       querySnapshot.forEach((doc) => {
         let data = doc.data();
         boards.push({
           key: doc.id,
           name: data.name,
           tag: data.tag,
           disc_tag: data.disc_tag,
           pathConstructor: data.pathConstructor,
         });
       });
       observer.next(boards);
     });
   });
 }

 connect() {
   console.log(collection);
   return this.getDocs();
 }

 disconnect() {

 }
}
