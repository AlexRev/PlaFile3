import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ContactsComponent } from './collections/contacts/contacts.component';
import { DisciplinesComponent } from './collections/disciplines/disciplines.component';
import { DocTypeComponent } from './collections/doc-type/doc-type.component';
import { FileADocComponent } from './file-adoc/file-adoc.component';
import { HomeComponent } from './collections/home/home.component';

const routes: Routes = [
  {path:'contacts', component: ContactsComponent},
  {path:'disciplines', component: DisciplinesComponent},
  {path:'doctypes', component: DocTypeComponent},
  {path:'home', component:FileADocComponent},
  {path: 'chome', component: HomeComponent},
  {path: '', redirectTo: 'home', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }