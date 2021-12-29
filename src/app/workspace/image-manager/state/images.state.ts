/** Names of image state fields. */
export const ImageStateFields = [
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

/** Names of image state fields holding digits. */
export const ImageStateDigitFields = [
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

/** Type for all valid image state field names. */
export type ImageStateFieldsType = typeof ImageStateFields[number];

/** Type for an object holding data for all the images. */
export type ImageStateFieldsObject<T> = {
  [property in ImageStateFieldsType]: T;
};

/** Type for an object holding data for some of the images. */
export type PartialImageStateFieldsObject<T> = Partial<ImageStateFieldsObject<T>>;

/** State for the preview module images. */
export type ImagesState = PartialImageStateFieldsObject<string>;
