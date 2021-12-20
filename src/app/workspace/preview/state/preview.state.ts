/** Names of state fields holding images. */
export const PreviewStateImageFields = [
  'backgroundImage',
  'tableBackgroundImage',
  'needleImage1',
  'needleImage2',
  'needleImage3',
  'digit0',
  'digit1',
  'digit2',
  'digit3',
  'digit4',
  'digit5',
  'digit6',
  'digit7',
  'digit8',
  'digit9',
  'digitMinus',
  'digitDot',
] as const;

/** Type for all valid state field names holding images. */
export type PreviewStateImageFieldsType = typeof PreviewStateImageFields[number];

/** Type for an object holding data for all the images. */
export type PreviewStateImageFieldsObject<T> = { [property in PreviewStateImageFieldsType]: T };

/** Type for an object holding data for some of the images. */
export type PartialPreviewStateImageFieldsObject<T> = Partial<PreviewStateImageFieldsObject<T>>;

/** State for the preview module. */
export interface PreviewState extends PartialPreviewStateImageFieldsObject<HTMLImageElement> {
  // Internal values.
  needleAngle1?: number;
  needleAngle2?: number;
  needleAngle3?: number;
}
