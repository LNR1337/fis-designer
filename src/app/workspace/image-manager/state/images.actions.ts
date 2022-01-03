import {createAction, props} from '@ngrx/store';
import {ImageStateFieldsType} from './images.state';

export const validateAndSaveImageBuffer = createAction(
  '[Images] Validate and save an image buffer',
  props<{imageBuffer: ArrayBuffer; imageField: ImageStateFieldsType}>()
);

export const saveImageBuffer = createAction(
  '[Images] Save an image object to state',
  props<{imageBuffer: ArrayBuffer; imageField: ImageStateFieldsType}>()
);

export const loadImagesStateFromObject = createAction(
  '[Images] Load images state from object',
  props<{object: Object}>()
);

export const downloadNeedlesAsBinary = createAction(
  '[Images] Download needles and digits as binary file',
  props<{name: string}>()
);

export const downloadBackgroundAsBinary = createAction(
  '[Images] Download backgrounds as binary file',
  props<{name: string}>()
);
