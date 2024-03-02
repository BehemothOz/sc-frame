import type { AideNode } from '../types';

/**
 * Class representing a VideoNode implementing the AideNode interface.
 */
export class VideoNode implements AideNode {
    /**
     * Creates an instance of VideoNode.
     *
     * @param {HTMLVideoElement} video - The HTML video element.
     */
    constructor(private video: HTMLVideoElement) {}

    /**
     * Gets the width of the video.
     *
     * @returns {number} The width of the video.
     */
    get width(): number {
        return this.video.videoWidth;
    }

    /**
     * Gets the height of the video.
     *
     * @returns {number} The height of the video.
     */
    get height(): number {
        return this.video.videoHeight;
    }

    /**
     * Gets the HTML video element.
     *
     * @returns {HTMLVideoElement} The HTML video element.
     */
    get element(): HTMLVideoElement {
        return this.video;
    }
}
