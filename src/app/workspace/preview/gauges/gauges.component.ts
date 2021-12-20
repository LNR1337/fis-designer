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

const CENTER_TARGET_SIZE = 10;
const INDICATOR_SIZE = 7;

@Component({
  selector: 'app-gauges',
  templateUrl: './gauges.component.html',
  styleUrls: ['./gauges.component.scss'],
})
export class GaugesComponent implements AfterViewInit, OnDestroy {
  // The main canvas to draw on.
  @ViewChild('displayCanvas', {static: false})
  displayCanvas?: ElementRef<HTMLCanvasElement>;
  // Context for the main canvas.
  displayContext?: CanvasRenderingContext2D;
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
    // this.displayCanvas should be initialised at this point.
    this.displayContext = this.displayCanvas!.nativeElement.getContext('2d')!;
  }

  drawImage(image: HTMLImageElement, x: number, y: number) {
    this.displayContext!.drawImage(image, x, y);
  }

  drawNeedleHighlight(config: NeedleConfig) {
    if (!this.displayCanvas || !this.displayContext) return;

    this.displayContext.lineWidth = 1;
    this.displayContext.globalAlpha = 0.7;

    // Needle position.
    this.displayContext.strokeStyle = 'cyan';
    this.displayContext.beginPath();
    this.displayContext.moveTo(config.positionX! + 0.5, 0.5);
    this.displayContext.lineTo(config.positionX! + 0.5, config.positionY! + 0.5);
    this.displayContext.lineTo(0.5, config.positionY! + 0.5);
    this.displayContext.stroke();

    // Needle size.
    this.displayContext.strokeStyle = 'yellow';
    this.displayContext.strokeRect(config.positionX! + 0.5, config.positionY! + 0.5, config.width! - 1, config.height! - 1);

    // Needle center.
    this.displayContext.strokeStyle = 'yellow';
    const centerX = config.positionX! + config.centerX! + 0.5;
    const centerY = config.positionY! + config.centerY! + 0.5;
    this.displayContext.beginPath();
    this.displayContext.moveTo(0, centerY);
    this.displayContext.lineTo(799, centerY);
    this.displayContext.moveTo(centerX, 0);
    this.displayContext.lineTo(centerX, 479);
    this.displayContext.stroke();
    this.displayContext.beginPath();
    this.displayContext.ellipse(centerX, centerY, CENTER_TARGET_SIZE, CENTER_TARGET_SIZE, 0, 0, 2 * Math.PI);
    this.displayContext.stroke();

    // Indicator.
    this.displayContext.strokeStyle = 'cyan';
    if (config.indicatorPositionX && config.indicatorPositionY) {
      this.displayContext.beginPath();
      this.displayContext.ellipse(config.indicatorPositionX + 0.5 - 3, config.indicatorPositionY + 0.5 - 3, INDICATOR_SIZE, INDICATOR_SIZE, 0, 0, 2 * Math.PI);
      this.displayContext.stroke();
    }

    this.displayContext.setLineDash([]);
    this.displayContext.globalAlpha = 1;
  }

  drawNeedles() {
    if (!this.displayCanvas || !this.images || !this.displayContext || !this.needleConfigs) return;

    if (this.images.needleImage1) {
      this.drawImage(this.images.needleImage1, this.needleConfigs.needle1.positionX!, this.needleConfigs.needle1.positionY!);
    }
    if (this.images.needleImage2) {
      this.drawImage(this.images.needleImage2, this.needleConfigs.needle2.positionX!, this.needleConfigs.needle2.positionY!);
    }
    if (this.images.needleImage3) {
      this.drawImage(this.images.needleImage3, this.needleConfigs.needle3.positionX!, this.needleConfigs.needle3.positionY!);
    }
  }

  redrawAll() {
    if (!this.displayCanvas || !this.images || !this.displayContext || !this.gaugeConfigs || !this.needleConfigs) return;

    // Clear the canvas.
    this.displayContext!.clearRect(0, 0, 800, 480);

    // Draw background.
    if (this.images.backgroundImage) {
      this.drawImage(this.images.backgroundImage, 0, 0);
    }

    this.drawNeedles();

    // TODO(pawelszydlo): streamline this.
    switch (this.highlight) {
      case('needle1'):
        this.drawNeedleHighlight(this.needleConfigs.needle1);
        break;
      case('needle2'):
        this.drawNeedleHighlight(this.needleConfigs.needle2);
        break;
      case('needle3'):
        this.drawNeedleHighlight(this.needleConfigs.needle3);
        break;
      default:
        break;
    }
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
