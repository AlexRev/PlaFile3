import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CollectionsComponent } from './collections/collections.component';
import { ContactsComponent } from './collections/contacts/contacts.component';
import { DisciplinesComponent } from './collections/disciplines/disciplines.component';
import { DocTypeComponent } from './collections/doc-type/doc-type.component';
import { FileADocComponent } from './file-adoc/file-adoc.component';
import { HomeComponent } from './collections/home/home.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

//imports from PLA-FILE
import { AngularFireModule } from '@angular/fire';
import { AppConfig } from './app.component'

import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';


import {
  MatInputModule,
  MatPaginatorModule,
  MatProgressSpinnerModule,
  MatSortModule,
  MatTableModule,
  MatIconModule,
  MatButtonModule,
  MatCardModule,
  MatFormFieldModule,
  MatSelectModule, 
  MatSelect} from "@angular/material";

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { JobsComponent } from './collections/jobs/jobs.component';
import { FilepathsComponent } from './collections/filepaths/filepaths.component';

//ngx imports
// import { BrowserModule } from '@angular/platform-browser';
// import { NgModule } from '@angular/core';
// import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
 
// import { AppComponent } from './app.component';
import { FileDropModule } from 'ngx-file-drop';

@NgModule({
  declarations: [
    AppComponent,
    CollectionsComponent,
    ContactsComponent,
    DisciplinesComponent,
    DocTypeComponent,
    FileADocComponent,
    HomeComponent,
    JobsComponent,
    FilepathsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatProgressSpinnerModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatSelectModule,
    //imports from PLA-FILE
    AngularFireModule.initializeApp(AppConfig.firebase,'pla-firebase'),
    AngularFirestoreModule,
    AngularFireStorageModule,
    AngularFireAuthModule,
    //ngx imports
    HttpClientModule,
    FileDropModule
  ],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
