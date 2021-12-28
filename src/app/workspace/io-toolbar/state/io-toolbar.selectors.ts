import {createFeatureSelector, createSelector} from '@ngrx/store';
import {DISPLAY_FEATURE_KEY} from '../../config/display/state/display.reducer';
import {selectDisplayState} from '../../config/display/state/display.selectors';
import {IMAGES_FEATURE_KEY} from '../../image-manager/state/images.reducer';
import {selectImagesState} from '../../image-manager/state/images.selectors';
import {IO_TOOLBAR_FEATURE_KEY} from './io-toolbar.reducer';
import {IoToolbarState} from './io-toolbar.state';

const ioToolbarState = createFeatureSelector<IoToolbarState>(IO_TOOLBAR_FEATURE_KEY);

/** Selects existing config names. */
export const selectExistingConfigNames = createSelector(
  ioToolbarState,
  state => state.existingConfigNames
);

/** Selects a compound state object for saving. */
export const selectStateToSave = createSelector(
  selectDisplayState,
  selectImagesState,
  (displayState, imagesState) => ({
    [DISPLAY_FEATURE_KEY]: displayState,
    [IMAGES_FEATURE_KEY]: imagesState,
  })
);
