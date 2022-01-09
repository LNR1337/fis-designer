import {Component} from '@angular/core';
import {MatTabChangeEvent} from '@angular/material/tabs';
import {Store} from '@ngrx/store';
import {changePreviewPage} from '../preview/state/preview.actions';

@Component({
  selector: 'app-config',
  templateUrl: './config.component.html',
  styleUrls: ['./config.component.scss'],
})
export class ConfigComponent {
  constructor(private store: Store) {}

  changeTab(event: MatTabChangeEvent) {
    switch (event.index) {
      case 0:
      case 1:
        this.store.dispatch(changePreviewPage({previewPage: 'gauges'}));
        break;
      case 2:
        this.store.dispatch(changePreviewPage({previewPage: 'tables'}));
    }
  }
}
