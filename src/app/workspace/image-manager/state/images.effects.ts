import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {Store} from '@ngrx/store';
import {concatMap, map} from 'rxjs/operators';
import {saveImage} from '../../preview/state/preview.actions';
import {SnackBarService} from '../../services/snack-bar.service';
import {base64ToArrayBuffer, loadImageFromArrayBuffer} from '../../preview/utils';
import {
  loadImagesStateFromObject,
  saveImageBuffer,
  validateAndSaveImageBuffer,
} from './images.actions';
import {ImageStateFields} from './images.state';

@Injectable()
export class ImagesEffects {
  /** Effect to validate the image and show an error or save to state. */
  validateAndSaveImageBuffer = createEffect(
    () =>
      this.actions$.pipe(
        ofType(validateAndSaveImageBuffer),
        map(({imageBuffer, imageField}) => {
          loadImageFromArrayBuffer(imageBuffer, imageField).subscribe(result => {
            // String result means an error.
            if (typeof result === 'string') {
              this.snackBar.error(result);
            } else {
              this.store.dispatch(saveImageBuffer({imageBuffer, imageField}));
              this.store.dispatch(saveImage({image: result, imageField}));
            }
          });
        })
      ),
    {dispatch: false}
  );

  /** Effect to restore images state from object, i.e. reloading all images. */
  loadImagesStateFromObject = createEffect(() =>
    this.actions$.pipe(
      ofType(loadImagesStateFromObject),
      concatMap(({maybeState}) => {
        return ImageStateFields.map(imageField => [imageField, maybeState[imageField]])
          .filter(([imageField, data]) => !!data)
          .map(([imageField, data]) =>
            validateAndSaveImageBuffer({
              imageBuffer: base64ToArrayBuffer(data),
              imageField,
            })
          );
      })
    )
  );

  constructor(
    private actions$: Actions,
    private readonly snackBar: SnackBarService,
    private readonly store: Store
  ) {}
}
