
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

// function download(content, fileName, contentType) {
//     var a = document.createElement("a");
//     var file = new Blob([content], {type: contentType});
//     a.href = URL.createObjectURL(file);
//     a.download = fileName;
//     a.click();
// }

const config = {
  apiKey: "AIzaSyAdGhNvUkAKeMWhzPHfuoXPUC36gBj68wU",
  authDomain: "mvn-turk.firebaseapp.com",
  databaseURL: "https://mvn-turk.firebaseio.com",
  projectId: "mvn-turk",
  storageBucket: "",
  messagingSenderId: "83565157892",
  appId: "1:83565157892:web:9fff8e165c4e2651"
};

const firebaseConfig = {
  apiKey: "AIzaSyDTzSonRW7uojuqvbWzn7vxGNExXl61hm4",
  authDomain: "mvnv-study.firebaseapp.com",
  databaseURL: "https://mvnv-study.firebaseio.com",
  projectId: "mvnv-study",
  storageBucket: "mvnv-study.appspot.com",
  messagingSenderId: "217128159504",
  appId: "1:217128159504:web:73df3ecf61ac72f0e9fd95"
};

const app: firebase.app.App = firebase.initializeApp(config, "loadApp")

const db = firebase.firestore(app);

const saveApp: firebase.app.App = firebase.initializeApp(firebaseConfig, "saveApp")

const saveDb = firebase.database(saveApp);


// export function initializeFirebase() {
//
//
//   const rtd = firebase.database(app);
//   const graphRTD = app.database(
//     "https://task-provenance-database.firebaseio.com/"
//   );
//
//   return {
//     config,
//     app,
//     firestore,
//     rtd,
//     graphRTD,
//   };
// }

// var userId = firebase.auth().currentUser.uid;
// return firebase.database().ref('/users/' + userId).once('value').then(function(snapshot) {
//   var username = (snapshot.val() && snapshot.val().username) || 'Anonymous';
//   // ...
// });

// let f = initializeFirebase();

export async function fetchProvenance() {
  paginate(0, false);
}

function writeToFirebase(prov: Provenance<any, any, any>) {

    let graph = prov.graph();

    const path: string = `${graph.nodes[graph.current].metadata.workerID}`;
    const taskId = `${graph.nodes[graph.current].metadata.taskID}`;
    //
    const jsonExport = JSON.parse(prov.exportProvenanceGraph());

    if(path.charAt(0) !== "5")
    {
      console.log(path);
      return;
    }

    // console.log(jsonExport);
    //
    saveDb
      .ref(`${path}/${taskId}`)
      .set(jsonExport)
      .then(() => {
        const log = {
          time: Date.now(),
          status: 'error',
          currentNodeId: graph.current
        };
      })
      .catch(err => {
        console.log(err);
        throw new Error('Something went wrong while logging.');
      });
};


async function paginate(i, lastDoc) {
  let ref;

  if (lastDoc) {
    ref = db
      .collection("provenance")
      .orderBy("initialSetup")
      .startAfter(lastDoc.data().initialSetup)
      .limit(1);
  } else {
    ref = db.collection("provenance").orderBy("id").limit(1);
  }

  // console.log(ref);

  ref.get().then((snapshot) => {
    // ...
    let numDocs = snapshot.docs.length;
    // console.log("numDocs", numDocs);

    let data = JSON.stringify(
      snapshot.docs.map((d) => {
        return {
          id: d.id,
          data: d.data(),
        };
      })
    );

    let allNodes = JSON.parse(data)

    for(let k in allNodes)
    {
        let states = allNodes[k].data.provGraphs
        let statesCopy = JSON.parse(JSON.stringify(states));
        let statesLabels: string[] = [];
        let statesMetadata: any[] = [];

        if(states[0].hardSelected)
        {
          for(let i = 0; i < statesCopy.length; i++)
          {
            statesLabels.push(statesCopy[i].event)
            statesMetadata.push({
              createdOn: statesCopy[i].time,
              type: statesCopy[i].event,
              startTime: statesCopy[i].startTime,
              workerID: statesCopy[i].workerID,
              taskID: statesCopy[i].taskID,
              order: statesCopy[i].order
            })

            delete statesCopy[i].event
            delete statesCopy[i].startTime
            delete statesCopy[i].time
            delete statesCopy[i].workerID
            delete statesCopy[i].taskID
            delete statesCopy[i].order

          }
        }
        else{
          for(let i = 0; i < statesCopy.length; i++)
          {
            if(!statesCopy[i].event)
            {
              statesCopy[i].event = "started provenance"
            }
            statesLabels.push(statesCopy[i].event)
            statesMetadata.push({
              createdOn: statesCopy[i].time,
              type: statesCopy[i].event,
              startTime: statesCopy[i].startTime,
              workerID: statesCopy[i].workerID,
              taskID: statesCopy[i].taskID.taskID,
              order: statesCopy[i].order
            })

            delete statesCopy[i].event
            delete statesCopy[i].startTime
            delete statesCopy[i].time
            delete statesCopy[i].workerID
            delete statesCopy[i].taskID
            delete statesCopy[i].order

          }
        }

        let prov = initProvenance<any, any, any>({});
        prov.importLinearStates(statesCopy, statesLabels, statesMetadata);

        writeToFirebase(prov);
    }

    let last = snapshot.docs[snapshot.docs.length - 1];
    //
    if (numDocs === 1) {
      console.log(i)
      paginate(i + 1, last);
    }
    else{
      console.log("done!");
    }
  });
}

fetchProvenance();
