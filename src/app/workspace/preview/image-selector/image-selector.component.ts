import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { PartialStateImages } from '../state/preview.state';
import { selectImages } from '../state/preview.selectors';

@Component({
  selector: 'app-image-selector',
  templateUrl: './image-selector.component.html',
  styleUrls: ['./image-selector.component.scss'],
})
/**
 * This component is responsible showing all image inputs.
 */
export class ImageSelectorComponent {
  currentImages = new Observable<PartialStateImages<HTMLImageElement>>();

  constructor(readonly store: Store) {
    this.currentImages = store.select(selectImages);
  }
}
