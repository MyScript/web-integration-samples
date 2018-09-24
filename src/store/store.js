import Vuex from 'vuex'
import Vue from 'vue';

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
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
    localContent : [],
    preloadedContent : [],
    currentContent : {}
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
    },
    updateCurrentContent(state, currentContent){
      state.currentContent = currentContent;
    }
  }
});

export default store;