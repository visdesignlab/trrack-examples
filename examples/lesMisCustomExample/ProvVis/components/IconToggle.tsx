import { ProvenanceGraph } from '@visdesignlab/trrack';

import React, {Component} from 'react';


import { style } from 'typestyle';

export interface IconToggleConfig<T, S extends string, A> {
  graph?: ProvenanceGraph<T, S, A>;
  iconOnly: boolean;
  setIconOnly: (b: boolean) => void;
}

function  IconToggle<T, S extends string, A>({
  graph,
  iconOnly,
  setIconOnly
} : IconToggleConfig<T, S, A> ) {

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

    <>
     <div className='custom-control custom-switch'>
       <input
         type='checkbox'
         className='custom-control-input'
         id='customSwitches'
         onChange={(e) => {setIconOnly(!iconOnly)}}
         readOnly
       />
       <label className='custom-control-label' htmlFor='customSwitches'>
        Icons Only
       </label>
     </div>
   </>



 );
}
export default IconToggle;
