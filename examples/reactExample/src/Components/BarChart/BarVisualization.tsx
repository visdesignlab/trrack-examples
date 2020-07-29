import React, {FC, useRef, useLayoutEffect, useState, useMemo} from 'react';
import styled from 'styled-components';
import {inject, observer} from 'mobx-react';
import Bars from './Bars';
import Store from '../../Interfaces/Store';

interface OwnProps {
  data: any;
  store?: Store;
}

type Props = OwnProps;

const BarVisualization: FC<Props> = ({data, store}: Props) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const [dimensions, setDimensions] = useState({height: 0, width: 0});

  useLayoutEffect(() => {
    if (svgRef.current) {
      setDimensions({
        height: svgRef.current.clientHeight,
        width: svgRef.current.clientWidth,
      });
    }
  }, []);

  const {links} = data;

  const linkMap = useMemo(() => {
    const map: {[key: string]: number} = {};

    links.forEach((l: any) => {
      if (!map[l.source]) {
        map[l.source] = 0;
      }
      map[l.source] += 1;
      if (!map[l.target]) {
        map[l.target] = 0;
      }
      map[l.target] += 1;
    });

    const list = Object.keys(map).map(k => ({character: k, count: map[k]}));

    list.sort((a, b) => b.count - a.count);

    return list;
  }, [links]);

  const {width, height} = dimensions;
  const xPadding = width * 0.05;
  const yPadding = height * 0.12;

  return (
    <SVG ref={svgRef}>
      <g transform={`translate(${xPadding}, ${yPadding})`}>
        <Bars
          data={linkMap}
          height={height - 2 * yPadding}
          width={width - 2 * xPadding}></Bars>
      </g>
    </SVG>
  );
};

export default inject('store')(observer(BarVisualization));

const SVG = styled.svg`
  height: 100%;
  width: 100%;
`;
