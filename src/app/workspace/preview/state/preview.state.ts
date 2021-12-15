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

/** Type for all valid state fields holding images. */
export type StateImageFieldsType = typeof StateImageFields[number];

/** Type for an object holding data for all the images. */
export type CompleteStateImages<T> = { [property in StateImageFieldsType]: T };

/** Type for an object holding data for some of the images. */
export type PartialStateImages<T> = Partial<CompleteStateImages<T>>;

/** State for the preview module. */
export interface PreviewState extends PartialStateImages<HTMLImageElement> {
  readonly backgroundImage?: HTMLImageElement;
  readonly tableBackgroundImage?: HTMLImageElement;
  readonly needleImage1?: HTMLImageElement;
  readonly needleImage2?: HTMLImageElement;
  readonly needleImage3?: HTMLImageElement;
  readonly digit0?: HTMLImageElement;
  readonly digit1?: HTMLImageElement;
  readonly digit2?: HTMLImageElement;
  readonly digit3?: HTMLImageElement;
  readonly digit4?: HTMLImageElement;
  readonly digit5?: HTMLImageElement;
  readonly digit6?: HTMLImageElement;
  readonly digit7?: HTMLImageElement;
  readonly digit8?: HTMLImageElement;
  readonly digit9?: HTMLImageElement;
  readonly digitMinus?: HTMLImageElement;
  readonly digitDot?: HTMLImageElement;
}
