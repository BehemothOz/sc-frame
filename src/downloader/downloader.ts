import { ImageDownloader } from './types';

const DEFAULT_NAME = 'frame';

/**
 * Class representing a downloader for downloading images.
 */
export class Downloader implements ImageDownloader {
    private anchorElement: HTMLAnchorElement;
    private downloadCounter: number = 0;

    /**
     * Creates an instance of Downloader.
     *
     * @param {string} name - The base name for downloaded files.
     */
    constructor(private name: string = DEFAULT_NAME) {
        this.anchorElement = this.createAnchorElement();
    }

    /**
     * Builds the download name by appending a counter to the base name.
     *
     * @private
     * @param {string} [customName] - An optional custom name.
     * @returns {string} The built download name.
     */
    private buildName(customName?: string): string {
        return `${customName ?? this.name}_${this.downloadCounter}`;
    }

    /**
     * Increases the download counter.
     *
     * @private
     */
    private increaseCounter() {
        this.downloadCounter += 1;
    }

    /**
     * Creates an HTML anchor element.
     *
     * @private
     * @returns {HTMLAnchorElement} The created anchor element.
     */
    private createAnchorElement(): HTMLAnchorElement {
        return document.createElement('a');
    }

    /**
     * Sets properties of the HTML anchor element.
     *
     * @private
     * @param {string} href - The URL to be set as the anchor's href.
     * @param {string} downloadName - The name to be set as the anchor's download attribute.
     */
    private setAnchorElementProperties(href: string, downloadName: string): void {
        Object.assign(this.anchorElement, { href, download: downloadName });
    }

    /**
     * Triggers the download by simulating a click on the anchor element.
     *
     * @private
     */
    private triggerDownload(): void {
        this.anchorElement.click();
    }

    /**
     * Downloads an image.
     *
     * @public
     * @param {Blob} blob - The image blob to be downloaded.
     * @param {string} [name] - An optional custom name for the download.
     */
    public async downloadImage(blob: Blob, name?: string) {
        const href = URL.createObjectURL(blob);

        this.increaseCounter();
        this.setAnchorElementProperties(href, this.buildName(name));

        this.triggerDownload();

        setTimeout(() => {
            window.URL.revokeObjectURL(href);
        });
    }
}
