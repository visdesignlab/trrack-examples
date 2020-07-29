import React, {FC, MutableRefObject} from 'react';
import styled from 'styled-components';

interface OwnProps {
  ref: MutableRefObject<SVGSVGElement>;
  children?: any;
}

type Props = OwnProps;

const FullSizeSVG: FC<Props> = (props: Props) => {
  return <SVG ref={props.ref}>{props.children}</SVG>;
};

export default FullSizeSVG;

const SVG = styled.svg`
  height: 100%;
  width: 100%;
`;
