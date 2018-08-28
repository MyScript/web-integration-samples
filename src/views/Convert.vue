<template>
  <el-container>
    <el-header>
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
      <el-row >
        <el-col :span="24">
          <el-select v-if="partType !== '' && partType.langSelector === true" v-model="lang" filterable placeholder="Select language">
            <el-option v-for="(key, value) in langList.result" :key="key" :label="key" :value="value">
            </el-option>
          </el-select>
        </el-col>
      </el-row>
      <el-row >
        <el-col :span="24">
          <el-switch v-if="partType !== '' && partType.convertSelector === true" v-model="handwritingMode" active-text="Handwriting mode" inactive-text="Convert mode">
          </el-switch>
        </el-col>
      </el-row>
      <el-row >
        <el-col :span="24">
          <el-tooltip v-for="mimeType in partType.supportedMimeTypes" :key="mimeType.label" :content="formatLabel(mimeType)" placement="top" effect="light">
            <el-checkbox v-model="requestedMimeTypes" :label="mimeType.label" border :disabled="!mimeType.available"></el-checkbox>
          </el-tooltip>
        </el-col>
      </el-row>
      
    </el-main>
    <el-footer>
      <el-row justify="center">
        <el-col :span="12">
          <el-button icon="el-icon-back" circle @click="$router.push({ path: '/' })"></el-button>
        </el-col>
        <el-col :span="12">
          <el-button v-if="partType !== 'MATH' && lang !== ''" type="primary" @click="convert">Convert</el-button>
        </el-col>
      </el-row>

    </el-footer>
  </el-container>
</template>
<script>
import langList from '@/static/languages.js';

const mimeTypesLabels = {
  jiix : "The JSON iink format.\n By far the most complete format.",
  text : "The plain text format",
  latex : "latex",
  mathml : "mathml",
  word : "word"
}
const partTypeOptions = {
  text : {
    label : "Text",
    interactive : true,
    langSelector : true,
    convertSelector : true,
    supportedMimeTypes: [
      {label : "jiix", available : true},
      {label : "text", available : true},
      {label : "word", available : false},
    ]
  },
  math : {
    label : "Math",
    interactive : true,
    langSelector : false,
    convertSelector : true,
    supportedMimeTypes: [
      {label : "jiix", available : true},
      {label : "latex", available : true},
      {label : "mathml", available : false},
    ]
  },
  "raw-content" : {
    label : "Raw-content",
    interactive : false,
    langSelector : true,
    convertSelector : false,
    supportedMimeTypes: [
      {label : "jiix", available : true},
    ]
}};

export default {
  name: 'parttypechooser',
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
      formatLabel(mimeType){
        return mimeTypesLabels[mimeType.label];
      },
      convert(){
        this.router.push({ path: 'exports' })
        this.$emit("converting", {partType : this.partType, lang : this.lang})
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
.el-row {
  padding-bottom: 20px;
}
.el-main{
  min-height: 300px;
}
</style>