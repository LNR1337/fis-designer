import * as actions from './preview.actions';
import {PreviewState} from './preview.state';
import {createReducer, on} from '@ngrx/store';

export const PREVIEW_FEATURE_KEY = 'preview';

export const initialPreviewState: PreviewState = {
  needleAngle1: 0,
  needleAngle2: 0,
  needleAngle3: 0,
};

export const previewReducer = createReducer(
  initialPreviewState,
  // Image loaded. Save it to state.
  on(actions.saveImage, (state, {image, imageField}) => ({
    ...state,
    [imageField]: image,
  })),
  // Change needle angle.
  on(actions.moveNeedles, (state, {needleAngle1, needleAngle2, needleAngle3}) => ({
    ...state,
    needleAngle1,
    needleAngle2,
    needleAngle3,
  }))
);
