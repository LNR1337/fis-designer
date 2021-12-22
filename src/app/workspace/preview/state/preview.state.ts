/** State for the preview module, sans image source data. */
import {PartialImageStateFieldsObject} from '../../image-manager/state/images.state';

export interface PreviewState extends PartialImageStateFieldsObject<HTMLImageElement> {
  needleAngle1?: number;
  needleAngle2?: number;
  needleAngle3?: number;
}
