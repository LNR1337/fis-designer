import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {withLatestFrom} from 'rxjs';
import {concatMap, tap} from 'rxjs/operators';
import {changedNeedleConfig, recalculateNeedleSize} from './display.actions';
import {Store} from '@ngrx/store';
import {selectNeedleConfigs} from './display.selectors';
import {selectAllImages} from '../../../preview/state/preview.selectors';

@Injectable()
export class DisplayEffects {
  debug = createEffect(
    () => this.actions$.pipe(tap(action => console.log(`ACTION: ${action.type}`, action))),
    {dispatch: false}
  );

  /** Effect to recalculate needle dimensions based on needle image. */
  recalculateNeedle = createEffect(() =>
    this.actions$.pipe(
      ofType(recalculateNeedleSize),
      withLatestFrom(this.store.select(selectNeedleConfigs)),
      withLatestFrom(this.store.select(selectAllImages)),
      concatMap(([[action, needleConfigs], allImages]) => {
        const image = allImages[action.previewStateImageField];
        const config = needleConfigs[action.displayStateNeedleField];
        if (!image || !config) return [];
        return [
          changedNeedleConfig({
            config: {
              ...config,
              width: image.naturalWidth,
              height: image.naturalHeight,
            },
            displayConfigField: action.displayStateNeedleField,
          }),
        ];
      })
    )
  );

  constructor(private actions$: Actions, private readonly store: Store) {}
}
