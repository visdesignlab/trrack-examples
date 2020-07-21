import { HierarchyNode } from 'd3';
import { StratifiedMap } from '../components/ProvVis';
import { ProvenanceNode } from '@visdesignlab/provenance-lib-core';
export declare type TreeNode = HierarchyNode<unknown>;
export interface ExtendedHierarchyNode<T, S, A> extends HierarchyNode<ProvenanceNode<T, S, A>> {
    column: number;
}
export declare type ExtendedStratifiedMap<T, S, A> = {
    [key: string]: ExtendedHierarchyNode<T, S, A>;
};
export declare function treeLayout<T, S, A>(nodes: StratifiedMap<T, S, A>, current: string, root: string): string[];
export declare function getPathTo<T, S, A>(nodes: StratifiedMap<T, S, A>, from: string, to: string): string[];
