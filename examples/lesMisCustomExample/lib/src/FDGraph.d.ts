export default class Graph {
    graph: any;
    private hoverOver;
    private hoverOut;
    private select;
    private dragEnded;
    constructor(graph: any, hoverOver: any, hoverOut: any, select: any, dragEnded: any);
    drawGraph(): void;
    dragged(d: any, link: any, node: any): void;
    draw(link: any, node: any): void;
    selectNode(id: any): void;
    deselectAllNodes(): void;
    hoverNode(id: any): void;
    dehoverNodes(): void;
    moveNodes(newGraph: any): void;
}
