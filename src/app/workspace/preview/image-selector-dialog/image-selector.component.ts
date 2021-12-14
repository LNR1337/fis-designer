import {Component} from '@angular/core';
import {StateImageFieldsType} from "../state/preview.state";
import {Store} from "@ngrx/store";
import {loadedImage} from "../state/preview.actions";
import {IMAGE_MAX_SIZE, MIME_TYPE} from "./image_restrictions";

@Component({
  selector: 'image-selector',
  templateUrl: './image-selector.component.html',
  styleUrls: ['./image-selector.component.scss']
})
/**
 * This dialog is responsible for loading images and dispatching actions with their contents.
 */
export class ImageSelectorDialog {

  constructor(private readonly store: Store) {
  }

  validateImage(image: HTMLImageElement, imageName: StateImageFieldsType): boolean {
    const restriction = IMAGE_MAX_SIZE[imageName];
    if (restriction.x && restriction.y) {
      if (image.naturalWidth !== restriction.x || image.naturalHeight !== restriction.y) {
        console.error(`The image must be exactly ${restriction.x} by ${restriction.y} pixels.`);
        return false;
      }
    }
    if (restriction.pixels && (image.naturalWidth * image.naturalHeight > restriction.pixels)) {
      console.error(`The image must have a maximum of ${restriction.pixels} pixels (WxH)`)
      return false;
    }
    return true;
  }

  onImageSelected(event: Event, imageName: StateImageFieldsType) {
    const input = event.currentTarget as HTMLInputElement;
    if (input.files && input.files.length) {
      // Reader for loading data into a blob and assigning it as image src.
      const reader = new FileReader();
      reader.onload = () => {
        if (!reader.result) return;
        // New image element.
        const image = new Image();
        image.src = URL.createObjectURL(new Blob([reader.result], {type: MIME_TYPE}));
        image.decode()
          .then(() => {
            if (this.validateImage(image, imageName)) {
              this.store.dispatch(loadedImage({image: image, imageField: imageName}));
            }
          })
          .catch((encodingError) => {
            console.error('Error loading image! ', encodingError);
          })
      }
      reader.onerror = () => {
        console.error('Failed to load image file.');
      }
      reader.readAsArrayBuffer(input.files[0]);
    }
  }
}
