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

function convertRawStrokesToXY(rawStrokes){
  let xycontent = rawStrokes.length + "\n";
  rawStrokes.forEach(stroke => {
    xycontent += stroke.x.length + "\n";
    stroke.x.forEach((x, pos) => xycontent += x + " "+ stroke.y[pos] + "\n")
  })
  return xycontent;
}

function convertRawStrokesToPointerevents(rawStrokes){
  const pointerEvents = {
    events : rawStrokes.map(rawStroke => {
      return {
        "pointerType": "PEN",
        "pointerId": rawStroke.pointerId,
        "x": rawStroke.x,
        "y": rawStroke.y,
        "t": rawStroke.t,
        "p": rawStroke.p
      };
    })
  }
  return ""+JSON.stringify(pointerEvents, ' ', 2)
}


export default {convertXYToStrokeGroup, convertPointerEventsToStrokeGroup, convertRawStrokesToXY, convertRawStrokesToPointerevents};