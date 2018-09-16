import MyScript from 'myscript/dist/myscript.esm';

// Creating a recognizer
const iinkRecognizer = MyScript.DefaultBehaviors.recognizerList.filter(x => {
  const infos = x.getInfo();
  return infos.apiVersion === 'V4' && infos.protocol === 'REST';
});

export function launchExport(strokeGroups, type, mimeTypes, store) {
  // Creating a empty model
      const model = MyScript.InkModel.createModel();
      // Filling the model with the stroke groups
      model.strokeGroups = strokeGroups;

      // Creating a recognizer context with the configuration attached
      const recognizerContext = MyScript.RecognizerContext.createEmptyRecognizerContext({
        configuration: MyScript.DefaultConfiguration
      });
      recognizerContext.editor.configuration.recognitionParams.type = type;
      recognizerContext.editor.configuration.recognitionParams.protocol = 'REST';
      recognizerContext.editor.configuration.recognitionParams.server = {
        scheme: 'https',
        host: 'webdemoapi.myscript.com',
        applicationKey: '515131ab-35fa-411c-bb4d-3917e00faf60',
        hmacKey: '54b2ca8a-6752-469d-87dd-553bb450e9ad'
      };

      // Assigning a theme to the document
      recognizerContext.editor.theme = MyScript.DefaultTheme;

      // Defining the behavior on recognition result
      const recognitionCallback = (err, x) => {
        if(!err){
          Object.entries(x.exports).forEach(([mimeType, exportValue]) => {
            store.commit('persistExportResult', {type : mimeType, exportValue : exportValue})
          })
        }
      };

      // Triggering the recognition
      iinkRecognizer[0].export_(recognizerContext, model, recognitionCallback, mimeTypes);
}