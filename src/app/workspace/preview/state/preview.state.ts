/** State for the preview module, sans image source data. */
import {ConfigStateFieldsType} from '../../config/state/config.state';
import {PartialImageStateFieldsObject} from '../../image-manager/state/images.state';

export type PreviewPage = 'gauges' | 'tables';

export interface PreviewState extends PartialImageStateFieldsObject<HTMLImageElement> {
  needleAngle1: number;
  needleAngle2: number;
  needleAngle3: number;
  activeHighlight?: ConfigStateFieldsType;
  previewPage: PreviewPage;
}
