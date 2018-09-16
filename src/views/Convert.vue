<template>
  <el-container>
    <el-header>
      <el-row type="flex">
        <el-col :span="1" class="col-left">
          <a id="index-header-link" @click="$router.push({ path: '/' })" class="ooo-link-back" style="cursor: pointer"></a>
        </el-col>
      </el-row>
    </el-header>
    <el-main>
      <el-row>
        <el-col :span="24">
          <el-select v-model="partTypeOptionKey" placeholder="Select part type">
            <el-option v-for="(value, key) in partTypeOptions" :key="key" :label="value.label" :value="key">
            </el-option>
          </el-select>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-select :disabled="!(partType !== '' && partType.langSelector === true)" v-model="lang" filterable placeholder="Select language">
            <el-option v-for="(key, value) in langList.result" :key="key" :label="key" :value="value">
            </el-option>
          </el-select>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-switch :disabled="partType === '' || partType.convertSelector !== true" v-model="handwritingMode" active-text="Handwriting mode" inactive-text="Convert mode">
          </el-switch>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-tooltip v-for="mimeKey in partType.supportedMimeTypes" :key="mimeKey.key" :content="formatLabel(mimeKey)" placement="top" effect="light">
            <el-checkbox v-model="requestedMimeTypes" :label="mimeFromMimeKey(mimeKey)" border :disabled="!mimeKey.available">{{mimeKey.key}}</el-checkbox>
          </el-tooltip>
        </el-col>
      </el-row>
       <el-row >
        <el-col :span="24" >
          <el-button :disabled="requestedMimeTypes.length == 0" type="primary" @click="convert">Convert</el-button>
        </el-col>
      </el-row>

    </el-main>
    <el-footer>
     

    </el-footer>
  </el-container>
</template>
<script>
import langList from '@/static/languages.js';
import store from '@/store/index';
import * as recognizer from '@/utils/recognizer';

const mimeTypesLabels = {
  jiix : {label : "The JSON iink format.\n By far the most complete format.", mime : "application/vnd.myscript.jiix"},
  text : {label : "The plain text format", mime : "text/plain"},
  latex : {label : "latex", mime : "application/x-latex"},
  mathml : {label : "mathml", mime : "application/mathml+xml"},
  word : {label : "word", mime : ""},
  jpeg : {label : "jpeg", mime : "image/jpeg"},
  png : {label : "png", mime : "image/png"},
  pptx : {label : "pptx", mime : "application/vnd.openxmlformats-officedocument.presentationml.presentation"},
  svg : {label : "svg", mime : "image/png"},
  graphml : {label : "GraphML", mime : "application/graphml+xml"},
}
const partTypeOptions = {
  TEXT : {
    label : "Text",
    interactive : true,
    langSelector : true,
    convertSelector : true,
    supportedMimeTypes: [
      {key : "jiix", available : true},
      {key : "text", available : true},
      {key : "word", available : false},
      {key : "jpeg", available : true},
      {key : "png", available : true},
    ]
  },
  MATH : {
    label : "Math",
    interactive : true,
    langSelector : false,
    convertSelector : true,
    supportedMimeTypes: [
      {key : "jiix", available : true},
      {key : "latex", available : true},
      {key : "mathml", available : false},
      {key : "jpeg", available : true},
      {key : "png", available : true},
    ]
  },
  "Raw Content" : {
    label : "Raw-content",
    interactive : false,
    langSelector : true,
    convertSelector : false,
    supportedMimeTypes: [
      {key : "jiix", available : true},
      {key : "jpeg", available : true},
      {key : "png", available : true},
    ]
  },
  DIAGRAM : {
    label : "Diagram",
    interactive : false,
    langSelector : true,
    convertSelector : true,
    supportedMimeTypes: [
      {key : "jiix", available : true},
      {key : "svg", available : true},
      {key : "graphml", available : true},
      {key : "pptx", available : true},
      {key : "jpeg", available : true},
      {key : "png", available : true},
      
    ]
  },
  };

export default {
  name: 'parttypechooser',
  beforeCreate(){
    if(this.$store.state.strokeGroups &&  this.$store.state.strokeGroups.length == 0){
      this.$router.push({ path: '/' })
    }
  },
  data() {
      return {
        partTypeOptionKey : '',
        partTypeOptions,
        mimeTypesLabels,
        langList,
        lang: '',
        handwritingMode : false,
        requestedMimeTypes : [],
      }
    },
    computed : {
      partType(){
        if(this.partTypeOptionKey === ''){
          return "";
        }else{
          return this.partTypeOptions[this.partTypeOptionKey];
        }
      }
    },
    methods : {
      resetPartType(){
        this.requestedMimeTypes = [];
        this.handwritingMode = false;
        this.lang = '';
        return true;
      },
      formatLabel(mimeKey){
        return mimeTypesLabels[mimeKey.key].label;
      },
      mimeFromMimeKey(mimeType){
        return mimeTypesLabels[mimeType.key].mime;
      },
      convert(){
        store.commit('updateRequestedExportResultsTypes', this.requestedMimeTypes);
        // eslint-disable-next-line
        recognizer.launchExport(this.$store.state.strokeGroups, this.partTypeOptionKey, this.requestedMimeTypes, this.$store);
        this.$router.push({ path: 'export' })
      }
    }
}

</script>
<style>
.parttypechooser {
  display: flex;
  flex-direction: column;
  max-width: 200px;
  margin: auto;
}
</style>
<style scoped>
.el-row {
  padding-bottom: 20px;
}

.el-main {
  max-height: 300px;
}
</style>