import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {EMPTY, withLatestFrom} from 'rxjs';
import {map, concatMap, catchError, tap} from 'rxjs/operators';
import {changedNeedleConfig, recalculateNeedleSize} from "./display.actions";
import {Store} from "@ngrx/store";
import {selectNeedleConfigs} from "./display.selectors";
import {selectAllImages} from "../../../preview/state/preview.selectors";
import {PreviewStateImageFieldsType} from "../../../preview/state/preview.state";


@Injectable()
export class DisplayEffects {

  recalculateNeedle = createEffect(() => this.actions$.pipe(
    ofType(recalculateNeedleSize),
    withLatestFrom(this.store.select(selectNeedleConfigs)),
    withLatestFrom(this.store.select(selectAllImages)),
    concatMap(([[action, needleConfigs], allImages]) => {
      console.log(allImages);
      const image = allImages[action.needleField as PreviewStateImageFieldsType];
      const config = needleConfigs[action.needleField];
      console.log(image, config);
      if (!image || !config) return [];
      return [changedNeedleConfig({
        config: {
          ...config,
          width: image.naturalWidth,
          height: image.naturalHeight
        }, displayConfigField: action.needleField
      })];
    })
  ));

  constructor(
    private actions$: Actions,
    private readonly store: Store,
  ) {
  }
}
