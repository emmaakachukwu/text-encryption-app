import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { DecryptComponent } from './decrypt/decrypt.component';


const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'decrypt', component: DecryptComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
