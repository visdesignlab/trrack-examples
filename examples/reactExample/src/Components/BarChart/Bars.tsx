import React, {FC, useEffect, useMemo} from 'react';
import Store from '../../Interfaces/Store';
import {inject, observer} from 'mobx-react';
import {
  scaleLinear,
  scaleBand,
  min,
  max,
  select,
  axisBottom,
  axisLeft,
  selectAll,
} from 'd3';
import styled from 'styled-components';
import {actions} from '../..';
import {Popup, Header} from 'semantic-ui-react';

interface OwnProps {
  store?: Store;
  height: number;
  width: number;
  data: {character: string; count: number}[];
}

type Props = OwnProps;

const convertIDtoClassForm = (str: string): string => {
  return str.replace('.', '_');
};

const Bars: FC<Props> = ({store, width, height, data}: Props) => {
  const {selectedNode} = store!;

  const [xScale, yScale] = useMemo(() => {
    const counts = data.map(d => d.count);
    const [minCount, maxCount] = [min(counts) || 0, max(counts) || 0];

    const xScale = scaleBand()
      .domain(data.map(d => d.character))
      .range([0, width])
      .paddingInner(0.2)
      .paddingOuter(0.2);

    const yScale = scaleLinear()
      .domain([maxCount, minCount])
      .range([0, height])
      .nice();

    return [xScale, yScale];
  }, [height, width, data]);

  useEffect(() => {
    const xAxis = axisBottom(xScale);
    const yAxis = axisLeft(yScale);

    select('.x-axis').call(xAxis as any);
    select('.y-axis').call(yAxis as any);

    select('.x-axis')
      .selectAll('text')
      .style('text-anchor', 'end')
      .attr('transform', 'rotate(-90)')
      .attr('dx', '-1em')
      .attr('class', (d: any) => {
        return `bar-text ${convertIDtoClassForm(d)}`;
      })
      .attr('dy', '-1em')
      .style('dominant-baseline', 'middle');
  }, [xScale, yScale]);

  return (
    <>
      <g className="axes">
        <g transform={`translate(0, ${height})`} className="x-axis"></g>
        <g className="y-axis"></g>
      </g>
      <g className="bars">
        {data.map(({character, count}) => (
          <Popup
            key={character}
            trigger={
              <Bar
                isSelected={selectedNode === character}
                onClick={() => actions.selectNode(character)}
                className={convertIDtoClassForm(character)}
                onMouseOver={() => {
                  selectAll(`.${convertIDtoClassForm(character)}`)
                    .style('font-weight', 'bold')
                    .attr('r', 12);
                }}
                onMouseOut={() => {
                  const el = selectAll(
                    `.${convertIDtoClassForm(character)}`,
                  ).style('font-weight', 'normal');
                  if (character !== selectedNode) el.attr('r', 8);
                }}
                x={xScale(character)}
                y={yScale(count)}
                width={xScale.bandwidth()}
                height={height - yScale(count)}></Bar>
            }
            content={<Header>{character}</Header>}></Popup>
        ))}
      </g>
    </>
  );
};

export default inject('store')(observer(Bars));

interface BarProps {
  isSelected: boolean;
}

const Bar = styled('rect')<BarProps>`
  fill: ${props => (props.isSelected ? 'red' : 'steelblue')};
  &:hover {
    fill: ${props => (props.isSelected ? 'red' : 'blueviolet')};
  }
`;
