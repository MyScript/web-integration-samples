import Vuex from 'vuex'
import Vue from 'vue';
import models from './models'

Vue.use(Vuex);
const myStorage = window.localStorage;
const localStorageLocalContent = JSON.parse(myStorage.getItem('localContent'));

const store = new Vuex.Store({
  state: {
    status : "WAITING_CONVERSION_OPTIONS",//"CONVERTING"
    strokeGroups : [],
    recognitionOptions : {},
    requestedExportResultsTypes : [],
    exportResults : {},
    interpretationOptions : {
      partTypeOptionKey : '',
        lang: 'en_US',
        handwritingMode : false,
        requestedMimeTypes : [],
    },
    localContent : localStorageLocalContent ? localStorageLocalContent : [],
    models,
    preloadedContent : [],
  },
  mutations: {
    updateStrokeGroups(state, strokeGroups){
      state.strokeGroups = strokeGroups;
    },
    updateRecognitionOptions(state, recognitionOptions){
      state.recognitionOptions = recognitionOptions;
    },
    resetExports(state){
      state.exportResults = {};
    },
    updateRequestedExportResultsTypes(state, requestedExportResultsTypes){
      state.requestedExportResultsTypes = requestedExportResultsTypes;
    },
    resetExportResult(state){
      state.exportResults = {};
    },
    persistExportResult(state, exportResult){
      Vue.set(state.exportResults, exportResult.type, exportResult.exportValue)
    },
    updateInterpretationOptions(state, interpretationOptions){
      state.interpretationOptions = interpretationOptions;
    },
    addLocalContent(state, newLocalContent){
      state.localContent.push(newLocalContent);
      myStorage.setItem('localContent', JSON.stringify(newLocalContent));
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
    }
  }
});

export default store;