import {NgModule} from '@angular/core';
import {Routes} from '@angular/router';
import {RouterModule} from '@angular/router';
import {PagesComponent} from './pages/pages.component';
import {WorkspaceComponent} from './workspace/workspace.component';

const routes: Routes = [
  {path: 'workspace', component: WorkspaceComponent},
  {path: 'pages', component: PagesComponent},
  {path: '', redirectTo: '/workspace', pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
