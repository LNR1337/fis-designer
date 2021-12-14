import { Component, ElementRef, AfterViewInit, OnDestroy, ViewChild } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {ImageSelectorDialog} from "../image-selector-dialog/image-selector.component";
import {Store} from "@ngrx/store";
import {Subscription, Observable, tap} from "rxjs";
import {selectImages} from "../state/preview.selectors";
import {StateImageFields, StateImageFieldsType} from "../state/preview.state";

@Component({
  selector: 'gauges',
  templateUrl: './gauges.component.html',
  styleUrls: ['./gauges.component.scss']
})
export class GaugesComponent implements AfterViewInit, OnDestroy {

  // The main canvas to draw on.
  @ViewChild('displayCanvas', {static: false}) displayCanvas?: ElementRef<HTMLCanvasElement>;
  // Context for the main canvas.
  private displayContext?: CanvasRenderingContext2D;

  subscription = new Subscription();
  images?: Partial<Record<StateImageFieldsType, HTMLImageElement|undefined>>;


  constructor(public dialog: MatDialog, private readonly store: Store) {
    this.subscription.add(
      this.store.select(selectImages).subscribe(images => {
        this.images = images;
        this.redrawGauges();
      })
    );
  }

  ngAfterViewInit() {
    // this.displayCanvas should be initialised at this point.
    this.displayContext = this.displayCanvas!.nativeElement.getContext('2d')!;
  }

  drawImage(image: HTMLImageElement, x: number, y:number) {
    this.displayContext!.drawImage(image, x, y);
  }

  redrawGauges() {
    if (!this.displayCanvas || !this.images || !this.displayContext) return;

    // Clear the canvas.
    this.displayContext!.clearRect(0, 0, 800, 480);

    // Draw background.
    if (this.images.backgroundImage) {
      this.drawImage(this.images.backgroundImage, 0, 0);
    }
  }

  openFileSelectorDialog() {
    const dialogRef = this.dialog.open(ImageSelectorDialog, {
      width: '400px',
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe()
  }

}
