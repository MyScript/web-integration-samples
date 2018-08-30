import Vuex from 'vuex'
import Vue from 'vue';

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    strokeGroups : [],
    recognitionOptions : {},
    requestedExportResultsTypes : [],
    exportResults : {},
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
    persistExportResult(state, exportResult){
      Vue.set(state.exportResults, exportResult.type, exportResult.exportValue)
    }
  }
});

export default store;