import {Component, OnDestroy} from '@angular/core';
import {Title} from '@angular/platform-browser';
import {Store} from '@ngrx/store';
import {Subscription} from 'rxjs';
import {selectConfigName} from './config/state/config.selectors';

@Component({
  selector: 'app-workspace',
  templateUrl: './workspace.component.html',
  styleUrls: ['./workspace.component.scss'],
})
export class WorkspaceComponent implements OnDestroy {
  subscription = new Subscription();

  constructor(titleService: Title, store: Store) {
    titleService.setTitle('FIS-Designer');
    this.subscription.add(
      store.select(selectConfigName).subscribe(name => {
        if (name) {
          titleService.setTitle(`FIS-Designer - ${name}`);
        }
      })
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
