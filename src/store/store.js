import Vuex from 'vuex'
import Vue from 'vue';
import models from './models'

Vue.use(Vuex);
const myStorage = window.localStorage;

let localStorageLocalContent;
try{
  localStorageLocalContent = JSON.parse(myStorage.getItem('localContent'));
} catch (error){
  localStorageLocalContent = []
}
if(!Array.isArray(localStorageLocalContent)){
  localStorageLocalContent = [];
}
const defaultState = {
  status : "WAITING_CONVERSION_OPTIONS",//"CONVERTING", "CONVERTED","CONTENT-MODIFIED"
  strokeGroups : [],
  recognitionOptions : {},
  exportResults : {},
  interpretationOptions : {
    partTypeOptionKey : '',
      lang: 'en_US',
      handwritingMode : false,
      requestedMimeTypes : [],
  },
  localContent : localStorageLocalContent,
  models,
}
const store = new Vuex.Store({
  state : Object.assign({},defaultState),
  mutations: {
    reset(state){
      state.status = defaultState.status;
      state.strokeGroups = defaultState.strokeGroup;
      state.recognitionOptions = defaultState.recognitionOptions;
      state.exportResults = defaultState.exportResults;
      state.interpretationOptions = defaultState.interpretationOptions;
    },    
    addLocalContent(state, png){
      const newLocalContentItem = {
        strokeGroups : state.strokeGroups,
        png,
        date : new Date(),
        recognitionOptions : state.recognitionOptions,
        exportResults : state.exportResults,
        interpretationOptions : state.interpretationOptions,
        status : state.status,
      };
      state.localContent.push(newLocalContentItem);
      myStorage.setItem('localContent', JSON.stringify(state.localContent));
    },
    restoreContext(state, context){
      if(context.recognitionOptions){
        state.recognitionOptions = context.recognitionOptions;
      }else{
        state.recognitionOptions = defaultState.recognitionOptions;
      }
      if(context.exportResults){
        state.exportResults = context.exportResults;
      }else{
        state.exportResults = defaultState.exportResults;
      }
      if(context.interpretationOptions){
        state.interpretationOptions = context.interpretationOptions;
      } else{
        state.interpretationOptions = defaultState.interpretationOptions;
      }
      state.strokeGroups = context.strokeGroups;
      if(context.status){
        state.status = context.status;
      }else{
        state.status = defaultState.status;
      }
    },
    updateStrokeGroups(state, strokeGroups){
      state.strokeGroups = strokeGroups;
    },
    updateRecognitionOptions(state, recognitionOptions){
      state.recognitionOptions = recognitionOptions;
    },
    resetExportResult(state){
      state.exportResults = {};
    },
    persistExportResult(state, exportResult){
      if(exportResult !== undefined && state.status === 'CONVERTING'){
        state.status = "CONVERTED";
      }
      Vue.set(state.exportResults, exportResult.type, exportResult.exportValue)
    },
    updateInterpretationOptions(state, interpretationOptions){
      state.interpretationOptions = interpretationOptions;
    },
    removeLocalContentItem(state, idx){
      state.localContent.splice(idx, 1);
      myStorage.setItem('localContent', JSON.stringify(state.localContent));
    },
    switchToConvertingStatus(state){
      state.status = "CONVERTING";
    },
    switchToWaitingConversion(state){
      state.status = "WAITING_CONVERSION_OPTIONS";
    },
    switchToContentModified(state){
      state.status = "CONTENT-MODIFIED";
    },
  }
});

export default store;