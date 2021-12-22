import {createReducer, on} from '@ngrx/store';
import {byteToBase64} from '../../preview/utils';
import * as actions from './images.actions';
import {ImagesState} from './images.state';

export const IMAGES_FEATURE_KEY = 'images';

export const initialImagesState: ImagesState = {};

export const imagesReducer = createReducer(
  initialImagesState,
  // Image loaded as array buffer. Convert it to base64 and store.
  on(actions.saveImageBuffer, (state, {imageBuffer, imageField}) => ({
    ...state,
    [imageField]: byteToBase64(imageBuffer),
  }))
);
