import type { AideNode } from '../types';

/**
 * Class representing a CanvasNode implementing the AideNode interface.
 */
export class CanvasNode implements AideNode {
    /**
     * Creates an instance of CanvasNode.
     *
     * @param {HTMLCanvasElement} canvas - The HTML canvas element.
     */
    constructor(private canvas: HTMLCanvasElement) {}

    /**
     * Gets the width of the canvas.
     *
     * @returns {number} The width of the canvas.
     */
    get width(): number {
        return this.canvas.width;
    }

    /**
     * Gets the height of the canvas.
     *
     * @returns {number} The height of the canvas.
     */
    get height(): number {
        return this.canvas.height;
    }

    /**
     * Gets the HTML canvas element.
     *
     * @returns {HTMLCanvasElement} The HTML canvas element.
     */
    get element(): HTMLCanvasElement {
        return this.canvas;
    }
}
