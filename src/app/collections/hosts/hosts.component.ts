import { Component, OnInit } from '@angular/core';
import { DataSource } from '@angular/cdk/collections';
import { FsService } from '../../fs.service';
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import * as firebase from 'firebase';

//UPDATE IN 3 PlACES FOR NEW COLLECTION

//1 . update collection and fields here
const collection = "HOSTS"


@Component({
  selector: 'app-hosts',
  templateUrl: './hosts.component.html',
  styleUrls: ['./hosts.component.css']
})
export class HostsComponent implements OnInit {

 //2. UPDATE DISPLAYED COLUMNS HERE
 displayedColumns = ['host_name', 'host_path', 'del'];
  
 dataSource = new BoardDataSource(this.fs);

 boardsForm: FormGroup;
 host_name:string='';
 host_path:string='';
 
 
 
 constructor(private fs: FsService, private formBuilder: FormBuilder) {
 }

 ngOnInit() {
   this.boardsForm = this.formBuilder.group({
     'host_name' : [null, Validators.required],
     'host_path' : [null, Validators.required],
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
           host_name: data.host_name,
           host_path: data.host_path,
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
