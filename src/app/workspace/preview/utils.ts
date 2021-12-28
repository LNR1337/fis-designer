import {from, Observable} from 'rxjs';
import {ImageStateFieldsType} from '../image-manager/state/images.state';
import {IMAGE_MAX_SIZE, MIME_TYPE} from '../image-manager/models/images_metadata';

/** Converts an array buffer into a base64 encoded string. */
export function byteToBase64(buffer: ArrayBuffer): string {
  return btoa(new Uint8Array(buffer).reduce((data, byte) => data + String.fromCharCode(byte), ''));
}

/** Converts a base64 encoded string into an array buffer. */
export function base64ToArrayBuffer(encodedString: string): ArrayBuffer {
  return Uint8Array.from(atob(encodedString), c => c.charCodeAt(0)).buffer;
}

/** Validates the image and returns an error should any be found. */
function validateImage(
  image: HTMLImageElement,
  imageName: ImageStateFieldsType
): string | undefined {
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

/** Decodes and load the image data into a full image element, or an error message. */
export function loadImageFromBase64(
  imageData: string,
  imageField: ImageStateFieldsType
): Observable<HTMLImageElement | string> {
  return loadImageFromArrayBuffer(base64ToArrayBuffer(imageData), imageField);
}

/**  Loads the image data into a full image element, or an error message. */
export function loadImageFromArrayBuffer(
  imageData: ArrayBuffer,
  imageField: ImageStateFieldsType
): Observable<HTMLImageElement | string> {
  const image = new Image();
  image.src = URL.createObjectURL(new Blob([imageData], {type: MIME_TYPE}));
  return from(
    image
      .decode()
      .then(() => {
        const error = validateImage(image, imageField);
        return error ? error : image;
      })
      .catch(encodingError => `Error loading image: ${encodingError}`)
  );
}
