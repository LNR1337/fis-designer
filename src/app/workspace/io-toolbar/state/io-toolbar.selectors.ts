import {createFeatureSelector, createSelector} from '@ngrx/store';
import {IO_TOOLBAR_FEATURE_KEY} from './io-toolbar.reducer';
import {IoToolbarState} from './io-toolbar.state';

const ioToolbarState = createFeatureSelector<IoToolbarState>(IO_TOOLBAR_FEATURE_KEY);

/** Selects existing config names. */
export const selectExistingConfigNames = createSelector(
  ioToolbarState,
  state => state.existingConfigNames
);
