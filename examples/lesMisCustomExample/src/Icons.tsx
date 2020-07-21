import React from 'react';
// import { symbol, symbols } from 'd3';

interface AddTaskGlyphProps {
  size?: number;
  fill?: string;
  scale?: number;
}

function translate(x: number, y: number): string {
  return `translate(${x}, ${y})`;
}


//Occurs on clear all click ???
export function SelectedBar({ size = 15, fill = "#ccc" }: AddTaskGlyphProps) {
  return (
    <g>
      <circle fill="white" r={size - size / 4} />
      <g>
        <text
          fontSize={size}
          fill={fill}
          textAnchor="middle"
          dominantBaseline="middle"
          fontFamily="FontAwesome"
        >
          &#xf05b;
        </text>
      </g>
    </g>
  );
}

//Occurs on clear all click ???
export function SelectedNode({ size = 15, fill = "#ccc" }: AddTaskGlyphProps) {
  return (
    <g>
      <circle fill="white" r={size - size / 4} />
      <g>
        <text
          fontSize={size}
          fill={fill}
          textAnchor="middle"
          dominantBaseline="middle"
          fontFamily="FontAwesome"
        >
          &#xf13d;
        </text>
      </g>
    </g>
  );
}

//Occurs on clear all click ???
export function NodeMoved({ size = 15, fill = "#ccc" }: AddTaskGlyphProps) {
  return (
    <g>
      <circle fill="white" r={size - size / 4} />
      <g>
        <text
          fontSize={size}
          fill={fill}
          textAnchor="middle"
          dominantBaseline="middle"
          fontFamily="FontAwesome"
        >
          &#xf1b9;
        </text>
      </g>
    </g>
  );
}
