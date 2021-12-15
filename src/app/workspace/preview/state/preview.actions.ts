import { createAction, props } from '@ngrx/store';
import { StateImageFieldsType } from './preview.state';

export const loadedImage = createAction(
  '[Preview] Loaded an image',
  props<{ image: HTMLImageElement; imageField: StateImageFieldsType }>()
);
