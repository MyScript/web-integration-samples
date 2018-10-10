function convertXYToStrokeGroup(xy){
  const strokeGroups = [{
  penStyle: {},
    strokes: [
      ],
  }];
  const lines = xy.split("\n");
  const nbStrokes = Number.parseInt(lines[0]);
  let nextStrokeStart = 1;
  for(let i=0; i < nbStrokes; i++){
    const start = nextStrokeStart;
    nextStrokeStart += Number.parseInt(lines[nextStrokeStart]) + 1;
    const end = nextStrokeStart;
    const stroke = {
        type: 'stroke',
        x: [],
        y: [],
        l: [],
        p : [],
        t : []
    };
    for(let j=start+1; j < end; j++){
      let x, y; 
      [x,y] = lines[j].split(' ');
      stroke.x.push(Number.parseFloat(x));
      stroke.y.push(Number.parseFloat(y));
      //Other properties are emulated.
      stroke.p.push(1);
      stroke.t.push(j);
      stroke.l.push(1);
    }
    strokeGroups[0].strokes.push(stroke)
  }
  return strokeGroups;
}

function convertPointerEventsToStrokeGroup(pointerEvents){
  const strokeGroups = [{
    penStyle: {},
      strokes: [
        ],
    }];
    strokeGroups[0].strokes = pointerEvents.events;
    strokeGroups[0].strokes.forEach(stroke => {
      stroke.type= "stroke"
      stroke.l = [];
      stroke.x.forEach(() => stroke.l.push(1));
    });
    return strokeGroups;
}

export default {convertXYToStrokeGroup, convertPointerEventsToStrokeGroup};