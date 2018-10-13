<template>
        <div class="initialContainer">
          <h1>Explore Interactive Ink SDK batch mode</h1>
          <div  class="wrapper">
            <el-card  class="box">
              <el-button @click="createEmpty" type="primary" size="small" class="button create mainButton">+</el-button>
              <div>Grab ink direclty from the browser</div>
            </el-card>
              
            <el-card  class="box">
              <el-button @click="importStrokes" type="secondary" size="small" class="button import mainButton">Import</el-button>
              <div>Import pointer events or X/Y strokes - Good to load stroke in a flat file</div>
            </el-card>
          </div>
          
          <h3>Models</h3>
          <div  class="wrapper">
            <el-card v-for="(localInk, index) in models" :key="index"  class="box">
              <img :src="localInk.png" class="image">
                <div>
                  <time class="time">{{ localInk.date }}</time>
                  <div class="bottom clearfix">
                    <el-button @click="select(index)" type="primary" size="small" class="button">Load</el-button>
                    <el-button v-if="!useModels" @click="remove(index)" size="small" icon="el-icon-delete" class="button button-right"></el-button>
                  </div>
                </div>
              </el-card>
          </div>
          
          <h3>Previously stored inks</h3>
          <div  class="wrapper">
            <el-card v-for="(localInk, index) in localContent" :key="index"  class="box">
              <img :src="localInk.png" class="image">
                <div>
                  <time class="time">{{ localInk.date }}</time>
                  <div class="bottom clearfix">
                    <el-button @click="select(index)" type="primary" size="small" class="button">Load</el-button>
                    <el-button v-if="!useModels" @click="remove(index)" size="small" icon="el-icon-delete" class="button button-right"></el-button>
                  </div>
                </div>
              </el-card>
          </div>

        </div>
       
  </template>
  
  <script>
  import { mapState } from 'vuex';
  
  export default {
    
  name: 'browse-inks',
  data() {
      return {
        centerDialogVisible: false,
      }
    },
  computed: {
    ...mapState([
      'localContent','models'
    ])
  },
  props: {
    uselocal: Boolean,
    useModels : Boolean,
  },
    methods : {
      createEmpty(){
        this.$router.push({ path: '/write' })
      },
      importStrokes(){
        this.$router.push({ path: '/import-strokes' })
      },
      display(){
        this.centerDialogVisible =  true;
      },
      select(idx){
        this.importStrokeGroups(this.data[idx].strokeGroups);
        this.centerDialogVisible =  false;
        return true;
      },
      remove(idx){
        this.$store.commit('removeLocalContentItem',idx);
      },
      importStrokeGroups(strokeGroups){
        //With interactive mode TODO manage interactive mode
        //this.$parent.$parent.$refs.vueEditor.editor.pointerEvents(pointerEvents);
        const editor = this.$parent.$parent.$refs.vueEditor.editor;
        editor.clear();
        editor.eastereggs.importStrokeGroups(editor, strokeGroups);
        editor.forceChange();
      }
    }
}
  </script>
  
  <style scoped>

  
  .mainButton {
    min-height: 173px;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 20px;
  }
  
  .create {
    font-size: 120px;
  }
  
  .import {
    font-size: 60px;
    
  }
  
  .wrapper {
    display: grid;
    grid-template-columns: 50% 50% ;
    grid-gap: 30px;
  }

  .box {
    padding: 10px;
  }

    .time {
      font-size: 1em;
      color: #999;
    }
    .image{
      min-width: 100%;
      max-width: 100%;
    }
    
    .bottom {
    margin-top: 13px;
    line-height: 12px;
  }

  .button-right {
    float: right;
  }

  .image {
    width: 100%;
    display: block;
  }

  </style>
  <style>
    .initialContainer {
    max-width: 800px;
    margin-left: auto;
    margin-right: auto;
  }
  
  .el-dialog {
    max-width: 90vw;
  }
  .modalcontainer{
    display: flex;
    flex: 1;
    padding: 10px;
    flex-direction: column;
  }
  .strokearea {
    width: 100%;
    min-width: 100%;
    max-width: 100%;
    height: 200px;
  }
  .selector {
    padding: 20px;
  }
  </style>
  