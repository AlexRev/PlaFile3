// TODO HERE

import { Component, OnInit,  } from '@angular/core';
import { DataSource } from '@angular/cdk/collections';
import { FsService } from '../fs.service';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Observable, merge } from 'rxjs';
import * as firebase from 'firebase';
import { AngularFirestore } from '@angular/fire/firestore';

//UPDATE IN 3 PlACES FOR NEW COLLECTION

//1 . update collection and fields here
const collection = "DOCUMENTS"

@Component({
  selector: 'app-contacts',
  templateUrl: './file-adoc.component.html',
  styleUrls: ['./file-adoc.component.css']
})
export class FileADocComponent implements OnInit {

 //2. UPDATE DISPLAYED COLUMNS HERE
 displayedColumns = ['job_tag' , 'contact' ,'disc_tag', 'doc_type_tag' , 'doc_number', 'revision', 'doc_name', 'filename', 'del'];
  
 dataSource = new BoardDataSource(this.fs);

//4. ADD DROP DOWN OPTION DATA
disc_items: Observable<any[]>;
job_items:Observable<any[]>;
contact_disc_items:Observable<any[]>;
doc_type_items:Observable<any[]>;
// //N/A not options
// doc_number_items :Observable<any[]>;
// revision_items :Observable<any[]>;
// doc_name_items:Observable<any[]>;

//5. RETURN DATA
 boardsForm: FormGroup;

//Below are variables used to write tabular display of data
 job_tag:string='';
 contact_tag:string='';
 doc_type_tag:string='';
 doc_number :string='';
 revision :string='';
 doc_name:string='';
 filename: string = '';
 
 constructor(db:AngularFirestore, private fs: FsService, private formBuilder: FormBuilder) {
  //GET OPTION DATA HERE  
  this.job_items = db.collection('JOBS').valueChanges();
  this.contact_disc_items = db.collection('CONTACTS').valueChanges();
  this.doc_type_items = db.collection('DOC_TYPES').valueChanges();
  //below N/A as writes from this table
  // this.doc_number_items :db.collection('DISCIPLINES').valueChanges();
  // this.revision_items :db.collection('DISCIPLINES').valueChanges();
  // this.doc_name_items:db.collection('DISCIPLINES').valueChanges();
 }

 //5. get data from forms
 ngOnInit() {
   this.boardsForm = this.formBuilder.group({
    //  'name' : [null, Validators.required],
    //  'tag' : [null, Validators.required],
    //  'disc_tag' : [null, Validators.required],
     'job_tag':[null, Validators.required],
     'contact_disc_tag':[null, Validators.required],
     //these are constructed from the above JSON object
     'contact':[null, Validators.required],
     'disc_tag':[null, Validators.required],
     
     'doc_type_tag':[null, Validators.required],
     'doc_number' :[null, Validators.required],
     'revision' :[null, Validators.required],
     'doc_name':[null, Validators.required],
     'filename':[null, Validators.required],
     'pathConstructor':[null, Validators.required],
     'filepath':[null, Validators.required],
     
   });
    
//A -- USE THIS OPTION TO OBSERVE SPECIFIC VALUES, eg if one is programatically generated and would create an infinite loop. OPERATORS MERGED TOGETHER, ONLY NEED TO WATCH ONE VAR
  const fieldChanges = merge(
    this.boardsForm.get('contact_disc_tag').valueChanges,
    this.boardsForm.get('doc_type_tag').valueChanges,
    this.boardsForm.get('doc_number').valueChanges,
    this.boardsForm.get('revision').valueChanges,
    this.boardsForm.get('doc_name').valueChanges,
  );


  //ACTIONS TO TAKE PLACE AS USER EDITS FORM
  fieldChanges.subscribe(form => {
    sessionStorage.setItem('form', JSON.stringify(form));
    this.boardsForm.get('filename').setValue(
      //GETS MULTIPLE VALUES FROM THIS OPTION SELECTOR WHICH ARE WRITTEN INTO JSON OBJECT
      JSON.parse(this.boardsForm.get('contact_disc_tag').value).contact + '-' +
      JSON.parse(this.boardsForm.get('contact_disc_tag').value).disc_tag + '-' +
      this.boardsForm.get('doc_type_tag').value + '-' +
      this.boardsForm.get('doc_number').value + '-' +
      this.boardsForm.get('revision').value + '-' +
      this.boardsForm.get('doc_name').value
    );
    
    this.boardsForm.get('contact').setValue(
      JSON.parse(this.boardsForm.get('contact_disc_tag').value).contact
    );

    this.boardsForm.get('disc_tag').setValue(
      JSON.parse(this.boardsForm.get('contact_disc_tag').value).disc_tag 
    );

    this.boardsForm.get('pathConstructor').setValue(
      JSON.parse(this.boardsForm.get('contact_disc_tag').value).pathConstructor 
    );
    
    //code from https://github.com/bramstein/url-template?fbclid=IwAR3fXbXJ1K9ZwnXOBkrRMFwpdiGqjlm3NOfGRgSPALvRidwkqIW7TLGoJ48
    //var require: any;
    var template = require('url-template');

    //BELOW CODE CALCULATES FILEPATH BUT CRASHES THE APP :(
    console.log(form);
    // var formdata = JSON.parse(form);
    // console.log(formdata);
    // var FCON1 = template.parse(this.boardsForm.get('pathConstructor').value );
    // var FCON2 = FCON1.expand(formdata);
    // // FOR DEBUGGING - working but need to fix require error
    // console.log("FCON1")
    // console.log("FCON2 = " + FCON2);
    // this.boardsForm.get('filepath').setValue(
    //   FCON2 
    // );


  });

 };
//B -- USE THIS OPTION TO OBSERVE ALL VALUES
  //logs any changes to form values
  // this.boardsForm.
  // valueChanges.
  // subscribe(form => {
  //   sessionStorage.setItem('form', JSON.stringify(form));
  //   this.fileTemp.get('fileTemp').setValue(  <--set some value based on formula below
  //     this.boardsForm.get('contact_disc_tag').value + '-' +
  //     this.boardsForm.get('doc_type_tag').value + '-' +
  //     this.boardsForm.get('doc_number').value + '-' +
  //     this.boardsForm.get('revision').value + '-' +
  //     this.boardsForm.get('doc_name').value
  //   );
  //   // fpr debugging 
  //   //console.log(JSON.stringify(form));
  //  });

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
           contact:data.contact,
           disc_tag: data.disc_tag,
           job_tag: data.job_tag,
           contact_disc_tag: data.contact_disc_tag,
           doc_type_tag:data.doc_type_tag,
           doc_number :data.doc_number,
           revision :data.revision,
           doc_name:data.doc_name,
           filename:data.filename,
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
