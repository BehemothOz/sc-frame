import { CanvasNode, VideoNode } from './nodes';
import { type AideNode } from './types';

/**
 * Factory for creating AideNode instances based on the provided HTMLElement (simple factory)
 * @class
 */
export class AideNodeFactory {
    /**
     * Creates an instance of AideNode based on the provided HTMLElement.
     * @static
     * @param {HTMLElement} element - The HTML element to create AideNode from.
     * @returns {AideNode} The created AideNode instance.
     * @throws {Error} If the provided element type is not supported.
     */
    public static createNode(element: HTMLElement | null): AideNode {
        if (element == null) {
            throw new Error('Pass the link to the node');
        }

        switch (element.constructor.name) {
            /**
             * If the provided element is an HTMLVideoElement, creates a CanvasNode.
             * @case 'HTMLVideoElement'
             */
            case 'HTMLCanvasElement':
                return new CanvasNode(element as HTMLCanvasElement);
            /**
             * If the provided element is an HTMLVideoElement, creates a CanvasNode.
             * @case 'HTMLVideoElement'
             */
            case 'HTMLVideoElement':
                return new VideoNode(element as HTMLVideoElement);
            /**
             * Throws an error if the provided element type is not supported.
             * @default
             */
            default:
                throw new Error('Invalid element type');
        }
    }
}
