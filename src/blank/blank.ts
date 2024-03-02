import type { MimeType } from '../types';
import type { ImageManipulation } from './types';

/**
 * Promisified version of the toBlob method for a canvas element.
 *
 * @param {HTMLCanvasElement} canvas - The canvas element for which a Blob will be created.
 * @returns {Promise<Blob>} A Promise that resolves to a Blob representing the image from the canvas.
 */
function toBlobPromisify(canvas: HTMLCanvasElement, type: string, quality: number): Promise<Blob> {
    return new Promise((resolve, reject) => {
        canvas.toBlob(
            blob => {
                if (blob == null) reject('blob is null');
                else resolve(blob);
            },
            type,
            quality
        );
    });
}

/**
 * The Blank class represents a container for storing an image on a canvas element
 * and provides a convenient interface for working with it.
 */
export class Blank implements ImageManipulation {
    private canvas: HTMLCanvasElement;
    private ctx: ImageBitmapRenderingContext;

    /**
     * Creates an instance of the Blank class.
     */
    constructor() {
        this.canvas = document.createElement('canvas');
        this.ctx = this.canvas.getContext('bitmaprenderer') as ImageBitmapRenderingContext;
    }

    /**
     * Sets the canvas dimensions based on the dimensions of the ImageBitmap
     * and transfers the data from the ImageBitmap to the canvas.
     *
     * @param {ImageBitmap} imageBitmap - The ImageBitmap to be added to the canvas.
     * @returns {void}
     */
    private setSize(imageBitmap: ImageBitmap): void {
        const { width, height } = imageBitmap;

        this.canvas.width = width;
        this.canvas.height = height;
    }

    /**
     * Builds a MIME type string based on the provided file extension.
     *
     * @param {MimeType} mime - The file extension (e.g., 'jpg', 'png').
     * @returns {string} The corresponding MIME type string.
     */
    private buildMimeType(mime: MimeType): string {
        if (mime === 'jpg') return `image/jpeg`;
        return `image/${mime}`;
    }

    /**
     * Adds an ImageBitmap to the canvas, setting the canvas dimensions according to the image size.
     *
     * @param {ImageBitmap} imageBitmap - The ImageBitmap to be added to the canvas.
     * @returns {ImageManipulation} The current instance of the Blank class.
     */
    appendImage(imageBitmap: ImageBitmap): ImageManipulation {
        this.setSize(imageBitmap);
        this.ctx.transferFromImageBitmap(imageBitmap);

        return this;
    }

    /**
     * Gets the canvas representing the current image.
     *
     * @returns {HTMLCanvasElement} The canvas element with the current image.
     */
    get blank(): HTMLCanvasElement {
        return this.canvas;
    }

    /**
     * Converts the current image on the canvas to a Blob.
     *
     * @returns {Promise<Blob>} A Promise that resolves to a Blob representing the image from the canvas.
     */
    async toBlob(mime: MimeType, quality: number): Promise<Blob> {
        return toBlobPromisify(this.blank, this.buildMimeType(mime), quality);
    }
}
