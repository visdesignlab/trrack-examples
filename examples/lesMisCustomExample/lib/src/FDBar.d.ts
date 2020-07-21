export default class Bars {
    private graph;
    private hoverOver;
    private hoverOut;
    private select;
    constructor(graph: any, hoverOver: any, hoverOut: any, select: any);
    drawBar(): void;
    selectBar(id: any): void;
    deselectAllBars(): void;
    hoverBar(id: any): void;
    dehoverBars(): void;
}
