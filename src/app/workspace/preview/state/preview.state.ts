/** Names of state fields holding images. */
export const StateImageFields = [
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
export type StateImageFieldsType = typeof StateImageFields[number];

/** Type for an object holding data for all the images. */
export type CompleteStateImages<T> = { [property in StateImageFieldsType]: T };

/** Type for an object holding data for some of the images. */
export type PartialStateImages<T> = Partial<CompleteStateImages<T>>;

/** State for the preview module. */
export type PreviewState = PartialStateImages<HTMLImageElement>;
