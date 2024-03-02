import type { MimeType } from '../types.ts';

/**
 * Interface representing an object that performs image manipulation on a canvas.
 * @interface
 */
export interface ImageManipulation {
    /**
     * Appends an ImageBitmap to the canvas, adjusting canvas dimensions accordingly.
     *
     * @param {ImageBitmap} imageBitmap - The ImageBitmap to append to the canvas.
     * @returns {ImageManipulation} The current instance of the ImageManipulation interface.
     */
    appendImage(imageBitmap: ImageBitmap): ImageManipulation;

    /**
     * Converts the current image on the canvas to a Blob.
     *
     * @param {MimeType} mime - The desired MIME type for the Blob (e.g., 'jpeg', 'png').
     * @param {number} quality - The quality parameter for image compression (if applicable).
     * @returns {Promise<Blob>} A Promise that resolves to a Blob representing the image on the canvas.
     */
    toBlob(mime: MimeType, quality: number): Promise<Blob>;

    /**
     * Gets the canvas representing the current image.
     *
     * @type {HTMLCanvasElement}
     */
    blank: HTMLCanvasElement;
}
