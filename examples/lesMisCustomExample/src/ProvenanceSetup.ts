import * as d3 from "d3";

import {
  SelectedBar,
  SelectedNode,
  NodeMoved
} from './Icons';
import { Bundle, BundleMap } from '../ProvVis/Utils/BundleMap';


import
{
  initProvenance,
  ProvenanceGraph,
  Provenance,
  ActionFunction,
  SubscriberFunction,
  NodeMetadata,
  NodeID,
  Diff,
  RootNode,
  StateNode,
  ProvenanceNode,
  isStateNode,
  Nodes,
  CurrentNode,
  Artifacts,
  isChildNode,
  Extra
} from '@visdesignlab/trrack';
import Bars from "./FDBar"
import Graph from "./FDGraph"

import { ProvVis, EventConfig, Config, ProvVisConfig, ProvVisCreator, UndoRedoButtonCreator } from '../ProvVis/provvis';


export interface NodeState {
  nodeMap: {};
  selectedNode:string;
};

export interface NodeExtra {
  nodeGroup: number;
};

let initialState: NodeState = {
  nodeMap: {},
  selectedNode: 'none'
}

type EventTypes = "Selected Bar" | "Selected Node" | "Node Moved"

//
let eventConfig: EventConfig<EventTypes> = {
   "Selected Bar": {
     backboneGlyph: SelectedBar({size: 22}),
     currentGlyph: SelectedBar({size: 22, fill: "#2185d0"}),
     regularGlyph: SelectedBar({size: 16}),
     bundleGlyph: SelectedBar({size: 22, fill: "#cccccc"})
   },
   "Selected Node": {
     backboneGlyph: SelectedNode({size: 22}),
     currentGlyph: SelectedNode({size: 22, fill: "#2185d0"}),
     regularGlyph: SelectedNode({size: 16}),
     bundleGlyph: SelectedNode({size: 22, fill: "#cccccc"})
   },
   "Node Moved": {
     backboneGlyph: NodeMoved({size: 22}),
     currentGlyph: NodeMoved({size: 22, fill: "#2185d0"}),
     regularGlyph: NodeMoved({size: 16}),
     bundleGlyph: NodeMoved({size: 22, fill: "#cccccc"})
   }
 };

 let labels = false;
 let iconSize = 50;

 let regularCircleRadius = 7*(iconSize/100);
 let backboneCircleRadius = 7*(iconSize/100);

 const map: BundleMap = {};

