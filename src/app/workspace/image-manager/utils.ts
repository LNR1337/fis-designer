import {ImageStateDigitFields, ImageStateFieldsType} from './state/images.state';

/** Checks whether a set of image field names contains all the digit related fields. */
export function containsAllDigitImages(loadedImages: Set<ImageStateFieldsType>) {
  const loadedDigits = ImageStateDigitFields.filter(image => loadedImages.has(image));
  return loadedDigits.length === ImageStateDigitFields.length;
}
