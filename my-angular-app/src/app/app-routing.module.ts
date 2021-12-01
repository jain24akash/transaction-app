import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReadComponent } from './read/read.component';

const routes: Routes = [
  {path:'read', component:ReadComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {onSameUrlNavigation: 'ignore',})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