d3.json("./data/miserables.json").then(graph => {
  let simulation = runSimulation(graph);

  let provenance = setupProvenance(graph);

  let hoverOver = function(currData){
    if(currData.id){
      barVis.hoverBar(currData.id);
      graphVis.hoverNode(currData.id);
    }
    else{
      barVis.hoverBar(currData);
      graphVis.hoverNode(currData);
    }
  }

  let hoverOut = function(){
    barVis.dehoverBars();
    graphVis.dehoverNodes();
  }

  //update prov vis when toggle gets changed
  let toggle = d3.select("#toggle");

  toggle.on("change", function(){
      labels = toggle.property("checked");

      provVisUpdate();

      //console.log(labels);
    });

  //update prov vis when slide bar gets moved
  let slider = d3.select("#slider");

  slider.on('input', function() {
      iconSize = slider.property("value");

      //adjust size of icons on all glyphs
      eventConfig["Selected Bar"].backboneGlyph = SelectedBar({size: 22*(iconSize/100)});
      eventConfig["Selected Bar"].currentGlyph = SelectedBar({size: 22*(iconSize/100), fill: "#2185d0"});
      eventConfig["Selected Bar"].regularGlyph = SelectedBar({size: 16*(iconSize/100)});
      eventConfig["Selected Bar"].bundleGlyph = SelectedBar({size: 22*(iconSize/100), fill: "#cccccc"});

      eventConfig["Selected Node"].backboneGlyph = SelectedNode({size: 22*(iconSize/100)});
      eventConfig["Selected Node"].currentGlyph = SelectedNode({size: 22*(iconSize/100), fill: "#2185d0"});
      eventConfig["Selected Node"].regularGlyph = SelectedNode({size: 16*(iconSize/100)});
      eventConfig["Selected Node"].bundleGlyph = SelectedNode({size: 22*(iconSize/100), fill: "#cccccc"});

      eventConfig["Node Moved"].backboneGlyph = NodeMoved({size: 22*(iconSize/100)});
      eventConfig["Node Moved"].currentGlyph = NodeMoved({size: 22*(iconSize/100), fill: "#2185d0"});
      eventConfig["Node Moved"].regularGlyph = NodeMoved({size: 16*(iconSize/100)});
      eventConfig["Node Moved"].bundleGlyph = NodeMoved({size: 22*(iconSize/100), fill: "#cccccc"});

      regularCircleRadius = 7*(iconSize/100);
      backboneCircleRadius = 7*(iconSize/100);

      //console.log(eventConfig["Selected Bar"].backboneGlyph);
      //console.log(size);
      provVisUpdate();
  });

  /**
  * Two callback functions where the actions are applied. Subsequently calls the observers, which
  * changes the les mis vis and updates the prov vis.
  */
  let select = function(currData){
    let action = provenance.addAction(
      currData.id ? currData.id + " Selected" : currData + " Selected",
      (state:NodeState) => {
        state.selectedNode = currData.id ? currData.id : currData;
        return state;
      }
    );

    action
          .addEventType(currData.id ? "Selected Bar" : "Selected Node")
          .addExtra({
            nodeGroup: currData.group
          })
          .applyAction();

    let graph = provenance.graph();
    let nodes = graph.nodes;
    //console.log(currData.id ? currData.id : currData);
    //console.log(provenance.getExtraFromArtifact(graph.current)[0].e.nodeGroup);

    console.log(map);
    //console.log(current.id);

    let bundle: Bundle = {
      metadata: [graph.current],
      bundleLabel: "Grouped Nodes",
      bunchedNodes: [],
    };

    // console.log("current node");
    // console.log(graph.current);

    //first check if parent is different from current
    let current = graph.nodes[graph.current];
    let parent;
    let count = 0;

    //first make sure current is a child
    if(isChildNode(current)){
      if(provenance.getExtraFromArtifact(current.id)[0]){
        let currentNum = provenance.getExtraFromArtifact(current.id)[0].e.nodeGroup;
        let parent = graph.nodes[current.parent];

        //make sure parent is a child
        if(isChildNode(parent)){
          if(provenance.getExtraFromArtifact(parent.id)[0]){
              let parentNum = provenance.getExtraFromArtifact(parent.id)[0].e.nodeGroup;

              //only loop if current is not the same as child
              if(parentNum != currentNum && currentNum && parentNum){

                current = parent;

                while(true){
                  if(isChildNode(current)){
                    if(provenance.getExtraFromArtifact(current.id)[0]){

                        let currentNum = provenance.getExtraFromArtifact(current.id)[0].e.nodeGroup;
                        let parent = graph.nodes[current.parent];

                        //if they are equal, add to bundle and increment count
                        if(currentNum == parentNum){
                          bundle.bunchedNodes.push(current.id);
                          count++;
                        }
                        else{
                          break;
                        }
                        current = parent;

                    }
                    else{
                        break;
                    }
                  }
                  else{
                      break;
                  }
              }
            }

        }
      }
      }

    }

    //bundle them on first node that is in same group
    if(count >= 3){
      map[current.children[0]] = bundle;
    }



  }

  let dragEnded = function(d){
    //Doing this so clicking on node-link doesnt cause two state changes.
    const state = provenance.current().getState();

    if(state.nodeMap[d.id][0] >= d.x -.1 &&
       state.nodeMap[d.id][0] <= d.x + .1 &&
       state.nodeMap[d.id][1] >= d.y -.1 &&
       state.nodeMap[d.id][1] <= d.y + .1){
      return;
    }

    let action = provenance.addAction(
      d.id + " Moved",
      (state:NodeState) => {
        state.nodeMap[d.id][0] = d.x;
        state.nodeMap[d.id][1] = d.y;
        return state;
      }
    );

    action.addEventType("Node Moved").applyAction();
  }

  const barVis = new Bars(graph, hoverOver, hoverOut, select);
  const graphVis = new Graph(graph, hoverOver, hoverOut, select, dragEnded);


  /*
  * Setting up observers. Called on state changed.
  */

  provenance.addObserver(["selectedNode"], () => {
    barVis.selectBar(provenance.current().getState().selectedNode);
    graphVis.selectNode(provenance.current().getState().selectedNode);

    provVisUpdate()
  });

  provenance.addObserver(["nodeMap"], () => {
    graphVis.moveNodes(provenance.current().getState().nodeMap);

    //console.log("moved")
    provVisUpdate()
  });

  provenance.done();

  /**
  *
  * Setting up undo/redo keys
  *
  */
  document.onkeydown = function(e){
    var mac = /(Mac|iPhone|iPod|iPad)/i.test(navigator.platform);
    console.log(mac);

    if(!e.shiftKey && (mac ? e.metaKey : e.ctrlKey) && e.which == 90){
      undo();
    }
    else if(e.shiftKey && (mac ? e.metaKey : e.ctrlKey) && e.which == 90){
      redo();
    }
  }

  function undo(){
    provenance.goBackOneStep();
  }

  function redo(){
    if(provenance.current().children.length == 0){
      return;
    }
    provenance.goToNode(provenance.current().children[provenance.current().children.length - 1])
  }

  function provVisUpdate()
  {
    ProvVisCreator(
      document.getElementById("provDiv")!,
      provenance,
      (id: NodeID) => provenance.goToNode(id),
      false,
      false,
      undefined,
      {
        eventConfig: eventConfig,
        regularCircleRadius: regularCircleRadius,
        backboneCircleRadius: backboneCircleRadius,
        iconOnly: labels,
        iconSize: iconSize,
        bundleMap: map,
        editAnnotations: true
      });

  }

  provVisUpdate();
});



/*
* Creates starting state. Is called after running simulations.
* Creates and returns provenance object.
*/
function setupProvenance(graph) : Provenance<NodeState, any, any>{

  var dict = {}
  let arr:any[] = graph.nodes;

  for (let i = 0; i < arr.length; i++)
  {
    let curr = arr[i].id
    dict[curr]  = [arr[i].x, arr[i].y]
  }

  initialState.nodeMap = dict;

  const provenance = initProvenance<NodeState, EventTypes, NodeExtra>(initialState);

  return provenance;
}

/*
* Runs the force simulation 300 times. Only done at beginning to find initial placement.
*
*/

function runSimulation(graph){
  let simulation = d3.forceSimulation()
      .force("link", d3.forceLink().id(function(d:any) { return d.id; }))
      .force("charge", d3.forceManyBody())
      .force("center", d3.forceCenter(800 / 2, 1000 / 2));

  simulation
      .nodes(graph.nodes);

  simulation.force<d3.ForceLink<any, any>>('link').links(graph.links);

  for(let i = 0; i < 300; i++){
    simulation.tick();
  }

  return simulation;
}
