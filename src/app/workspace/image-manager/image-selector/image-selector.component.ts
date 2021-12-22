import {ElementRef, OnChanges, SimpleChanges} from '@angular/core';
import {Component, Input, ViewChild} from '@angular/core';
import {IMAGE_LABEL, IMAGE_MAX_SIZE, MIME_TYPE} from '../../preview/models/images_metadata';
import {SnackBarService} from '../../services/snack-bar.service';
import {SnackType} from '../../services/snack-bar.service';
import {validateAndSaveImageBuffer} from '../state/images.actions';
import {Store} from '@ngrx/store';
import {ImageStateFieldsType} from '../state/images.state';

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
  @Input() imageName: ImageStateFieldsType = 'backgroundImage';

  @Input() currentImageUrl?: string;

  constructor(private readonly store: Store, private readonly snackBar: SnackBarService) {}

  onImageSelected(event: Event) {
    this.disabled = true;
    const input = event.currentTarget as HTMLInputElement;
    if (input.files && input.files.length) {
      this.ingestFile(input.files[0]);
    }
  }

  /** Loads the file and sends the array buffer with an action. */
  ingestFile(file: File) {
    // Reader for loading data into a blob and assigning it as image src.
    const reader = new FileReader();
    reader.onload = () => {
      if (!reader.result) return;
      this.store.dispatch(
        validateAndSaveImageBuffer({
          imageBuffer: reader.result as ArrayBuffer,
          imageField: this.imageName,
        })
      );
      this.disabled = false;
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
