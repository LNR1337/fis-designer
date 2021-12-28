import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import {RouterModule} from '@angular/router';

import {PagesComponent} from './pages.component';

@NgModule({
  declarations: [PagesComponent],
  imports: [CommonModule, MatCardModule, RouterModule],
  exports: [PagesComponent],
})
export class PagesModule {}
