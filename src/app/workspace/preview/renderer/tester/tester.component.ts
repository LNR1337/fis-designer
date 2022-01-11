import {Component, OnDestroy} from '@angular/core';
import {MatSlideToggleChange} from '@angular/material/slide-toggle';
import {Store} from '@ngrx/store';
import {Subscription, timer} from 'rxjs';
import {setSimulationProgress, stopSimulation} from '../../state/preview.actions';
import {SIMULATION_DISABLED} from '../../state/preview.state';

// 16.6 ms = 60 fps.
const TICK_DURATION = 16.6;
// 4 seconds for full sweep.
const PROGRESS_STEP = 100 / (4 * (1000 / TICK_DURATION));

@Component({
  selector: 'app-tester',
  templateUrl: './tester.component.html',
  styleUrls: ['./tester.component.scss'],
})
export class TesterComponent implements OnDestroy {
  progress: number = SIMULATION_DISABLED;
  goingDown = false;
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

    // Start emitting simulation progress changes. Approx 60 fps.
    this.sweepSubscription.add(
      timer(0, TICK_DURATION).subscribe(() => {
        if (this.goingDown) {
          this.progress -= PROGRESS_STEP;
          if (this.progress <= 0) {
            this.progress = 0;
            this.goingDown = false;
          }
        } else {
          // Going up.
          this.progress += PROGRESS_STEP;
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
