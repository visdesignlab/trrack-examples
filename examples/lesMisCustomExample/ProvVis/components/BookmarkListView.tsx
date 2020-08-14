
import { ProvenanceGraph } from '@visdesignlab/trrack';

import { style } from 'typestyle';
import { NodeGroup } from 'react-move';
import BookmarkTransitions from './BookmarkTransitions';
import React, { ReactChild, useEffect, useState } from 'react';
import {isChildNode, ProvenanceNode} from '@visdesignlab/trrack';

export interface BookmarkListViewConfig<T, S extends string, A> {
  graph?: ProvenanceGraph<T, S, A>;
}



function BookmarkListView<T, S extends string, A>({
  graph

} : BookmarkListViewConfig<T, S, A> ) {

  if(graph === undefined)
  {
    return null;
  }

  let gutter = 15;
  let verticalSpace = 50;
  let clusterVerticalSpace = 50;
  let backboneGutter = 20;
  let duration = 600;


  const isAtRoot = graph.root === graph.current;
  const isAtLatest = graph.nodes[graph.current].children.length === 0;

  let current = graph.nodes[graph.current];
  let nodesNum = graph.nodes[graph.current].children.length;

  let bookmarks = [];

  const xOffset = gutter;
  const yOffset = verticalSpace;


  if(isChildNode(current)){
    while(true)
      if(isChildNode(current)){
        if(current.bookmarked){
          bookmarks.push(current);
        }
        else{
          break;
        }
        current = graph.nodes[current.parent];
    }
  }

  //let nodeList = bookmarks;


 //  const items = [];
 //  for (const [index, value] of bookmarkList.entries()) {
 //   items.push(<li key={index}>{value}</li>)
 // }

 console.log(bookmarks);


  let margin = {
    marginRight: "1px"
  } as React.CSSProperties

  return (

    <div>
      <g className={dot}>
        <NodeGroup
          data={bookmarks}
          keyAccessor={(d) => d.label}
          {...BookmarkTransitions(
            xOffset,
            yOffset,
            clusterVerticalSpace,
            backboneGutter - gutter,
            duration,
            bookmarks
          )}
        >
          {(nodes) => (
            <>
              {nodes.map((node) => {
                const { data: d, key, state } = node;

                return (
                  <g key={key}>
                  </g>
                );
              })}
            </>
          )}
        </NodeGroup>
        </g>
    </div>


 );
}

 const dot = style({
  display: "inline-block",
  marginRight: "1px",
  marginLeft: "10px",
  color:"#cccccc",

});

const marginRight = style({
  marginRight:"1px",

});


export default BookmarkListView;
