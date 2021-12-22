import {createFeatureSelector} from '@ngrx/store';
import {IMAGES_FEATURE_KEY} from './images.reducer';
import {ImagesState} from './images.state';

/** Selects the whole images state. */
export const selectImagesState = createFeatureSelector<ImagesState>(IMAGES_FEATURE_KEY);
