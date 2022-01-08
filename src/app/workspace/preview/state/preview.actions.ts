import {createAction, props} from '@ngrx/store';
import {ConfigStateFieldsType} from '../../config/state/config.state';
import {ImageStateFieldsType} from '../../image-manager/state/images.state';

export const saveImage = createAction(
  '[Preview] Save an image object to state',
  props<{image: HTMLImageElement; imageField: ImageStateFieldsType}>()
);

export const moveNeedles = createAction(
  '[Preview] Move needles',
  props<{needleAngle1: number; needleAngle2: number; needleAngle3: number}>()
);

export const enableHighlight = createAction(
  '[Preview] Enable highlighting',
  props<{stateField: ConfigStateFieldsType}>()
);

export const disableHighlight = createAction('[Preview] Disable highlighting');
