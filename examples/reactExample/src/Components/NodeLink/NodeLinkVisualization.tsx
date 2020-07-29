import React, {FC, useState, useRef, useLayoutEffect} from 'react';
import Store from '../../Interfaces/Store';
import {inject, observer} from 'mobx-react';
import styled from 'styled-components';
import NodeLinkDetails from './NodeLinkDetails';

interface OwnProps {
  store?: Store;
  pushDimension: (dims: any) => void;
}

type Props = OwnProps;

const NodeLinkVisualization: FC<Props> = ({pushDimension, store}: Props) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const [dimensions, setDimensions] = useState({height: 0, width: 0});

  useLayoutEffect(() => {
    if (svgRef.current) {
      const newDims = {
        height: svgRef.current.clientHeight,
        width: svgRef.current.clientWidth,
      };
      if (JSON.stringify(newDims) !== JSON.stringify(dimensions)) {
        setDimensions(newDims);
        pushDimension(newDims);
      }
    }
  }, [pushDimension, dimensions]);

  return (
    <SVG ref={svgRef}>
      <NodeLinkDetails
        height={dimensions.height}
        width={dimensions.width}></NodeLinkDetails>
    </SVG>
  );
};

export default inject('store')(observer(NodeLinkVisualization));

const SVG = styled.svg`
  height: 100%;
  width: 100%;
`;
