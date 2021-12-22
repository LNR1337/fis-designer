import {byteToBase64} from '../utils';
import * as actions from './preview.actions';
import {PreviewState} from './preview.state';
import {createReducer, on} from '@ngrx/store';

export const PREVIEW_FEATURE_KEY = 'preview';

export const initialState: PreviewState = {
  needleAngle1: 0, needleAngle2: 0, needleAngle3: 0,
};

export const previewReducer = createReducer(initialState,
  // Image loaded as array buffer. Convert it to base64 and store.
  on(actions.loadedImageBuffer, (state, {imageBuffer, imageField}) => ({
    ...state,[imageField]: byteToBase64(imageBuffer),
  })),
  // Change needle angle.
  on(actions.moveNeedles, (state, {needleAngle1, needleAngle2, needleAngle3}) => ({
    ...state, needleAngle1, needleAngle2, needleAngle3,
  })),
  // TODO(pawelszydlo): do some data sanitization!
  on(actions.loadPreviewStateFromObject, (state, {object}) => ({
    ...state,
    ...object,
  })),
);
