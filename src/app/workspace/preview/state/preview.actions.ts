import {StateImageFieldsType} from './preview.state';
import {createAction, props} from '@ngrx/store';

export const loadedImage = createAction(
  '[Preview] Loaded an image',
  props<{image: HTMLImageElement, imageField: StateImageFieldsType}>(),
);
