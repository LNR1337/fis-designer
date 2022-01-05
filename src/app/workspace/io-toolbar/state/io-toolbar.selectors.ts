import {createFeatureSelector, createSelector} from '@ngrx/store';
import {CONFIG_FEATURE_KEY} from '../../config/state/config.reducer';
import {selectConfigState} from '../../config/state/config.selectors';
import {IMAGES_FEATURE_KEY} from '../../image-manager/state/images.reducer';
import {selectImagesState} from '../../image-manager/state/images.selectors';
import {getCompoundState} from '../serialization-utils';
import {IO_TOOLBAR_FEATURE_KEY} from './io-toolbar.reducer';
import {IoToolbarState} from './io-toolbar.state';

const ioToolbarState = createFeatureSelector<IoToolbarState>(IO_TOOLBAR_FEATURE_KEY);

/** Selects existing config names. */
export const selectExistingConfigNames = createSelector(
  ioToolbarState,
  state => state.existingConfigNames
);

/** Selects a compound state object for saving. */
export const selectCompoundState = createSelector(
  selectConfigState,
  selectImagesState,
  (configState, imagesState) => getCompoundState(configState, imagesState)
);
