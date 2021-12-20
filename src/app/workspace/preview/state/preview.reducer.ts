import * as actions from './preview.actions';
import {PreviewState} from './preview.state';
import {createReducer, on} from '@ngrx/store';

export const PREVIEW_FEATURE_KEY = 'preview';

export const initialState: PreviewState = {
  needleAngle1: 0, needleAngle2: 0, needleAngle3: 0,
};

export const previewReducer = createReducer(initialState,
  on(actions.loadedImage, (state, {image, imageField}) => ({
    ...state, [imageField]: image,
  })),
  on(actions.moveNeedles, (state, {needleAngle1, needleAngle2, needleAngle3}) => ({
    ...state, needleAngle1, needleAngle2, needleAngle3,
  }))
);
