import { Component, OnInit } from '@angular/core';
import { DataSource } from '@angular/cdk/collections';
import { FsService } from '../../fs.service';
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';

//UPDATE IN 3 PlACES FOR NEW COLLECTION

//1 . update collection and fields here
const collection = "DISCIPLINES"
const fields =  
  `key: doc.id, 
    name: data.name,
    tag: data.tag
  `

@Component({
  selector: 'app-disciplines',
  templateUrl: './disciplines.component.html',
  styleUrls: ['./disciplines.component.css']
})
export class DisciplinesComponent implements OnInit {

  //2. UPDATE DISPLAYED COLUMNS HERE
  displayedColumns = ['name', 'tag', 'del'];
  
  dataSource = new BoardDataSource(this.fs);

  boardsForm: FormGroup;
  name:string='';
  tag:string='';
  
  
  
  constructor(private fs: FsService, private formBuilder: FormBuilder) {
  }

  ngOnInit() {
    this.boardsForm = this.formBuilder.group({
      'name' : [null, Validators.required],
      'tag' : [null, Validators.required],
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

  connect() {
    
    //3. UPDATE AND WRITE NEW GET DATA FUNCTION return this.fs.getContacts();
    console.log(collection);
    console.log(fields);
    return this.fs.getDisciplines();
  }

  disconnect() {

  }
}
