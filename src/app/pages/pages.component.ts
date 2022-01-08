import {Component} from '@angular/core';
import {Title} from '@angular/platform-browser';
import {environment} from '../../environments/environment';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.scss'],
})
export class PagesComponent {
  version = environment.version;

  constructor(titleService: Title) {
    titleService.setTitle('FIS-Designer - About');
  }
}
