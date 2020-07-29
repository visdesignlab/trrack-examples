import React, {FC, useEffect} from 'react';
import Store from '../../Interfaces/Store';
import {actions} from '../..';
import * as d3 from 'd3';
import {inject, observer} from 'mobx-react';
import {select, scaleOrdinal, schemeCategory10, drag, selectAll} from 'd3';
import styled from 'styled-components';
import {Popup, Header} from 'semantic-ui-react';

interface OwnProps {
  store?: Store;
  height: number;
  width: number;
}

type Props = OwnProps;

const convertIDtoClassForm = (str: string): string => {
  return str.replace('.', '_');
};

const NodeLinkDetails: FC<Props> = ({store, height, width}: Props) => {
  const {getNodePositions, isNodePositionSet, selectedNode} = store!;

  let {nodes, links} = getNodePositions;

  const neighbourNodeIds: string[] = [];

  const selNode = nodes.find((d: any) => d.id === selectedNode);

  if (selNode) {
    links.forEach((link: any) => {
      if (link.source.id === selectedNode) {
        neighbourNodeIds.push(link.target.id);
      }
      if (link.target.id === selectedNode) {
        neighbourNodeIds.push(link.source.id);
      }
    });
  }

  if (isNodePositionSet) {
    if (JSON.stringify(nodes) !== JSON.stringify(getNodePositions.nodes)) {
      nodes = getNodePositions.nodes;
      links = getNodePositions.links;
    }
  }

  const colorScale = scaleOrdinal(schemeCategory10);

  useEffect(() => {
    nodes.forEach((node: any) => {
      const nodeId = convertIDtoClassForm(node.id);
      const curr = select('.nodes').select(`.${nodeId}`);
      const sourceLinks = select('.links').selectAll(`.S_${nodeId}`);
      const targetLinks = select('.links').selectAll(`.T_${nodeId}`);

      curr.on('click', () => {
        actions.selectNode(node.id);
      });

      (curr as any).call(
        drag()
          .on('drag', () => {
            curr.attr('cx', d3.event.x);
            curr.attr('cy', d3.event.y);

            sourceLinks.attr('x1', d3.event.x);
            sourceLinks.attr('y1', d3.event.y);

            targetLinks.attr('x2', d3.event.x);
            targetLinks.attr('y2', d3.event.y);
          })
          .on('end', () => {
            node.x = d3.event.x;
            node.y = d3.event.y;

            links.forEach((link: any) => {
              if (link.source.id === node.id) {
                link.source = node;
              }
              if (link.target.id === node.id) {
                link.target = node;
              }
            });

            actions.setNodePositions({nodes, links});
          }),
      );
    });
  }, [nodes, links]);

  return (
    <>
      <g className="links">
        {links.map((link: any) => (
          <Link
            className={`link S_${convertIDtoClassForm(
              link.source.id,
            )} T_${convertIDtoClassForm(link.target.id)}`}
            key={link.index}
            x1={link.source.x}
            x2={link.target.x}
            y1={link.source.y}
            y2={link.target.y}></Link>
        ))}
      </g>
      <g className="nodes">
        {nodes.map((node: any) => (
          <Popup
            key={node.id}
            trigger={
              <Node
                isNeighbour={neighbourNodeIds.includes(node.id)}
                onMouseOver={() => {
                  const curr = selectAll(`.${convertIDtoClassForm(node.id)}`);
                  curr.attr('r', 12);
                  curr.style('fill', 'blueviolet !important');
                }}
                onMouseLeave={() => {
                  if (node.id !== selectedNode)
                    select(`.${convertIDtoClassForm(node.id)}`).attr('r', 8);
                }}
                className={`node ${convertIDtoClassForm(node.id)}`}
                cx={node.x}
                cy={node.y}
                r={node.id === selectedNode ? 12 : 8}
                fill={colorScale(node.group)}></Node>
            }
            content={<Header>{node.id}</Header>}></Popup>
        ))}
      </g>
    </>
  );
};

export default inject('store')(observer(NodeLinkDetails));

interface NodeProps {
  isNeighbour: boolean;
}

const Node = styled.circle<NodeProps>`
  stroke-width: ${props => (props.isNeighbour ? '2px' : '1.5px')};
  stroke: ${props => (props.isNeighbour ? '#000' : ' #fff')};
`;

const Link = styled.line`
  stroke-width: 2px;
  stroke: #ccc;
`;
