<template>
  <el-container>
    <el-main>
      <el-row>
        <el-col :span="24">
          <el-select v-model="partTypeOptionKey" placeholder="Select part type" @change="partTypeChanged">
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
        <el-col :span="24" class="mimeTypes">
          <el-tooltip v-for="mimeKey in partType.supportedMimeTypes" :key="mimeKey.key" :content="formatLabel(mimeKey)" placement="top" effect="light" class="el-checkbox">
            <el-checkbox v-model="requestedMimeTypes" :label="mimeFromMimeKey(mimeKey)" border :disabled="!mimeKey.available">{{mimeKey.key}}</el-checkbox>
          </el-tooltip>
        </el-col>
      </el-row>
      <el-row v-if="requestedMimeTypes.includes('application/vnd.myscript.jiix') || requestedMimeTypes.includes('images/png') || requestedMimeTypes.includes('images/jpeg')">
        <el-col :span="24">
          <el-switch :disabled="partType === '' || partType.convertSelector !== true" v-model="handwritingMode" active-text="Handwriting mode" inactive-text="Convert mode">
          </el-switch>
        </el-col>
      </el-row>
      <template v-if="requestedMimeTypes.includes('application/vnd.myscript.jiix')">
        <template v-if="partType.richJiiXOptions">
          <el-row>
            <el-col :span="24">
              <el-switch  v-model="textRecoOn" active-text="Activate text recognition" >
              </el-switch>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-switch  v-model="shapeRecoOn" active-text="Activate shape recognition" >
              </el-switch>
            </el-col>
          </el-row>
        </template>
        <el-row>
          <el-col :span="24">
            <el-switch  v-model="jiixWithStrokes" active-text="With strokes" >
            </el-switch>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-switch  v-model="jiixWithWords" active-text="With words">
            </el-switch>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-switch  v-model="jiixWithChars" active-text="With chars" >
            </el-switch>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-switch  v-model="jiixWithBoudingBox" active-text="With bouding boxes" >
            </el-switch>
          </el-col>
        </el-row>
      </template>
      <template v-if="requestedMimeTypes.includes('image/jpeg') || requestedMimeTypes.includes('image/png')">
      <el-row>
        <el-col :span="24">
          <el-switch  v-model="overideDefaultThemeStyle" active-text="Overide default theme" inactive-text="">
          </el-switch>
        </el-col>
      </el-row>
      <el-row v-if="overideDefaultThemeStyle">
        <el-col :span="24">
          <el-input type="textarea" v-model="styleshet" size="medium"></el-input>
        </el-col>
      </el-row>
       </template>
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
//TODO Activate configuration options depending of the type. (Digital Edit only if Jiix or Image are supported, style only with images ...)
import langList from '@/static/languages.js';
import store from '@/store/store';
import * as recognizer from '@/utils/recognizer';
import { mapState } from 'vuex'
import EventBus from '@/event-bus';

const defaultTheme = {
  ink: {
    color: '#000000',
    '-myscript-pen-width': 1,
    '-myscript-pen-fill-style': 'none',
    '-myscript-pen-fill-color': '#FFFFFF00'
  },
  '.math': {
    'font-family': 'STIXGeneral'
  },
  '.math-solved': {
    'font-family': 'STIXGeneral',
    color: '#A8A8A8FF'
  },
  '.text': {
    'font-family': 'Open Sans',
    'font-size': 10
  }
};

