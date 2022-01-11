import {createAction, props} from '@ngrx/store';
import {ConfigStateFieldsType} from '../../config/state/config.state';
import {ImageStateFieldsType} from '../../image-manager/state/images.state';
import {PreviewPage} from './preview.state';

export const saveImage = createAction(
  '[Preview] Save an image object to state',
  props<{image: HTMLImageElement; imageField: ImageStateFieldsType}>()
);

export const setSimulationProgress = createAction(
  '[Preview] Set simulation progress',
  props<{progress: number}>()
);

export const stopSimulation = createAction('[Preview] Stop simulation');

export const enableHighlight = createAction(
  '[Preview] Enable highlighting',
  props<{stateField: ConfigStateFieldsType}>()
);

export const disableHighlight = createAction('[Preview] Disable highlighting');

export const changePreviewPage = createAction(
  '[Preview] Change preview page',
  props<{previewPage: PreviewPage}>()
);
