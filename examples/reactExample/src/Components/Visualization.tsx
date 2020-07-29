import React, {FC, useMemo, useState} from 'react';
import styled from 'styled-components';
import data from '../Data/miserables.json';
import BarVisualization from './BarChart/BarVisualization';
import {inject, observer} from 'mobx-react';
import NodeLinkVisualization from './NodeLink/NodeLinkVisualization';
import {forceSimulation, forceLink, forceManyBody, forceCenter} from 'd3';
import {actions} from '../';
import Store from '../Interfaces/Store.js';

interface OwnProps {
  store?: Store;
}

type Props = OwnProps;

const Visualization: FC<Props> = ({store}: Props) => {
  const {isNodePositionSet} = store!;
  const graphString = JSON.stringify(data);

  const [dimension, setDimensions] = useState({height: 0, width: 0});

  const dimensionString = JSON.stringify(dimension);

  const barData = useMemo(() => {
    const grph = JSON.parse(graphString);
    const bar = JSON.parse(graphString);

    const {height, width} = JSON.parse(dimensionString);

    const simulation = forceSimulation()
      .force('link', forceLink().id((d: any) => d.id))
      .force('charge', forceManyBody().strength(-100))
      .force('center', forceCenter(width / 2, height / 2));

    simulation.nodes(grph.nodes);
    (simulation as any).force('link').links(grph.links);

    for (let i = 0; i < 300; ++i) {
      simulation.tick();
    }

    if (height > 0 && width > 0) {
      if (!isNodePositionSet) {
        actions.setNodePositions({...grph});
      }
    }

    return bar;
  }, [graphString, dimensionString, isNodePositionSet]);

  return (
    <VisualizationDiv>
      <VisPadding>
        <VisualizationBorder>
          <NodeLinkVisualization
            pushDimension={setDimensions}></NodeLinkVisualization>
        </VisualizationBorder>
      </VisPadding>
      <VisPadding>
        <VisualizationBorder>
          <BarVisualization data={barData}></BarVisualization>
        </VisualizationBorder>
      </VisPadding>
    </VisualizationDiv>
  );
};

export default inject('store')(observer(Visualization));

const VisualizationBorder = styled.div`
  height: 100%;
  width: 100%;
  border: 1px solid black;
`;

const VisPadding = styled.div`
  height: 100%;
  width: 100%;
  padding: 1em;
`;

const VisualizationDiv = styled.div`
  height: 100%;
  width: 100%;
  padding: 1em;
  display: grid;
  grid-template-columns: 1fr 1fr;
`;
