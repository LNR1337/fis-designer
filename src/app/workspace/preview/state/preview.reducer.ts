import * as actions from './preview.actions';
import {PreviewState} from './preview.state';
import {createReducer, on} from '@ngrx/store';

export const PREVIEW_FEATURE_KEY = 'preview';

export const initialState: PreviewState = {};

export const previewReducer = createReducer(
  initialState,
  on(actions.loadedImage, (state, {image, imageField}) => ({
    ...state,
    [imageField]: image,
  })),
);
