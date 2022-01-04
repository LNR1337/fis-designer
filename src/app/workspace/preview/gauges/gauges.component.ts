import {AfterViewInit, ElementRef, OnDestroy} from '@angular/core';
import {Component, ViewChild} from '@angular/core';
import {Store} from '@ngrx/store';
import {Observable, Subscription} from 'rxjs';
import {PartialImageStateFieldsObject} from '../../image-manager/state/images.state';
import {selectAllImages, selectNeedleAngles} from '../state/preview.selectors';
import {
  ConfigStateFieldsType,
  ConfigStateGaugeFieldsObject,
  ConfigStateGeneralFieldsConfig,
  ConfigStateNeedleFieldsObject,
  ConfigStateNumericalFieldsObject,
} from '../../config/state/config.state';
import {GaugeConfig, NeedleConfig, NumericalConfig} from '../../config/models/configs';
import {
  selectGaugeConfigs,
  selectGeneralFieldsConfig,
  selectHighlight,
  selectNeedleConfigs,
  selectNumericalConfigs,
} from '../../config/state/config.selectors';
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
  images?: PartialImageStateFieldsObject<HTMLImageElement>;
  needleConfigs?: ConfigStateNeedleFieldsObject<NeedleConfig>;
  gaugeConfigs?: ConfigStateGaugeFieldsObject<GaugeConfig>;
  numericalConfigs?: ConfigStateNumericalFieldsObject<NumericalConfig>;
  generalConfig?: ConfigStateGeneralFieldsConfig;
  highlight?: ConfigStateFieldsType;
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
      this.store.select(selectNumericalConfigs).subscribe(configs => {
        this.numericalConfigs = configs;
        this.redrawAll();
      })
    );
    this.subscription.add(
      this.store.select(selectGeneralFieldsConfig).subscribe(config => {
        this.generalConfig = config;
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
    if (
      !this.compositor ||
      !this.images ||
      !this.gaugeConfigs ||
      !this.needleConfigs ||
      !this.numericalConfigs ||
      !this.generalConfig
    )
      return;

    // Clear the canvas.
    this.compositor.clearImage();

    // Draw background.
    if (this.images.backgroundImage) {
      this.compositor.drawBackground(this.images.backgroundImage, !!this.highlight);
    }

    // Draw the needles.
    this.drawNeedles();

    // Draw the status bar.
    if (!this.generalConfig?.hideStatusBarOnGauge) {
      this.compositor.drawStatusBar();
    }

    // Draw the highlights and guides.
    // TODO(pawelszydlo): streamline this.
    switch (this.highlight) {
      case 'hideStatusBarOnGauge':
        this.compositor.drawStatusBarHighlight();
        break;
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
      case 'numerical1':
        this.compositor.drawNumericalHighlight(
          this.numericalConfigs.numerical1,
          this.generalConfig
        );
        break;
      case 'numerical2':
        this.compositor.drawNumericalHighlight(
          this.numericalConfigs.numerical2,
          this.generalConfig
        );
        break;
      case 'numerical3':
        this.compositor.drawNumericalHighlight(
          this.numericalConfigs.numerical3,
          this.generalConfig
        );
        break;
      case 'numerical4':
        this.compositor.drawNumericalHighlight(
          this.numericalConfigs.numerical4,
          this.generalConfig
        );
        break;
      case 'numerical5':
        this.compositor.drawNumericalHighlight(
          this.numericalConfigs.numerical5,
          this.generalConfig
        );
        break;
      case 'numerical6':
        this.compositor.drawNumericalHighlight(
          this.numericalConfigs.numerical6,
          this.generalConfig
        );
        break;
      case 'numerical7':
        this.compositor.drawNumericalHighlight(
          this.numericalConfigs.numerical7,
          this.generalConfig
        );
        break;
      case 'numerical8':
        this.compositor.drawNumericalHighlight(
          this.numericalConfigs.numerical8,
          this.generalConfig
        );
        break;
      case 'numerical9':
        this.compositor.drawNumericalHighlight(
          this.numericalConfigs.numerical9,
          this.generalConfig
        );
        break;
      case 'numerical10':
        this.compositor.drawNumericalHighlight(
          this.numericalConfigs.numerical10,
          this.generalConfig
        );
        break;
      case 'fontWidth': // Placeholder for all digital gauges setup.
        this.compositor.drawGTIHighlight(
          this.generalConfig,
          this.needleConfigs.needle1,
          this.needleConfigs.needle2,
          this.needleConfigs.needle3
        );
        this.compositor.drawNumericalHighlight(
          this.numericalConfigs.numerical1,
          this.generalConfig,
          false
        );
        this.compositor.drawNumericalHighlight(
          this.numericalConfigs.numerical2,
          this.generalConfig,
          false
        );
        this.compositor.drawNumericalHighlight(
          this.numericalConfigs.numerical3,
          this.generalConfig,
          false
        );
        this.compositor.drawNumericalHighlight(
          this.numericalConfigs.numerical4,
          this.generalConfig,
          false
        );
        this.compositor.drawNumericalHighlight(
          this.numericalConfigs.numerical5,
          this.generalConfig,
          false
        );
        this.compositor.drawNumericalHighlight(
          this.numericalConfigs.numerical6,
          this.generalConfig,
          false
        );
        this.compositor.drawNumericalHighlight(
          this.numericalConfigs.numerical7,
          this.generalConfig,
          false
        );
        this.compositor.drawNumericalHighlight(
          this.numericalConfigs.numerical8,
          this.generalConfig,
          false
        );
        this.compositor.drawNumericalHighlight(
          this.numericalConfigs.numerical9,
          this.generalConfig,
          false
        );
        this.compositor.drawNumericalHighlight(
          this.numericalConfigs.numerical10,
          this.generalConfig,
          false
        );
        break;

      default:
        break;
    }
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
