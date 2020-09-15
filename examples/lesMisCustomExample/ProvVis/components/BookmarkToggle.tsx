
import { ProvenanceGraph } from '@visdesignlab/trrack';
import {Tabs, Tab} from 'react-bootstrap-tabs';

import React, {Component} from 'react';
import { style } from 'typestyle';

export interface BookmarkToggleConfig<T, S extends string, A> {
  graph?: ProvenanceGraph<T, S, A>;
  bookmarkView: boolean;
  setBookmarkView: (b: boolean) => void;

}

function  BookmarkToggle<T, S extends string, A>({
  graph,
  bookmarkView,
  setBookmarkView
} : BookmarkToggleConfig<T, S, A> ) {

  if(graph === undefined)
  {
    return null;
  }


  const isAtRoot = graph.root === graph.current;
  const isAtLatest = graph.nodes[graph.current].children.length === 0;

  let margin = {
    marginRight: "1px"
  } as React.CSSProperties

  return (

    // <label className='checkbox-inline'>
    //    <input
    //      type='checkbox'
    //      checked={bookmarkView}
    //      onChange= {(e) => {setBookmarkView(!bookmarkView)}}
    //    /> Show Bookmarked
    //
    //  </label>

    <Tabs activeKey={1} onSelect={(e) => {setBookmarkView(!bookmarkView)}}>
        <Tab eventKey={1} title="Provenance" label="Provenance">
        </Tab>
        <Tab eventKey={2} title="Bookmarks" label="Bookmarks">
        </Tab>
      </Tabs>



 );
}



const marginRight = style({
  marginRight:"1px",

});


export default BookmarkToggle;
