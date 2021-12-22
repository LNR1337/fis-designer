import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {Store} from '@ngrx/store';
import {map} from 'rxjs/operators';
import {SnackBarService, SnackType} from '../../services/snack-bar.service';
import {loadImageFromArrayBuffer} from '../utils';
import {saveImageBuffer, validateAndSaveImageBuffer} from './preview.actions';

@Injectable()
export class PreviewEffects {
  /** Effect to recalculate needle dimensions based on needle image. */
  validateAndSaveImageBuffer = createEffect(
    () =>
      this.actions$.pipe(
        ofType(validateAndSaveImageBuffer),
        map(({imageBuffer, imageField}) => {
          loadImageFromArrayBuffer(imageBuffer, imageField).subscribe(result => {
            // String result means an error.
            if (typeof result === 'string') {
              this.snackBar.open(result, SnackType.ERROR);
            } else {
              this.store.dispatch(saveImageBuffer({imageBuffer, imageField}));
            }
          });
        })
      ),
    {dispatch: false}
  );

  constructor(
    private actions$: Actions,
    private readonly snackBar: SnackBarService,
    private readonly store: Store
  ) {}
}
