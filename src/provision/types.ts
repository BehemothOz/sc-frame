/**
 * Type representing HTML elements allowed as nodes, either a video or a canvas element.
 */
export type AllowedHTMLElement = HTMLVideoElement | HTMLCanvasElement;

/**
 * Interface representing common properties for AideNode.
 */
export interface AideNode {
    /**
     * The width of the node.
     */
    width: number;

    /**
     * The height of the node.
     */
    height: number;

    /**
     * The HTML element representing the node.
     */
    element: AllowedHTMLElement;
}
