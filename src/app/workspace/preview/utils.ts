import {from, Observable} from 'rxjs';
import {IMAGE_MAX_SIZE, MIME_TYPE} from './models/images_metadata';
import {PreviewStateImageFieldsType} from './state/preview.state';

/** Converts an array buffer into a base64 encoded string. */
export function byteToBase64(buffer: ArrayBuffer): string {
  return btoa(new Uint8Array(buffer)
    .reduce((data, byte) => data + String.fromCharCode(byte), ''));
}

/** Converts a base64 encoded string into an array buffer. */
export function base64ToArrayBuffer(encodedString: string): ArrayBuffer {
  return Uint8Array.from(atob(encodedString), c => c.charCodeAt(0)).buffer;
}

/** Validates the image and returns an error should any be found. */
function validateImage(image: HTMLImageElement,
                       imageName: PreviewStateImageFieldsType): string | undefined {
  const restriction = IMAGE_MAX_SIZE[imageName];
  if (restriction.x && restriction.y) {
    if (image.naturalWidth !== restriction.x || image.naturalHeight !== restriction.y) {
      return `The image must be exactly ${restriction.x} by ${restriction.y} pixels.`;
    }
  }
  if (restriction.pixels && image.naturalWidth * image.naturalHeight > restriction.pixels) {
    return `The image must have a maximum of ${restriction.pixels} pixels (WxH)`;
  }
  return;
}

/** Tries to decode and load the image data into a full image element. */
export function loadImageFromBase64(imageData: string,
                                    imageField: PreviewStateImageFieldsType): Observable<HTMLImageElement | string> {
  // New HTMLImageElement.
  const image = new Image();
  image.src = URL.createObjectURL(new Blob([base64ToArrayBuffer(imageData)], {type: MIME_TYPE}));
  return from(image.decode().then(() => {
    const error = validateImage(image, imageField);
    return error ? error : image;
  }).catch((encodingError) => (`Error loading image: ${encodingError}`)));

}
