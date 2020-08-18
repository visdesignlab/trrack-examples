import { getX } from './LinkTransitions';

export default function nodeTransitions(
  xOffset: number,
  yOffset: number,
  nodeList: any[],
) {
  xOffset = -xOffset;
  const start = (data: any) => {

    let x = 50;
    let y = 50*nodeList.length;;

    return { x: x, y: y - yOffset, opacity: 0 };
  };

  const enter = (data: any) => {

    const { source, target } = data;

    console.log(data);


    let x = 50;
    let y = 50*nodeList.length;

    return {
      x: [x],
      y: [y],
      opactiy: 1,
    };
  };

  const update = (data: any) => {
    // let backboneBundleNodes = findBackboneBundleNodes(nodeMap, bundleMap);
    let x = 50;
    let y = 50*nodeList.length;;

    return {
      x: [x],
      y: [y],
      opactiy: 1,
    };
  };

  return { enter, leave: start, update, start };
}
