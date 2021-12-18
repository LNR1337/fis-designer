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
        this.redrawGauges();
      })
    );
    this.subscription.add(
      this.store.select(selectNeedleConfigs).subscribe((configs) => {
        this.needleConfigs = configs;
        this.redrawGauges();
      })
    );
    this.subscription.add(
      this.store.select(selectGaugeConfigs).subscribe((configs) => {
        this.gaugeConfigs = configs;
        this.redrawGauges();
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

  redrawGauges() {
    if (!this.displayCanvas || !this.images || !this.displayContext || !this.gaugeConfigs || !this.needleConfigs) return;

    // Clear the canvas.
    this.displayContext!.clearRect(0, 0, 800, 480);

    // Draw background.
    if (this.images.backgroundImage) {
      this.drawImage(this.images.backgroundImage, 0, 0);
    }

    // Draw needles.
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

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
