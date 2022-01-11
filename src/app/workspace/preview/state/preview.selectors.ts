import {createFeatureSelector, createSelector} from '@ngrx/store';
import {ImageStateFields, ImageStateFieldsType} from '../../image-manager/state/images.state';

import {PREVIEW_FEATURE_KEY} from './preview.reducer';
import {PreviewState} from './preview.state';

/** Selects the whole preview state. */
export const selectPreviewState = createFeatureSelector<PreviewState>(PREVIEW_FEATURE_KEY);

/** Selects all images from the preview state as an object. */
// TODO(pawelszydlo): find a way to return only the image holding fields.
export const selectAllImages = createSelector(selectPreviewState, state => state);

/** Selects a list of all image field names that are set. */
export const selectLoadedImageNames = createSelector(
  selectPreviewState,
  // Create a new object with only the image fields from state.
  state =>
    ImageStateFields.map(fieldName => (state[fieldName] ? fieldName : undefined)).filter(
      (fieldName): fieldName is ImageStateFieldsType => !!fieldName
    )
);

/** Selects current preview simulation variables. */
export const selectSimulationProgress = createSelector(
  selectPreviewState,
  previewState => previewState.simulationProgress
);

/** Selects currently highlighted config. */
export const selectHighlight = createSelector(selectPreviewState, state => state.activeHighlight);

/** Selects current preview page. */
export const selectPreviewPage = createSelector(selectPreviewState, state => state.previewPage);
