import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';

import {PagesComponent} from './pages.component';

@NgModule({
  declarations: [PagesComponent],
  imports: [CommonModule],
  exports: [PagesComponent],
})
export class PagesModule {}
