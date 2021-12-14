import { createReducer, on } from '@ngrx/store';

import {PreviewState, StateImageFields} from "./preview.state";
import * as actions from "./preview.actions";

export const PREVIEW_FEATURE_KEY = 'preview';

export const initialState: PreviewState = {};

export const previewReducer = createReducer(
  initialState,
  on(actions.loadedImage, (state, {image, imageField}) => ({ ...state, [imageField]: image })),
);
