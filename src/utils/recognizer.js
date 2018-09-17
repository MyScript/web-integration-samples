import MyScript from 'myscript/dist/myscript.esm';

// Creating a recognizer
const iinkRecognizer = MyScript.DefaultBehaviors.recognizerList.filter(x => {
  const infos = x.getInfo();
  return infos.apiVersion === 'V4' && infos.protocol === 'REST';
});

const convertBlobToBase64 = (blob) => new Promise((resolve, reject) => {
  const reader = new FileReader;
  reader.onerror = reject;
  reader.onload = () => {
    resolve(reader.result);
  };
  reader.readAsDataURL(blob);
});

export function launchExport(strokeGroups, type, mimeTypes, interpretationOptions, store) {
  // Creating a empty model
  const model = MyScript.InkModel.createModel();
  // Filling the model with the stroke groups
  model.strokeGroups = strokeGroups;

  // Creating a recognizer context with the configuration attached
  const recognizerContext = MyScript.RecognizerContext.createEmptyRecognizerContext({
    configuration: MyScript.DefaultConfiguration
  });
  
  const configuration = recognizerContext.editor.configuration;
  if(!interpretationOptions.handwritingMode && type !== 'Raw Content'){
    configuration.restConversionState = 'DIGITAL_EDIT';
  }
  configuration.recognitionParams.type = type;
  configuration.recognitionParams.protocol = 'REST';
  configuration.recognitionParams.v4.lang = interpretationOptions.lang;
  configuration.recognitionParams.server = {
    scheme: 'https',
    host: 'webdemoapi.myscript.com',
    applicationKey: '515131ab-35fa-411c-bb4d-3917e00faf60',
    hmacKey: '54b2ca8a-6752-469d-87dd-553bb450e9ad'
  };

  // Assigning a theme to the document
  recognizerContext.editor.theme = MyScript.DefaultTheme;

  // Defining the behavior on recognition result
  const recognitionCallback = (err, x) => {
    // eslint-disable-next-line
    console.log('recognitionCallback ', {
      err,
      x
    });
    if (!err) {
      Object.entries(x.exports).forEach(([mimeType, exportValue]) => {
        // eslint-disable-next-line
        console.log('forEach ', {
          mimeType,
          exportValue
        });
        //TODO Store in base64
        if(mimeType.startsWith('image/png') || mimeType.startsWith('image/jpeg')){
          convertBlobToBase64(exportValue).then(exp => store.commit('persistExportResult', {
            type: mimeType,
            exportValue: exp
          }))
        } else {
        store.commit('persistExportResult', {
          type: mimeType,
          exportValue: exportValue
        })
        }
      })
    }
  };

  // Triggering the recognition
  iinkRecognizer[0].export_(recognizerContext, model, recognitionCallback, mimeTypes);
}