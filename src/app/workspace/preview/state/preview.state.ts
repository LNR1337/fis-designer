/**
 * Names of state fields holding images.
 * Those are needed to validate dynamically passed field names for images.
 * */
export const StateImageFields = [
  'backgroundImage', 'tableBackgroundImage', 'needleImage1', 'needleImage2', 'needleImage3',
  'digit0', 'digit1', 'digit2', 'digit3', 'digit4', 'digit5', 'digit6', 'digit7', 'digit8',
  'digit9', 'digitMinus', 'digitDot'
];

/** Type for all valid state fields holding images. */
export type StateImageFieldsType = Extract<keyof PreviewState, typeof StateImageFields[number]>;


/** State for the preview module. */
export interface PreviewState {
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
