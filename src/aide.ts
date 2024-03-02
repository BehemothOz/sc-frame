import { Blank, type ImageManipulation } from './blank';
import { AideNodeFactory, type AideNode } from './provision';
import { Downloader, type ImageDownloader } from './downloader';

import type { AideInterface, AideOptions, FrameInfo, ReadyFrameCallback } from './types';

const defaultAideOptions: Required<AideOptions> = {
    node: null,
    mime: 'png',
    quality: 1,
    name: 'frame',
    onReadyFrame: null,
    downloadAfter: true,
};

const mergeOptions = (customOptions: AideOptions, defaultOptions: AideOptions) => {
    return Object.assign({}, defaultOptions, customOptions) as Required<AideOptions>;
};

/**
 * Class representing an image capture utility with options for processing and downloading frames.
 */
export class Aide implements AideInterface {
    private node: AideNode;
    private options: Required<AideOptions>;
    private blank: ImageManipulation = new Blank();
    private frames: number = 0;
    private downloader: ImageDownloader | null = null;
    private callback: ReadyFrameCallback | null = null;

    /**
     * Creates an instance of the Aide class.
     *
     * @param {AideOptions} options - Options for configuring the Aide instance.
     */
    constructor(options: AideOptions = defaultAideOptions) {
        this.node = AideNodeFactory.createNode(options.node);
        this.options = mergeOptions(options, defaultAideOptions);

        this.callback = options.onReadyFrame || null;

        if (options.downloadAfter) {
            this.downloader = new Downloader(this.options.name);
        }
    }

    /**
     * Creates an ImageBitmap from the AideNode.
     *
     * @private
     * @returns {Promise<ImageBitmap>} A Promise that resolves to the created ImageBitmap.
     */
    private async createImageBitmap(): Promise<ImageBitmap> {
        const { width, height, element } = this.node;
        return await createImageBitmap(element, 0, 0, width, height);
    }

    /**
     * Increases the frame counter.
     *
     * @private
     */
    private increaseFrameCounter() {
        this.frames += 1;
    }

    /**
     * Creates frame information based on the provided image Blob.
     *
     * @private
     * @param {Blob} imageBlob - The image Blob to create frame information from.
     * @returns {FrameInfo} The created frame information.
     */
    private createFrameInfo(imageBlob: Blob): FrameInfo {
        const { width, height } = this.node;

        this.increaseFrameCounter();
        return {
            name: `${this.options.name}_${this.frames}`,
            width,
            height,
            blob: imageBlob,
        };
    }

    /**
     * Takes a frame, processes it, and optionally triggers download or invokes the callback.
     *
     * @public
     * @returns {Promise<void>} A Promise that resolves after the frame is processed and handled.
     */
    async takeFrame(): Promise<void> {
        const { mime, quality } = this.options;

        const imageBitmap = await this.createImageBitmap();
        const imageBlob = await this.blank.appendImage(imageBitmap).toBlob(mime, quality);

        if (this.callback) {
            this.callback(this.createFrameInfo(imageBlob));
            return;
        }

        if (this.downloader) {
            this.downloader.downloadImage(imageBlob);
        }
    }
}
