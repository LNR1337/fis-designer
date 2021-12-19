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
  DisplayStateGaugeFieldsInterface,
  DisplayStateNeedleFieldsInterface
} from "../../config/display/state/display.state";
import {GaugeConfig, NeedleConfig} from "../../config/display/models/configs";
import {
  selectGaugeConfigs,
  selectNeedleConfigs
} from "../../config/display/state/display.selectors";

const RULER_COLOR = 'cyan';
const RULER_COLOR_HIGHLIGHTED = 'red';
const CENTER_TARGET_SIZE = 10;

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
  private displayContext?: CanvasRenderingContext2D;

  subscription = new Subscription();
  images?: PartialPreviewStateImageFieldsInterface<HTMLImageElement>;
  needleConfigs?: DisplayStateNeedleFieldsInterface<NeedleConfig>;
  gaugeConfigs?: DisplayStateGaugeFieldsInterface<GaugeConfig>;

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

    this.displayContext.strokeStyle = RULER_COLOR;
    this.displayContext.lineWidth = 1;

    // Needle position.
    this.displayContext.beginPath();
    this.displayContext.moveTo(config.positionX! + 0.5, 0);
    this.displayContext.lineTo(config.positionX!, config.positionY!);
    this.displayContext.lineTo(0, config.positionY!);
    this.displayContext.stroke();
    // Needle size.
    this.displayContext.strokeRect(config.positionX!, config.positionY!, config.width!, config.height!);
    // Needle center.
    const centerX = config.positionX! + config.centerX!;
    const centerY = config.positionY! + config.centerY!;
    this.displayContext.beginPath();
    this.displayContext.moveTo(centerX - CENTER_TARGET_SIZE, centerY);
    this.displayContext.lineTo(centerX + CENTER_TARGET_SIZE, centerY);
    this.displayContext.moveTo(centerX, centerY - CENTER_TARGET_SIZE);
    this.displayContext.lineTo(centerX, centerY + CENTER_TARGET_SIZE);
    this.displayContext.stroke();
    this.displayContext.beginPath();
    this.displayContext.ellipse(centerX, centerY, CENTER_TARGET_SIZE, CENTER_TARGET_SIZE, 0, 0, 2 * Math.PI);
    this.displayContext.stroke();


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
    this.drawNeedleHighlight(this.needleConfigs.needle1);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
