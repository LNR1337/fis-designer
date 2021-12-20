import {PreviewStateImageFieldsType} from './preview.state';
import {createAction, props} from '@ngrx/store';

export const loadedImage = createAction(
  '[Preview] Loaded an image',
  props<{image: HTMLImageElement, imageField: PreviewStateImageFieldsType}>(),
);

export const moveNeedles = createAction(
  '[Preview] Move needles',
  props<{needleAngle1: number, needleAngle2: number, needleAngle3: number}>(),
);
