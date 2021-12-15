import { createFeatureSelector, createSelector } from '@ngrx/store';
import { StateImageFields, PreviewState } from './preview.state';
import { PREVIEW_FEATURE_KEY } from './preview.reducer';

const workspaceState = createFeatureSelector<PreviewState>(PREVIEW_FEATURE_KEY);

/** Selects all images from the state as an object. */
export const selectImages = createSelector(
  workspaceState,
  // Create a new object with only the image fields from state.
  (state) => (({ ...StateImageFields }) => ({ ...StateImageFields }))(state)
);
