import { StateNode } from '@visdesignlab/provenance-lib-core';
import { ReactChild } from 'react';
import { BundleMap } from '../Utils/BundleMap';
import { EventConfig } from '../Utils/EventConfig';
interface BackboneNodeProps<T, S extends string, A> {
    first: boolean;
    iconOnly: boolean;
    current: boolean;
    duration: number;
    node: StateNode<T, S, A>;
    radius: number;
    strokeWidth: number;
    textSize: number;
    nodeMap: any;
    annotationOpen: number;
    setAnnotationOpen: any;
    exemptList: string[];
    setExemptList: any;
    bundleMap?: BundleMap;
    clusterLabels: boolean;
    eventConfig?: EventConfig<S>;
    popupContent?: (nodeId: StateNode<T, S, A>) => ReactChild;
    annotationContent?: (nodeId: StateNode<T, S, A>) => ReactChild;
    expandedClusterList?: string[];
}
declare function BackboneNode<T, S extends string, A>({ first, iconOnly, current, node, duration, radius, strokeWidth, textSize, nodeMap, annotationOpen, setAnnotationOpen, exemptList, setExemptList, bundleMap, clusterLabels, eventConfig, popupContent, annotationContent, expandedClusterList, }: BackboneNodeProps<T, S, A>): JSX.Element;
export default BackboneNode;
