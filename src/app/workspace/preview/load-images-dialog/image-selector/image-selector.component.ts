import {
  ElementRef,
  OnChanges,
  SimpleChanges} from '@angular/core';
import {
  Component,
  Input,
  ViewChild,
} from '@angular/core';
import { IMAGE_LABEL, IMAGE_MAX_SIZE, MIME_TYPE } from '../../models/images_metadata';
import { StateImageFieldsType } from '../../state/preview.state';
import {
  SnackBarService} from '../../../services/snack-bar.service';
import {
  SnackType,
} from '../../../services/snack-bar.service';
import { loadedImage } from '../../state/preview.actions';
import { Store } from '@ngrx/store';

enum ButtonState {
  LOAD = 'file_upload',
  LOADED = 'download_done',
}

@Component({
  selector: 'app-file-button[imageName]',
  templateUrl: './image-selector.component.html',
  styleUrls: ['./image-selector.component.scss'],
})
export class ImageSelectorComponent implements OnChanges {
  @ViewChild('preview') previewContainer?: ElementRef;

  MIME_TYPE = MIME_TYPE;
  label = '';
  restriction = '';
  state = ButtonState.LOAD;
  disabled = false;

  // This input is made mandatory by the selector, so it will always be set correctly.
  @Input() imageName: StateImageFieldsType = 'backgroundImage';

  @Input() currentImageUrl?: string;

  constructor(
    private readonly store: Store,
    private readonly snackBar: SnackBarService
  ) {}

  validateImage(image: HTMLImageElement): boolean {
    const restriction = IMAGE_MAX_SIZE[this.imageName];
    if (restriction.x && restriction.y) {
      if (
        image.naturalWidth !== restriction.x ||
        image.naturalHeight !== restriction.y
      ) {
        this.snackBar.open(
          `The image must be exactly ${restriction.x} by ${restriction.y} pixels.`,
          SnackType.ERROR
        );

        return false;
      }
    }
    if (
      restriction.pixels &&
      image.naturalWidth * image.naturalHeight > restriction.pixels
    ) {
      this.snackBar.open(
        `The image must have a maximum of ${restriction.pixels} pixels (WxH)`,
        SnackType.ERROR
      );
      return false;
    }
    return true;
  }

  onImageSelected(event: Event) {
    this.disabled = true;
    const input = event.currentTarget as HTMLInputElement;
    if (input.files && input.files.length) {
      this.ingestFile(input.files[0]);
    }
  }

  ingestFile(file: File) {
    // Reader for loading data into a blob and assigning it as image src.
    const reader = new FileReader();
    reader.onload = () => {
      if (!reader.result) return;
      // New image element.
      const image = new Image();
      image.src = URL.createObjectURL(
        new Blob([reader.result], { type: MIME_TYPE })
      );
      image
        .decode()
        .then(() => {
          if (this.validateImage(image)) {
            this.store.dispatch(
              loadedImage({ image: image, imageField: this.imageName })
            );
          }
          this.disabled = false;
        })
        .catch((encodingError) => {
          this.snackBar.open(
            `Error loading image: ${encodingError}`,
            SnackType.ERROR
          );
          this.disabled = false;
        });
    };
    reader.onerror = () => {
      this.snackBar.open('Failed to read image file.', SnackType.ERROR);
    };
    reader.readAsArrayBuffer(file);
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['currentImageUrl']) {
      if (this.currentImageUrl) {
        this.state = ButtonState.LOADED;
      } else {
        this.state = ButtonState.LOAD;
      }
    }
    if (changes['imageName']) {
      this.label = IMAGE_LABEL[this.imageName];
      const restriction = IMAGE_MAX_SIZE[this.imageName];
      this.restriction = restriction.pixels
        ? `Max ${restriction.pixels} pixels (WxH)`
        : restriction.x && restriction.y
        ? `Exactly ${restriction.x}x${restriction.y} pixels`
        : '';
    }
  }
}
