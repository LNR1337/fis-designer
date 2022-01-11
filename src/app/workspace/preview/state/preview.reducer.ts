import * as actions from './preview.actions';
import {PreviewState, SIMULATION_DISABLED} from './preview.state';
import {createReducer, on} from '@ngrx/store';

export const PREVIEW_FEATURE_KEY = 'preview';

export const initialPreviewState: PreviewState = {
  simulationProgress: SIMULATION_DISABLED,
  previewPage: 'gauges',
};

export const previewReducer = createReducer(
  initialPreviewState,
  // Image loaded. Save it to state.
  on(actions.saveImage, (state, {image, imageField}) => ({
    ...state,
    [imageField]: image,
  })),
  // Change simulation progress.
  on(actions.setSimulationProgress, (state, {progress}) => ({
    ...state,
    simulationProgress: progress,
  })),
  // Stop simulation.
  on(actions.stopSimulation, state => ({
    ...state,
    simulationProgress: SIMULATION_DISABLED,
  })),
  on(actions.enableHighlight, (state, {stateField}) => ({
    ...state,
    activeHighlight: stateField,
  })),
  on(actions.disableHighlight, state => ({
    ...state,
    activeHighlight: undefined,
  })),
  on(actions.changePreviewPage, (state, {previewPage}) => ({
    ...state,
    previewPage,
  }))
);
