/** Acceptable mime types. */
import {ImageStateFieldsObject} from '../state/images.state';

export const MIME_TYPE = 'image/png';

/** Image size restriction. Value must match if specified. */
export interface Restriction {
  x?: number;
  y?: number;
  pixels?: number;
}

/** Maximum image dimensions. From: https://fis-control.de/graphics-converter.html */
export const IMAGE_MAX_SIZE: ImageStateFieldsObject<Restriction> = {
  backgroundImage: {x: 800, y: 480},
  tableBackgroundImage: {x: 96, y: 96},
  needleImage1: {pixels: 8192},
  needleImage2: {pixels: 8192},
  needleImage3: {pixels: 8192},
  digit0: {pixels: 2730},
  digit1: {pixels: 2730},
  digit2: {pixels: 2730},
  digit3: {pixels: 2730},
  digit4: {pixels: 2730},
  digit5: {pixels: 2730},
  digit6: {pixels: 2730},
  digit7: {pixels: 2730},
  digit8: {pixels: 2730},
  digit9: {pixels: 2730},
  digitMinus: {pixels: 2730},
  digitDot: {pixels: 2730},
};

/** Labels for image inputs. */
export const IMAGE_LABEL: ImageStateFieldsObject<string> = {
  backgroundImage: 'Gauges background',
  tableBackgroundImage: 'Tables background tile',
  needleImage1: 'Left gauge needle',
  needleImage2: 'Center gauge needle',
  needleImage3: 'Right gauge needle',
  digit0: 'Digit 0',
  digit1: 'Digit 1',
  digit2: 'Digit 2',
  digit3: 'Digit 3',
  digit4: 'Digit 4',
  digit5: 'Digit 5',
  digit6: 'Digit 6',
  digit7: 'Digit 7',
  digit8: 'Digit 8',
  digit9: 'Digit 9',
  digitMinus: 'Minus sign',
  digitDot: 'Decimal dot',
};

/** Regular expressions for possible names for image files. */
export const IMAGE_FILENAME_MATCHERS: ImageStateFieldsObject<RegExp[]> = {
  backgroundImage: [/background/i, /.*gauges.*/i],
  tableBackgroundImage: [/.*table.*/i],
  needleImage1: [/.*needle.*(left|1|one).*/i, /.*(left|1|one).*needle.*/i],
  needleImage2: [/.*needle.*(center|middle|2|two).*/i, /.*(center|middle|2|two).*needle.*/i],
  needleImage3: [/.*needle.*(right|3|three).*/i, /.*(right|3|three).*needle.*/i],
  digit0: [/.*(digit|number)?.*(0|zero).*/i],
  digit1: [/.*(digit|number)?.*(1|one).*/i],
  digit2: [/.*(digit|number)?.*(2|two).*/i],
  digit3: [/.*(digit|number)?.*(3|three).*/i],
  digit4: [/.*(digit|number)?.*(4|four).*/i],
  digit5: [/.*(digit|number)?.*(5|five).*/i],
  digit6: [/.*(digit|number)?.*(6|six).*/i],
  digit7: [/.*(digit|number)?.*(7|seven).*/i],
  digit8: [/.*(digit|number)?.*(8|eight).*/i],
  digit9: [/.*(digit|number)?.*(9|nine).*/i],
  digitMinus: [/.*(minus|-).*/i],
  digitDot: [/.*(dot|coma|\.).*/i],
};
