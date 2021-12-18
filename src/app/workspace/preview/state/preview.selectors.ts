import {createFeatureSelector, createSelector} from '@ngrx/store';

import {PREVIEW_FEATURE_KEY} from './preview.reducer';
import {PreviewState} from './preview.state';
import {StateImageFields, StateImageFieldsType} from './preview.state';

const previewState = createFeatureSelector<PreviewState>(PREVIEW_FEATURE_KEY);

/** Selects all images from the state as an object. */
export const selectAllImages = createSelector(
  previewState,
  // Create a new object with only the image fields from state.
  state => (({...StateImageFields}) => ({...StateImageFields}))(state),
);

/** Selects all needle images from the state as an object. */
export const selectNeedleImages = createSelector(
  previewState,
  // Create a new object with only the image fields from state.
  state => (({...StateImageFields}) => ({...StateImageFields}))(state),
);

/** Selects a list of all image field names that are set. */
export const selectLoadedImageNames = createSelector(
  previewState,
  // Create a new object with only the image fields from state.
  state =>
    StateImageFields.map(fieldName => (state[fieldName] ? fieldName : undefined)).filter(
      (fieldName): fieldName is StateImageFieldsType => !!fieldName,
    ),
);
