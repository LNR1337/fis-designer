import {Component, Input, OnDestroy} from '@angular/core';
import {MatSlideToggleChange} from '@angular/material/slide-toggle';
import {Store} from '@ngrx/store';
import {Subscription, timer} from 'rxjs';
import {setSimulationProgress, stopSimulation} from '../../state/preview.actions';
import {PreviewPage, SIMULATION_DISABLED} from '../../state/preview.state';

@Component({
  selector: 'app-tester',
  templateUrl: './tester.component.html',
  styleUrls: ['./tester.component.scss'],
})
export class TesterComponent implements OnDestroy {
  progress: number = SIMULATION_DISABLED;
  goingDown = false;
  @Input() previewPage: PreviewPage = 'gauges';
  sweepSubscription?: Subscription;

  constructor(private readonly store: Store) {}

  maybeUnsubscribe() {
    if (this.sweepSubscription) {
      this.sweepSubscription.unsubscribe();
    }
  }

  startSweeps() {
    this.maybeUnsubscribe();
    this.sweepSubscription = new Subscription();
    this.progress = 0;

    let tickDuration = 1000 / 60;
    let progressStep = 100 / (4 * (1000 / tickDuration));
    if (this.previewPage === 'tables') {
      tickDuration = 1000 / 5;
      progressStep = 100 / (8 * (1000 / tickDuration));
    }

    // Start emitting simulation progress changes. Approx 60 fps.
    this.sweepSubscription.add(
      timer(0, tickDuration).subscribe(() => {
        if (this.goingDown) {
          this.progress -= progressStep;
          if (this.progress <= 0) {
            this.progress = 0;
            this.goingDown = false;
          }
        } else {
          // Going up.
          this.progress += progressStep;
          if (this.progress >= 100) {
            this.progress = 100;
            this.goingDown = true;
          }
        }
        this.store.dispatch(setSimulationProgress({progress: this.progress}));
      })
    );
  }

  stopSweeps() {
    this.maybeUnsubscribe();
    this.store.dispatch(stopSimulation());
  }

  sweepChange(event: MatSlideToggleChange) {
    if (event.checked) {
      this.startSweeps();
    } else {
      this.stopSweeps();
    }
  }

  ngOnDestroy() {
    this.maybeUnsubscribe();
  }
}
