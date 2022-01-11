/** State for the preview module, sans image source data. */
import {ConfigStateFieldsType} from '../../config/state/config.state';
import {PartialImageStateFieldsObject} from '../../image-manager/state/images.state';

export type PreviewPage = 'gauges' | 'tables';

export const SIMULATION_DISABLED = -1;

export interface PreviewState extends PartialImageStateFieldsObject<HTMLImageElement> {
  simulationProgress: number;
  activeHighlight?: ConfigStateFieldsType;
  previewPage: PreviewPage;
}
