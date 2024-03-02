/**
 * Interface representing a downloader for downloading images.
 * @interface
 */
export interface ImageDownloader {
    /**
     * Downloads an image.
     *
     * @param {Blob} blob - The image blob to be downloaded.
     * @param {string} [name] - An optional custom name for the download.
     */
    downloadImage(blob: Blob, name?: string): void;
}
