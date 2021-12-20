import {Component, OnDestroy} from '@angular/core';
import {MatSlideToggleChange} from "@angular/material/slide-toggle";
import {Store} from "@ngrx/store";
import {Subscription, timer} from "rxjs";
import {GaugeConfig, getAbsoluteNeedleAngleBounds} from "../../../config/display/models/configs";
import {
  selectGaugeConfigs
} from "../../../config/display/state/display.selectors";
import {
  DisplayStateGaugeFieldsObject
} from "../../../config/display/state/display.state";
import {moveNeedles} from "../../state/preview.actions";

class SweepState {
  sweepDirection: -1 | 1 = 1; // 1 for up, -1 for down;
  currentAngle = 0;
  minAngle = 0;
  maxAngle = 0;

  constructor(minAngle: number, maxAngle: number) {
    // Needle images are vertical, pointing up, so their initial angle is PI/2.
    this.minAngle = minAngle + Math.PI / 2;
    this.maxAngle = maxAngle + Math.PI / 2;
    this.currentAngle = this.minAngle;
    // Make sure the bounds are in correct order.
    if (this.minAngle > this.maxAngle) {
      [this.minAngle, this.maxAngle] = [this.maxAngle, this.minAngle];
    }
  }

  advance() {
    this.currentAngle += this.sweepDirection * 0.01;
    if (this.currentAngle > this.maxAngle) {
      this.currentAngle = this.maxAngle;
      this.sweepDirection *= -1;
    }
    if (this.currentAngle < this.minAngle) {
      this.currentAngle = this.minAngle;
      this.sweepDirection *= -1;
    }
  }

}

@Component({
  selector: 'app-tester',
  templateUrl: './tester.component.html',
  styleUrls: ['./tester.component.scss']
})
export class TesterComponent implements OnDestroy {
  subscription = new Subscription();
  gaugeConfigs?: DisplayStateGaugeFieldsObject<GaugeConfig>;
  sweepSubscription?: Subscription;

  constructor(private readonly store: Store) {
    this.subscription.add(this.store.select(selectGaugeConfigs).subscribe((configs) => {
      this.gaugeConfigs = configs;
    }));
  }

  maybeUnsubscribe() {
    if (this.sweepSubscription) {
      this.sweepSubscription.unsubscribe();
    }
  }

  startSweeps() {
    this.maybeUnsubscribe();
    this.sweepSubscription = new Subscription();

    let [minAngle1, maxAngle1] = getAbsoluteNeedleAngleBounds(this.gaugeConfigs!.gauge1);
    let [minAngle2, maxAngle2] = getAbsoluteNeedleAngleBounds(this.gaugeConfigs!.gauge2);
    let [minAngle3, maxAngle3] = getAbsoluteNeedleAngleBounds(this.gaugeConfigs!.gauge3)

    const sweep1 = new SweepState(minAngle1, maxAngle1);
    const sweep2 = new SweepState(minAngle2, maxAngle2);
    const sweep3 = new SweepState(minAngle3, maxAngle3);


    // Start emitting sweep actions. Approx 60 fps.
    this.sweepSubscription.add(timer(0, 16.6).subscribe(() => {
      sweep1.advance();
      sweep2.advance();
      sweep3.advance();
      this.store.dispatch(moveNeedles({
        needleAngle1: sweep1.currentAngle,
        needleAngle2: sweep2.currentAngle,
        needleAngle3: sweep3.currentAngle,
      }));
    }));
  }

  stopSweeps() {
    this.maybeUnsubscribe();
    this.store.dispatch(moveNeedles({
      needleAngle1: 0, needleAngle2: 0, needleAngle3: 0,
    }));
  }

  sweepChange(event: MatSlideToggleChange) {
    if (event.checked) {
      this.startSweeps();
    } else {
      this.stopSweeps();
    }
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
    this.maybeUnsubscribe();
  }

}