const mimeTypesLabels = {
  jiix : {label : "The JSON iink format.\n By far the most complete format.", mime : "application/vnd.myscript.jiix"},
  text : {label : "The plain text format", mime : "text/plain"},
  latex : {label : "latex", mime : "application/x-latex"},
  mathml : {label : "mathml", mime : "application/mathml+xml"},
  word : {label : "word", mime : ""},
  jpeg : {label : "jpeg", mime : "image/jpeg"},
  png : {label : "png", mime : "image/png"},
  pptx : {label : "pptx", mime : "application/vnd.openxmlformats-officedocument.presentationml.presentation"},
  svg : {label : "svg", mime : "image/svg+xml"},
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
    richJiiXOptions : true,
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

//TODO Manage style
//TODO Display in different colors the interpretation options
export default {
  name: 'interpretation-options',
  /*beforeCreate(){
    this.interpretationOptions = this.$store.state.interpretationOptions;
    if(this.$store.state.strokeGroups &&  this.$store.state.strokeGroups.length == 0){
      this.$router.push({ path: '/' })
    }
    
  },*/
  data() {
      return {
        partTypeOptions,
        mimeTypesLabels,
        langList,
        partTypeOptionKey : '',
        lang: 'en_US',
        handwritingMode : false,
        requestedMimeTypes : [],
        textRecoOn : false,
        shapeRecoOn : false,
        jiixWithStrokes : false,
        jiixWithWords : false,
        jiixWithChars : false,
        jiixWithBoudingBox : false,
        overideDefaultThemeStyle : false,
        styleshet : JSON.stringify(defaultTheme, ' ', 2),
      }
    },
    created(){
      this.partTypeOptionKey = this.interpretationOptions.partTypeOptionKey;
        this.lang = this.interpretationOptions.lang;
        this.handwritingMode = this.interpretationOptions.handwritingMode;
        this.requestedMimeTypes = this.interpretationOptions.requestedMimeTypes;
    },
    computed : {
      partType(){
        if(this.partTypeOptionKey === ''){
          return "";
        }else{
          return this.partTypeOptions[this.partTypeOptionKey];
        }
      },
      ...mapState([
        'status','interpretationOptions'
      ])
    },
    methods : {
      partTypeChanged(partType){
        this.requestedMimeTypes = [];
        this.handwritingMode = false;
        if(partType === 'MATH'){
          this.lang = '';
        }else if (this.lang === ''){
          this.lang = 'en_US';
        }
        return true;
      },
      formatLabel(mimeKey){
        return mimeTypesLabels[mimeKey.key].label;
      },
      mimeFromMimeKey(mimeType){
        return mimeTypesLabels[mimeType.key].mime;
      },
      convert(){
        //FIXME Check at the end if this usage of $parent.$parent could not be avoided elegantly
        //this.$parent.$parent.$parent.$refs.vueEditor.getStrokeGroups()
        //const strokeGroups = this.$store.state.strokeGroups;
        //store.commit('updateStrokeGroups', strokeGroups);
        
        const newInterpretationOptions = {
          partTypeOptionKey : this.partTypeOptionKey,
          lang: this.lang,
          handwritingMode : this.handwritingMode,
          requestedMimeTypes : this.requestedMimeTypes,
          textRecoOn : this.textRecoOn,
          shapeRecoOn : this.shapeRecoOn,
          jiixWithStrokes : this.jiixWithStrokes,
          jiixWithWords : this.jiixWithWords,
          jiixWithChars : this.jiixWithChars,
          jiixWithBoudingBox : this.jiixWithBoudingBox,
          
        };
        if(this.overideDefaultThemeStyle){
          this.interpretationOptions.styleshet = JSON.parse(this.styleshet);
        }
        
        store.commit('resetExportResult');
        store.commit('updateInterpretationOptions', newInterpretationOptions);
        // eslint-disable-next-line
        recognizer.launchExportAndUpdateStore(this.$store.state.strokeGroups, this.partTypeOptionKey, this.requestedMimeTypes, newInterpretationOptions, this.$store);
        this.$store.commit('switchToConvertingStatus');
        
        EventBus.$emit('viewTabModificationRequested', 'interpretation');
        EventBus.$emit('requestedMimeTypesChanged',this.requestedMimeTypes);
      }
    }
}

</script>
<style scoped>
.el-row {
  padding-bottom: 20px;
}
.el-checkbox {
  margin-left: 10px;
}
.mimeTypes {
  display: grid;
    grid-template-columns: 30% 30% 30%;
    grid-gap: 5px;
}

</style>
<style>
.el-textarea__inner{
  height: 200px;
}
</style>
