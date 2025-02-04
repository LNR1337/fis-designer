import {AfterViewInit, ElementRef, OnDestroy , Renderer2 } from '@angular/core';
import {Component, ViewChild} from '@angular/core';
import {Store} from '@ngrx/store';
import {selectPreviewPage} from '../state/preview.selectors';
import {PreviewPage} from '../state/preview.state';
import {Compositor} from './common.compositor';
import {GaugesCompositor} from './gauges.compositor';
import {TablesCompositor} from './tables.compositor';

@Component({
  selector: 'app-renderer',
  templateUrl: './renderer.component.html',
  styleUrls: ['./renderer.component.scss'],
})
export class RendererComponent implements AfterViewInit, OnDestroy {
  // The main canvas to draw on.
  @ViewChild('displayCanvas', {static: false}) displayCanvas?: ElementRef<HTMLCanvasElement>;
  @ViewChild('container', { static: true }) container?: ElementRef = undefined;

  // Currently active compositor.
  currentCompositor?: Compositor;
  previewPage: PreviewPage = 'gauges';

  constructor(private readonly store: Store,private renderer: Renderer2) {}

  ngAfterViewInit() {
    this.store.select(selectPreviewPage).subscribe(page => {
      if (!this.displayCanvas) {
        throw new Error('Failed to initialise canvas!');
      }
      this.previewPage = page;
      if (page === 'gauges') {
        if (!(this.currentCompositor instanceof GaugesCompositor)) {
          this.currentCompositor?.destroy();

          this.currentCompositor = new GaugesCompositor(
            this.displayCanvas.nativeElement.getContext('2d')!,
            this.store
          );
        }
      } else if (page === 'tables') {
        if (!(this.currentCompositor instanceof TablesCompositor)) {
          this.currentCompositor?.destroy();
          this.currentCompositor = new TablesCompositor(
            this.displayCanvas.nativeElement.getContext('2d')!,
            this.store
          );
        }
      }
      this.currentCompositor?.redrawAll();
    });
    
  }

  zoomLevel = 1;
  zoomIn() {
    if (this.zoomLevel < 1.5) {
      this.zoomLevel += 0.1;
      console.log(this.zoomLevel);
      this.renderer.setStyle(this.container?.nativeElement, 'transform', `scale(${this.zoomLevel})`);
    }
  }

  zoomOut() {
    if (this.zoomLevel > 0.5) {
      this.zoomLevel -= 0.1;
      this.renderer.setStyle(this.container?.nativeElement, 'transform', `scale(${this.zoomLevel})`);
    }
  }

  ngOnDestroy() {
    this.currentCompositor!.destroy();
  }
}
