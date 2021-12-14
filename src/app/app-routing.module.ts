import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {PreviewComponent} from "./workspace/preview/preview.component";

const routes: Routes = [
  { path: 'workspace', component: PreviewComponent },
  { path: '', redirectTo: '/workspace', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
