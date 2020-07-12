
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
  Extra
} from '@visdesignlab/provenance-lib-core';
import Scatterplot from "./scatterplot"

import * as d3 from "d3"


import 'firebase/database';
import 'firebase/firestore';

import firebase from 'firebase/app';

function download(content, fileName, contentType) {
    var a = document.createElement("a");
    var file = new Blob([content], {type: contentType});
    a.href = URL.createObjectURL(file);
    a.download = fileName;
    a.click();
}

const config = {
  apiKey: "AIzaSyA5uubr3-bnPNn_hEpvH_OhAIk9HJ_T53U",
  authDomain: "intent-system-prolific.firebaseapp.com",
  databaseURL: "https://intent-system-prolific.firebaseio.com",
  projectId: "intent-system-prolific",
  storageBucket: "intent-system-prolific.appspot.com",
  messagingSenderId: "393407031419",
  appId: "1:393407031419:web:bd3c2216c601d011ee1ade",
  measurementId: "G-RQ8LS8DWT9",
};

export function initializeFirebase() {
  const app: firebase.app.App =
    firebase.apps.length === 0
      ? firebase.initializeApp(config)
      : firebase.app();

  const firestore = firebase.firestore(app);
  const rtd = firebase.database(app);
  const graphRTD = app.database(
    "https://task-provenance-database.firebaseio.com/"
  );

  return {
    config,
    app,
    firestore,
    rtd,
    graphRTD,
  };
}

// var userId = firebase.auth().currentUser.uid;
// return firebase.database().ref('/users/' + userId).once('value').then(function(snapshot) {
//   var username = (snapshot.val() && snapshot.val().username) || 'Anonymous';
//   // ...
// });

let f = initializeFirebase();

console.log(f.graphRTD.ref("565955077d6957000adfe029"))

f.graphRTD
  .ref("565955077d6957000adfe029")
  .once("value")
  .then(function(dataSnapshot) {
    console.log("here")
    console.log(dataSnapshot.val())

    let data = dataSnapshot.val()

    for(let userId in data)
    {
      for(let sessionId in data[userId])
      {
        for(let taskId in data[userId][sessionId])
        {
          let states = []

          let oldGraph = data[userId][sessionId][taskId]

          // download(JSON.stringify(oldGraph), `data/${userId}/${sessionId}/${taskId}`, 'text/plain');
        }
      }
    }

    // let dataJson: any = dataSnapshot.val();
    // if (
    //   !dataJson ||
    //   !dataJson["nodes"] ||
    //   !dataJson["current"] ||
    //   !dataJson["root"]
    // ) {
    //   return;
    // }
    //
    // for (let j in dataJson.nodes) {
    //   if (!dataJson.nodes[j].children) {
    //     dataJson.nodes[j].children = [];
    //   }
    // }
    //
    // console.log(dataJson);
    // provenance.importProvenanceGraph(JSON.stringify(dataJson));
  });

let states: any[] = [];
let labels: any[] = [];
let metadata: any[] = []


d3.json("data/data_5e9d0b215591a023ba932a8d_5e9d1df256b31c2493a33c91_1587355139382_24a8ede6-01e8-4ca4-a196-99179cc60ae4.json").then((d: any) => {

  let sortedArr = Object.keys(d.nodes).sort((a, b) => {
    return d.nodes[a].metadata.createdOn - d.nodes[b].metadata.createdOn
  })

  console.log(sortedArr);

  for(let j of sortedArr)
  {
    console.log(j)
    states.push(d.nodes[j].state);
    metadata.push(d.nodes[j].metadata);
    labels.push(d.nodes[j].label);
  }

  let prov = initProvenance<any, any, any>({}, false)

  console.log(labels);
  prov.importLinearStates(states, labels, metadata);

  console.log(JSON.parse(JSON.stringify(d)))
  console.log(JSON.parse(JSON.stringify(prov.graph())));
})


