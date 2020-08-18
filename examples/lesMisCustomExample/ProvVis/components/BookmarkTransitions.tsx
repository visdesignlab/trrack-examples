
export default function BookmarkTransitions(
  xOffset: number,
  yOffset: number,
  nodeList: any[],
) {
  xOffset = -xOffset;
  console.log("transitions");


  const start = (data: any) => {
    let index;

    for(let i = 0; i < nodeList.length; i++){
      if(nodeList[i] == data){
        index = i;
      }
    }

    let x = 0;
    let y = 40*index;

    // console.log(y);
    // console.log(index);


    return { x: x, y: y - yOffset, opacity: 0 };
  };

  const enter = (data: any) => {
    let index;

    for(let i = 0; i < nodeList.length; i++){
      if(nodeList[i] == data){
        index = i;
      }
    }

    const { source, target } = data;

    console.log(data);
    console.log(nodeList);
    console.log(nodeList[0]);


    let x = 0;
    let y = 40*index;

    // console.log(y);
    // console.log(index);



    return {
      x: [x],
      y: [y],
      opactiy: 1,
    };
  };

  const update = (data: any) => {
    let index;

    for(let i = 0; i < nodeList.length; i++){
      if(nodeList[i] == data){
        index = i;
      }
    }
    // let backboneBundleNodes = findBackboneBundleNodes(nodeMap, bundleMap);
    let x = 0;
    let y = 40*index;

    // console.log(y);
    // console.log(index);

    return {
      x: [x],
      y: [y],
      opactiy: 1,
    };
  };

  return { enter, leave: start, update, start };
}
