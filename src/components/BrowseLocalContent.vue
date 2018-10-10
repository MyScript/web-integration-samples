<template>
  <div>
    <el-dialog
        title="Strokes display"
        :visible.sync="centerDialogVisible"
        width="600px"
        center
        class="strokeimporter"
        v-on:keyup.esc="centerDialogVisible =  false"
        >
        <div class="wrapper">
          <el-card v-for="(localInk, index) in localContent" :key="index"  class="box">
             <img :src="localInk.png" class="image">
              <div>
                <time class="time">{{ localInk.date }}</time>
                <div class="bottom clearfix">
                  <el-button @click="select(index)" type="primary" size="small" class="button">Load</el-button>
                  <el-button @click="remove(index)" size="small" icon="el-icon-delete" class="button button-right"></el-button>
                </div>
              </div>
            </el-card>

        </div>
       
      </el-dialog>
    </div>
  </template>
  
  <script>
  import { mapState } from 'vuex';
  
  export default {
    
  name: 'browse-local-content',
   data() {
      return {
        centerDialogVisible: false,
      }
    },
  computed: mapState([
    'localContent',
  ]),
    
    methods : {
      display(){
        this.centerDialogVisible =  true;
      },
      select(idx){
        this.importStrokeGroups(this.$store.state.localContent[idx].strokeGroups);
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
  .wrapper {
    display: grid;
    grid-template-columns: 50% 50%;
    grid-gap: 10px;
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
  