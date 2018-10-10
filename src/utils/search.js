import launchExport from './recognizer';


export default function search(term, editor){
  const strokeGroups = editor.model.strokeGroups;
  const interpretationOptions = {
    requestedMimeTypes : "application/vnd.myscript.jiix",
    handwritingMode : true,
    textRecoOn : true,
    jiixWithStrokes : true,
    jiixWithWords : true,
    jiixWithBoudingBox : true,
    
  };
  
  launchExport(strokeGroups, "Raw Content", ["application/vnd.myscript.jiix"], interpretationOptions, buildStoreCallback(term, editor));
        
}


function buildStoreCallback(term, editor){
  // Defining the behavior on recognition result
  const recognitionCallback = (err, x) => {
    
    if (!err) {
      const jiix = x.exports["application/vnd.myscript.jiix"];
      if(jiix){
        // eslint-disable-next-line
        console.log('jiix = ', {term,  jiix});
        return editor;
      }
    }
  };
  return(recognitionCallback);
}