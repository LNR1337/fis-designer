import {createFeatureSelector, createSelector} from '@ngrx/store';
import {forkJoin, of, tap} from 'rxjs';
import {loadImageFromBase64} from '../utils';

import {PREVIEW_FEATURE_KEY} from './preview.reducer';
import {PartialPreviewStateImageFieldsObject, PreviewState} from './preview.state';
import {PreviewStateImageFields, PreviewStateImageFieldsType} from './preview.state';

/** Selects the whole preview state. */
export const selectPreviewState = createFeatureSelector<PreviewState>(PREVIEW_FEATURE_KEY);

/** Selects all images from the state as an object. */
export const selectAllImages = createSelector(selectPreviewState,
  state => {
    const loadedImages: PartialPreviewStateImageFieldsObject<HTMLImageElement> =  {};
    const allImagesLoading = forkJoin(PreviewStateImageFields.map(fieldName => {
      const encodedData = state[fieldName];
      // forkJoin requires that all observables emit at least one value.
      if (!encodedData) return of(undefined);
      return loadImageFromBase64(encodedData, fieldName).pipe(
        tap(result => {
          if (typeof result === "string") {
            console.error(result);
          } else {
            loadedImages[fieldName] = result;
          }
        })
      );
    }));
    allImagesLoading.subscribe();
    return loadedImages;
  });

/** Selects a list of all image field names that are set. */
export const selectLoadedImageNames = createSelector(selectPreviewState,
  // Create a new object with only the image fields from state.
  state => PreviewStateImageFields.map(fieldName => (state[fieldName] ? fieldName : undefined))
                                  .filter(
                                    (fieldName): fieldName is PreviewStateImageFieldsType => !!fieldName));

/** Selects current needle angles. */
export const selectNeedleAngles = createSelector(selectPreviewState,
  previewState => [previewState.needleAngle1 ?? 0, previewState.needleAngle2 ?? 0,
    previewState.needleAngle3 ?? 0]);
