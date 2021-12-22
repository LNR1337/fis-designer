import {PreviewStateImageFieldsType} from './preview.state';
import {createAction, props} from '@ngrx/store';

export const loadedImageBuffer = createAction(
  '[Preview] Loaded an image buffer',
  props<{imageBuffer: ArrayBuffer, imageField: PreviewStateImageFieldsType}>(),
);

export const moveNeedles = createAction(
  '[Preview] Move needles',
  props<{needleAngle1: number, needleAngle2: number, needleAngle3: number}>(),
);

export const loadPreviewStateFromObject = createAction(
  '[Preview] Load preview state from object',
  props<{object: Object}>(),
);
