import { BundleMap } from '../Utils/BundleMap';
export default function linkTransitions(xOffset: number, yOffset: number, clusterOffset: number, backboneOffset: number, duration: number, nodeList: any[], nodeMap: any, annotationOpen: number, annotationHeight: number, bundleMap?: BundleMap): {
    enter: (data: any) => {
        x1: number;
        x2: number;
        y1: number;
        y2: number;
        opacity: number;
        timing: {
            duration: number;
        };
    };
    leave: () => {
        x1: number;
        x2: number;
        y1: number;
        y2: number;
        opacity: number;
    };
    update: (data: any) => {
        x1: number[];
        y1: number[];
        x2: number[];
        y2: number[];
        opacity: number;
        timing: {
            duration: number;
        };
    };
    start: () => {
        x1: number;
        x2: number;
        y1: number;
        y2: number;
        opacity: number;
    };
};
export declare function getX(width: number, xOffset: number, backboneOffset: number): number;
