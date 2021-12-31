import {PreviewState} from '../preview/state/preview.state';
import {
  ImageStateDigitFields,
  ImageStateDigitFieldsType,
  ImageStateDotField,
  ImageStateFieldsType,
} from './state/images.state';

/** Checks whether a set of image field names contains all the digit related fields. */
export function containsAllDigitImages(loadedImages: Set<ImageStateFieldsType>) {
  const loadedDigits = ImageStateDigitFields.filter(image => loadedImages.has(image));
  return loadedDigits.length === ImageStateDigitFields.length;
}

/** Checks whether all digit images have the same dimensions. */
// TODO(pawelszydlo): input type should be images only.
export function assureDigitDimensions(state: PreviewState): ImageStateDigitFieldsType | undefined {
  let expectedFontWidth = 0;
  let expectedFontHeight = 0;
  for (const digitName of ImageStateDigitFields) {
    const digit = state[digitName];
    if (digit) {
      if (digitName !== ImageStateDotField) {
        // Assume the dot will not be first. Set correct dimensions.
        if (expectedFontHeight === 0 && expectedFontWidth === 0) {
          expectedFontHeight = digit.naturalHeight;
          expectedFontWidth = digit.naturalWidth;
        } else if (
          expectedFontWidth !== digit.naturalWidth ||
          expectedFontHeight !== digit.naturalHeight
        ) {
          return digitName;
        }
      } else {
        // Dot.
        if (expectedFontHeight !== digit.naturalHeight) {
          return digitName;
        }
      }
    }
  }
  return;
}
