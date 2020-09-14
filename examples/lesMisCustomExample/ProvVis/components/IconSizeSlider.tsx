import { ProvenanceGraph } from '@visdesignlab/trrack';

import React, {Component} from 'react';
import { EventConfig } from '../Utils/EventConfig';




import { style } from 'typestyle';

export interface IconSizeSliderConfig<T, S extends string, A> {
  graph?: ProvenanceGraph<T, S, A>;
  eventConfig?: EventConfig<S>;
  iconSize: number;
  setIconSize: (b: number) => void;
}

function  IconSizeSlider<T, S extends string, A>({
  graph,
  eventConfig,
  iconSize,
  setIconSize
} : IconSizeSliderConfig<T, S, A> ) {

  if(graph === undefined)
  {
    return null;
  }


  // regularCircleRadius = 7*(iconSize/100);
  // backboneCircleRadius = 7*(iconSize/100);


  const isAtRoot = graph.root === graph.current;
  const isAtLatest = graph.nodes[graph.current].children.length === 0;

  let margin = {
    marginRight: "1px"
  } as React.CSSProperties

  return (

    <>
    <div className="my-5">
     <label htmlFor="customRange1">Icon Size</label>
      <input  type="range"
              min="0"
              max="100"
              className="custom-range"
              id="customRange1"
              value={iconSize}
              onChange={e => setIconSize(parseInt(e.target.value, 10))}
              />
   </div>
   </>
   //
   // <RangeSlider
   //   value={iconSize}
   //   onChange={e => setIconSize(e.target.value)}
   // />



 );
}
export default IconSizeSlider;
