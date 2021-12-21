import {createFeatureSelector, createSelector} from '@ngrx/store';

import {PREVIEW_FEATURE_KEY} from './preview.reducer';
import {PreviewState} from './preview.state';
import {PreviewStateImageFields, PreviewStateImageFieldsType} from './preview.state';

/** Selects the whole preview state. */
export const selectPreviewState = createFeatureSelector<PreviewState>(PREVIEW_FEATURE_KEY);

/** Selects all images from the state as an object. */
export const selectAllImages = createSelector(selectPreviewState,
  // TODO(pawelszydlo): Create a new object with only the image fields from state.
  state => state);

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