//
// /**
// * interface representing the state of the application
// */
// export interface NodeState {
//   selectedQuartet:string;
//   selectedNode:string;
//   hoveredNode:string;
// };
//
// /**
// * Initial state
// */
//
// const initialState: NodeState = {
//   selectedQuartet: 'I',
//   selectedNode: 'none',
//   hoveredNode: 'none'
// }
//
// type EventTypes = "Change Quartet" | "Select Node" | "Hover Node"
//
// //initialize provenance with the first state
// let prov = initProvenance<NodeState, EventTypes, string>(initialState, false);
//
// //Set up apply action functions for each of the 3 actions that affect state
//
// /**
// * Function called when the quartet number is changed. Applies an action to provenance.
// * This is a complex action, meaning it always stores a state node.
// */
//
// let changeQuartetUpdate = function(newQuartet: string){
//   //create prov Object
//
//   let action = prov.addAction(
//     "Quartet " + newQuartet + " Selected",
//     (state:NodeState) => {
//       state.selectedQuartet = newQuartet;
//       return state;
//     }
//   )
//
//   action
//     .addEventType("Change Quartet")
//     .alwaysStoreState(true)
//     .applyAction();
// }
//
// /**
// * Function called when a node is selected. Applies an action to provenance.
// */
//
// let selectNodeUpdate = function(newSelected: string){
//   let action = prov.addAction(
//     newSelected + " Selected",
//     (state:NodeState) => {
//       state.selectedNode = newSelected;
//       return state;
//     }
//   )
//
//   action
//     .addEventType("Select Node")
//     .applyAction();
// }
//
// /**
// * Function called when a node is hovered. Applies an action to provenance.
// */
//
// let hoverNodeUpdate = function(newHover: string){
//   let action = prov.addAction(
//     newHover === "" ? "Hover Removed" : newHover + " Hovered",
//     (state:NodeState) => {
//       state.hoveredNode = newHover;
//       return state;
//     }
//   )
//
//   action
//     .addEventType("Hover Node")
//     .applyAction();
// }
//
// // Create our scatterplot class which handles the actual vis. Pass it our three action functions
// // so it can use them when appropriate.
// let scatterplot = new Scatterplot(changeQuartetUpdate, selectNodeUpdate, hoverNodeUpdate);
//
// //Create function to pass to the ProvVis library for when a node is selected in the graph.
// //For our purposes, were simply going to jump to the selected node.
// let visCallback = function(newNode:NodeID)
// {
//   prov.goToNode(newNode);
//
//   //Incase the state doesn't change and the observers arent called, updating the ProvVis here.
//   provVisUpdate()
// }
//
// // Set up observers for the three keys in state. These observers will get called either when an applyAction
// // function changes the associated keys value.
//
// // Also will be called when an internal graph change such as goBackNSteps, goBackOneStep or goToNode
// // change the keys value.
//
// /**
// * Observer for when the quartet state is changed. Calls changeQuartet in scatterplot to update vis.
// */
// prov.addObserver(["selectedQuartet"], () => {
//   scatterplot.changeQuartet(prov.current().getState().selectedQuartet);
//
//   provVisUpdate()
//
// });
//
// /**
// * Observer for when the selected node state is changed. Calls selectNode in scatterplot to update vis.
// */
// prov.addObserver(["selectedNode"], () => {
//   scatterplot.selectNode(prov.current().getState().selectedNode);
//
//   console.log("select obs called")
//
//   provVisUpdate()
//
// });
//
// /**
// * Observer for when the hovered node state is changed. Calls hoverNode in scatterplot to update vis.
// */
// prov.addObserver(["hoveredNode"], () => {
//   scatterplot.hoverNode(prov.current().getState().hoveredNode);
//
//   provVisUpdate()
//
// });
//
// //Setup ProvVis once initially
// provVisUpdate()
//
//
// // Undo function which simply goes one step backwards in the graph.
// function undo(){
//   prov.goBackOneStep();
// }
//
// //Redo function which traverses down the tree one step.
// function redo(){
//   if(prov.current().children.length == 0){
//     return;
//   }
//   prov.goForwardOneStep();
// }
//
// function provVisUpdate()
// {
//   ProvVisCreator(
//     document.getElementById("provDiv")!,
//     prov,
//     visCallback);
// }
//
// //Setting up undo/redo hotkey to typical buttons
// document.onkeydown = function(e){
//   var mac = /(Mac|iPhone|iPod|iPad)/i.test(navigator.platform);
//
//   if(!e.shiftKey && (mac ? e.metaKey : e.ctrlKey) && e.which == 90){
//     undo();
//   }
//   else if(e.shiftKey && (mac ? e.metaKey : e.ctrlKey) && e.which == 90){
//     redo();
//   }
// }
