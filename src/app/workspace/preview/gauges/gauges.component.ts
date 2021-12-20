import {
  AfterViewInit,
  ElementRef,
  OnDestroy
} from '@angular/core';
import {
  Component,
  ViewChild,
} from '@angular/core';
import {Store} from '@ngrx/store';
import {Subscription} from 'rxjs';
import {selectAllImages} from '../state/preview.selectors';
import {PartialPreviewStateImageFieldsInterface} from '../state/preview.state';
import {
  DisplayStateFieldsType,
  DisplayStateGaugeFieldsInterface,
  DisplayStateNeedleFieldsInterface
} from "../../config/display/state/display.state";
import {GaugeConfig, NeedleConfig} from "../../config/display/models/configs";
import {
  selectGaugeConfigs, selectHighlight,
  selectNeedleConfigs
} from "../../config/display/state/display.selectors";
import {GaugesCompositor} from "./gauges.compositor";

@Component({
  selector: 'app-gauges',
  templateUrl: './gauges.component.html',
  styleUrls: ['./gauges.component.scss'],
})
export class GaugesComponent implements AfterViewInit, OnDestroy {
  // The main canvas to draw on.
  @ViewChild('displayCanvas', {static: false})
  displayCanvas?: ElementRef<HTMLCanvasElement>;
  // Rendering compositor.
  compositor?: GaugesCompositor;

  subscription = new Subscription();
  images?: PartialPreviewStateImageFieldsInterface<HTMLImageElement>;
  needleConfigs?: DisplayStateNeedleFieldsInterface<NeedleConfig>;
  gaugeConfigs?: DisplayStateGaugeFieldsInterface<GaugeConfig>;
  highlight?: DisplayStateFieldsType;

  constructor(private readonly store: Store) {
    this.subscription.add(
      this.store.select(selectAllImages).subscribe((images) => {
        this.images = images;
        this.redrawAll();
      })
    );
    this.subscription.add(
      this.store.select(selectNeedleConfigs).subscribe((configs) => {
        this.needleConfigs = configs;
        this.redrawAll();
      })
    );
    this.subscription.add(
      this.store.select(selectGaugeConfigs).subscribe((configs) => {
        this.gaugeConfigs = configs;
        this.redrawAll();
      })
    );
    this.subscription.add(
      this.store.select(selectHighlight).subscribe((highlight) => {
        this.highlight = highlight;
        this.redrawAll();
      })
    );
  }

  ngAfterViewInit() {
    if (!this.displayCanvas) {
      throw new Error('Failed to initialise canvas!');
    }
    // this.displayCanvas should be initialised at this point.
    this.compositor = new GaugesCompositor(
      this.displayCanvas.nativeElement.getContext('2d')!);
  }

  drawNeedles() {
    if (!this.compositor || !this.images || !this.needleConfigs) return;

    if (this.images.needleImage1) {
      this.compositor.drawImage(this.images.needleImage1, this.needleConfigs.needle1.positionX!, this.needleConfigs.needle1.positionY!);
    }
    if (this.images.needleImage2) {
      this.compositor.drawImage(this.images.needleImage2, this.needleConfigs.needle2.positionX!, this.needleConfigs.needle2.positionY!);
    }
    if (this.images.needleImage3) {
      this.compositor.drawImage(this.images.needleImage3, this.needleConfigs.needle3.positionX!, this.needleConfigs.needle3.positionY!);
    }
  }

  redrawAll() {
    if (!this.compositor || !this.images || !this.gaugeConfigs || !this.needleConfigs) return;

    // Clear the canvas.
    this.compositor.clearImage()

    // Draw background.
    if (this.images.backgroundImage) {
      this.compositor.drawImage(this.images.backgroundImage, 0, 0);
    }

    this.drawNeedles();

    // TODO(pawelszydlo): streamline this.
    switch (this.highlight) {
      case('needle1'):
        this.compositor.drawNeedleHighlight(this.needleConfigs.needle1);
        break;
      case('needle2'):
        this.compositor.drawNeedleHighlight(this.needleConfigs.needle2);
        break;
      case('needle3'):
        this.compositor.drawNeedleHighlight(this.needleConfigs.needle3);
        break;
      case('gauge1'):
        this.compositor.drawGaugeHighlight(this.gaugeConfigs.gauge1, this.needleConfigs.needle3);
        break;
      case('gauge2'):
        this.compositor.drawGaugeHighlight(this.gaugeConfigs.gauge2, this.needleConfigs.needle3);
        break;
      case('gauge3'):
        this.compositor.drawGaugeHighlight(this.gaugeConfigs.gauge3, this.needleConfigs.needle3);
        break;
      default:
        break;
    }
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
