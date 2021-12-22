import {AfterViewInit, ElementRef, OnDestroy} from '@angular/core';
import {Component, ViewChild} from '@angular/core';
import {Store} from '@ngrx/store';
import {Subscription} from 'rxjs';
import {selectAllImages, selectNeedleAngles} from '../state/preview.selectors';
import {PartialPreviewStateImageFieldsObject} from '../state/preview.state';
import {
  DisplayStateFieldsType,
  DisplayStateGaugeFieldsObject,
  DisplayStateNeedleFieldsObject,
} from '../../config/display/state/display.state';
import {GaugeConfig, NeedleConfig} from '../../config/display/models/configs';
import {
  selectGaugeConfigs,
  selectHighlight,
  selectNeedleConfigs,
} from '../../config/display/state/display.selectors';
import {GaugesCompositor} from './gauges.compositor';

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
  images?: PartialPreviewStateImageFieldsObject<HTMLImageElement>;
  needleConfigs?: DisplayStateNeedleFieldsObject<NeedleConfig>;
  gaugeConfigs?: DisplayStateGaugeFieldsObject<GaugeConfig>;
  highlight?: DisplayStateFieldsType;
  needleAngles?: number[];

  constructor(private readonly store: Store) {
    this.subscription.add(
      this.store.select(selectAllImages).subscribe(images => {
        this.images = images;
        this.redrawAll();
      })
    );
    this.subscription.add(
      this.store.select(selectNeedleConfigs).subscribe(configs => {
        this.needleConfigs = configs;
        this.redrawAll();
      })
    );
    this.subscription.add(
      this.store.select(selectGaugeConfigs).subscribe(configs => {
        this.gaugeConfigs = configs;
        this.redrawAll();
      })
    );
    this.subscription.add(
      this.store.select(selectHighlight).subscribe(highlight => {
        this.highlight = highlight;
        this.redrawAll();
      })
    );
    this.subscription.add(
      this.store.select(selectNeedleAngles).subscribe(angles => {
        this.needleAngles = angles;
        this.redrawAll();
      })
    );
  }

  ngAfterViewInit() {
    if (!this.displayCanvas) {
      throw new Error('Failed to initialise canvas!');
    }
    // this.displayCanvas should be initialised at this point.
    this.compositor = new GaugesCompositor(this.displayCanvas.nativeElement.getContext('2d')!);
  }

  drawNeedles() {
    if (!this.compositor || !this.images || !this.needleConfigs) return;

    if (this.images.needleImage1) {
      const config = this.needleConfigs.needle1;
      this.compositor.drawImageRotatedAround(
        this.images.needleImage1,
        config.positionX!,
        config.positionY!,
        config.positionX! + config.centerX!,
        config.positionY! + config.centerY!,
        this.needleAngles![0]
      );
    }
    if (this.images.needleImage2) {
      const config = this.needleConfigs.needle2;
      this.compositor.drawImageRotatedAround(
        this.images.needleImage2,
        config.positionX!,
        config.positionY!,
        config.positionX! + config.centerX!,
        config.positionY! + config.centerY!,
        this.needleAngles![1]
      );
    }
    if (this.images.needleImage3) {
      const config = this.needleConfigs.needle3;
      this.compositor.drawImageRotatedAround(
        this.images.needleImage3,
        config.positionX!,
        config.positionY!,
        config.positionX! + config.centerX!,
        config.positionY! + config.centerY!,
        this.needleAngles![2]
      );
    }
  }

  redrawAll() {
    if (!this.compositor || !this.images || !this.gaugeConfigs || !this.needleConfigs) return;

    // Clear the canvas.
    this.compositor.clearImage();

    // Draw background.
    if (this.images.backgroundImage) {
      this.compositor.drawBackground(this.images.backgroundImage, !!this.highlight);
    }

    this.drawNeedles();

    // TODO(pawelszydlo): streamline this.
    switch (this.highlight) {
      case 'needle1':
        this.compositor.drawNeedleHighlight(this.needleConfigs.needle1);
        break;
      case 'needle2':
        this.compositor.drawNeedleHighlight(this.needleConfigs.needle2);
        break;
      case 'needle3':
        this.compositor.drawNeedleHighlight(this.needleConfigs.needle3);
        break;
      case 'gauge1':
        this.compositor.drawGaugeHighlight(this.gaugeConfigs.gauge1, this.needleConfigs.needle1);
        break;
      case 'gauge2':
        this.compositor.drawGaugeHighlight(this.gaugeConfigs.gauge2, this.needleConfigs.needle2);
        break;
      case 'gauge3':
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
