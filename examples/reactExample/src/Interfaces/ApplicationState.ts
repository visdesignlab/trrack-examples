export interface NodePosition {
  x: number;
  y: number;
}

export interface NodeMap {
  nodes: any[];
  links: any[];
}

export interface ApplicationState {
  nodePositions: NodeMap;
  selectedNode: string;
}

export const defaultState: ApplicationState = {
  nodePositions: {
    nodes: [],
    links: [],
  },
  selectedNode: 'none',
};
