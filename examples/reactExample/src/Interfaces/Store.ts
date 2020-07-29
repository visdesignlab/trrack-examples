import {observable, computed, action} from 'mobx';
import {NodeMap, ApplicationState, defaultState} from './ApplicationState';

import {
  Provenance,
  initProvenance
} from '@visdesignlab/provenance-lib-core';

export default class Store {
  provenance: Provenance<ApplicationState, unknown, unknown> = initProvenance<ApplicationState, unknown, unknown>(defaultState, false);

  @observable isAtRoot: boolean = true;
  @observable isAtLatest: boolean = true;
  @observable selectedNode: string = defaultState.selectedNode;
  @observable nodePositions: NodeMap = defaultState.nodePositions;

  @computed get getNodePositions() {
    return JSON.parse(JSON.stringify(this.nodePositions));
  };
  @computed get isNodePositionSet() {
    return (
      this.nodePositions.nodes.length > 0 && this.nodePositions.links.length > 0
    );
  };
  //
  @action selectNode(node:string)
  {
    let a = this.provenance.addAction(
      `Selecting ${node}`,
       (state: ApplicationState) => {
        if (state.selectedNode === node) {
          state.selectedNode = 'none';
        } else {
          state.selectedNode = node;
        }
        return state;
    });

    a.applyAction();
  }

  @action setNodePositions(pos: NodeMap, skipProvenance: boolean = false) {
    if (skipProvenance) {
      this.nodePositions = JSON.parse(JSON.stringify(pos));
      return;
    }
    let a = this.provenance.addAction(
      'Setting node positions',
      (state: ApplicationState) => {
        state.nodePositions = JSON.parse(JSON.stringify(pos));
        return state;
      },
    );

    a.applyAction();
  };
}

export const store = new Store();
