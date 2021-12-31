import {QueryList} from '@angular/core';
import {Component, ViewChildren} from '@angular/core';
import {Store} from '@ngrx/store';
import {Observable, tap} from 'rxjs';
import {PartialImageStateFieldsObject} from './state/images.state';
import {ImageStateFields} from './state/images.state';
import {IMAGE_FILENAME_MATCHERS, IMAGE_LABEL, MIME_TYPE} from './models/images_metadata';
import {selectAllImages} from '../preview/state/preview.selectors';
import {ImageSelectorComponent} from './image-selector/image-selector.component';
import {SnackBarService} from '../services/snack-bar.service';
import {assureDigitDimensions} from './utils';

@Component({
  selector: 'app-image-manager',
  templateUrl: './image-manager.html',
  styleUrls: ['./image-manager.component.scss'],
})
/**
 * This component is responsible showing all image inputs.
 */
export class ImageManagerComponent {
  /** Get a handle on all the file selector components. */
  @ViewChildren('imageInput') imageInputs?: QueryList<ImageSelectorComponent>;

  MIME_TYPE = MIME_TYPE;
  stateImageFields = ImageStateFields;
  currentImages = new Observable<PartialImageStateFieldsObject<HTMLImageElement>>();

  constructor(readonly store: Store, private readonly snackBar: SnackBarService) {
    this.currentImages = store.select(selectAllImages).pipe(
      tap(images => {
        const problematicDigit = assureDigitDimensions(images);
        if (problematicDigit) {
          this.snackBar.error(`${IMAGE_LABEL[problematicDigit]} has incorrect dimensions.`);
        }
      })
    );
  }

  onMultiImageSelected(event: Event) {
    if (!this.imageInputs) {
      console.error('What happened to the image input components?');
      return;
    }
    const input = event.currentTarget as HTMLInputElement;
    if (input.files && input.files.length) {
      let foundImages = 0;
      const notFoundImages: string[] = [];

      for (const file of Array.from(input.files)) {
        let found = false;
        for (const imageName of ImageStateFields) {
          const fileNameWithoutExt = file.name.endsWith('.png')
            ? file.name.slice(0, file.name.length - 4)
            : file.name;
          // If any of the regular expressions matches...
          if (IMAGE_FILENAME_MATCHERS[imageName].some(regExp => regExp.test(fileNameWithoutExt))) {
            // Find the correct input component to put the file in.
            for (const input of this.imageInputs) {
              if (input.imageName === imageName) {
                input.ingestFile(file);
                found = true;
                break;
              }
            }
          }
        }
        if (found) {
          foundImages++;
        } else {
          notFoundImages.push(file.name);
        }
      }

      if (notFoundImages.length) {
        this.snackBar.info(
          `Loaded ${foundImages} ${foundImages === 1 ? 'image' : 'images'}. Couldn't recognize ${
            notFoundImages.length
          }.`
        );
      } else {
        this.snackBar.info(`Successfully loaded all ${foundImages} images.`);
      }
    }
  }
}
