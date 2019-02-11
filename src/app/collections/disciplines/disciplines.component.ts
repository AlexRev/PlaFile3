import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { DataSource } from '@angular/cdk/collections';
import { FsService } from '../../fs.service';
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import * as firebase from 'firebase';
import { MatSort, MatTableDataSource } from '@angular/material';

//UPDATE IN 3 PlACES FOR NEW COLLECTION

//1 . update collection and fields here
const collection = "DISCIPLINES"
const fields =  
  `key: doc.id, 
    name: data.name,
    tag: data.tag,
    folder_tag: data.folder_tag,
  `

@Component({
  selector: 'app-disciplines',
  templateUrl: './disciplines.component.html',
  styleUrls: ['./disciplines.component.css']
})



export class DisciplinesComponent implements OnInit {

  //2. UPDATE DISPLAYED COLUMNS HERE
  displayedColumns = ['name', 'disc_tag','disc_folder_tag', 'del'];
  
   dataSource = new BoardDataSource(this.fs);

  boardsForm: FormGroup;
  name:string='';
  disc_tag:string='';
  disc_folder_tag:string ='';
  
  
  
  constructor(private fs: FsService, private formBuilder: FormBuilder) {
  }

  ngOnInit() {
    this.boardsForm = this.formBuilder.group({
      'name' : [null, Validators.required],
      'disc_tag' : [null, Validators.required],
      'disc_folder_tag' : [null, Validators.required],
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
            disc_tag: data.disc_tag,
            disc_folder_tag: data.disc_folder_tag,
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
