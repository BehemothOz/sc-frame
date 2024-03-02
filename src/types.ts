/**
 * Represents a MIME type for image files.
 */
export type MimeType = 'png' | 'jpeg' | 'jpg' | 'webp';

/**
 * Represents information about a frame, including its name, width, height, and blob.
 */
export interface FrameInfo {
    name: string;
    width: number;
    height: number;
    blob: Blob;
}

/**
 * Represents a callback function that handles a ready frame.
 * @param frame - The frame information.
 */
export type ReadyFrameCallback = (frame: FrameInfo) => void;

/**
 * Options for configuring an instance of the Aide class.
 */
export interface AideOptions {
    /**
     * The HTML element representing the node.
     */
    node: HTMLElement | null;

    /**
     * The desired MIME type for the generated image (optional, default is 'png').
     */
    mime?: MimeType;

    /**
     * The image quality (optional, default is 1, applicable for 'jpeg' and 'webp' MIME types).
     */
    quality?: number;

    /**
     * The base name for the downloaded images (optional).
     */
    name?: string;

    /**
     * Callback function to be called when a frame is ready (optional).
     */
    onReadyFrame?: ReadyFrameCallback | null;

    /**
     * Flag indicating whether to download the image after it's ready (optional, default is true).
     */
    downloadAfter?: boolean;
}

/**
 * Interface representing an image capture utility with options for processing and downloading frames.
 * @interface
 */
export interface AideInterface {
    /**
     * Takes a frame, processes it, and optionally triggers download or invokes the callback.
     *
     * @param {Blob} blob - The image blob to be processed.
     * @param {string} [name] - An optional custom name for the download.
     * @returns {Promise<void>} A Promise that resolves after the frame is processed and handled.
     */
    takeFrame(blob: Blob, name?: string): Promise<void>;
}
