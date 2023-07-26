import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DeleteComponent } from './delete/delete.component';

const routes: Routes = [
  { path: 'delete', component: DeleteComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
