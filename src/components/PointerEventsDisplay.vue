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
        
        <div class="modalcontainer">
            <el-select v-model="format" placeholder="Format" class="selector" @change="change">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          <textarea class="strokearea" :disabled="format === ''" v-model="strokes" :placeholder="strokesPlaceHolder"></textarea>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary"  :disabled="!format" @click="copy">Copy</el-button>
        </span>
      </el-dialog>
    </div>
  </template>
  
  <script>
  function convertToXY(rawStrokes){
    let xycontent = rawStrokes.length + "\n";
    rawStrokes.forEach(stroke => {
      xycontent += stroke.x.length + "\n";
      stroke.x.forEach((x, pos) => xycontent += x + " "+ stroke.y[pos] + "\n")
    })
    return xycontent;
  }
  
  function convertToPointerevents(rawStrokes){
    return ""+JSON.stringify(rawStrokes)
  }
  
  export default {
  name: 'pointer-events-display',
   data() {
      return {
        centerDialogVisible: false,
        format : '',
        strokes : '',
        strokesPlaceHolder: 'Chose a stroke format first',
        options: [{
          value: 'XY',
          label: 'Flat x&y '
        }, {
          value: 'pointerevents',
          label: 'PointerEvents'
        }, {
          value: 'jiix',
          label: 'JIIX'
        }]
      }
    },
    methods : {
      reset(){
        this.format = '';
        this.strokes = '';
      },
      display(){
        this.reset();
        this.centerDialogVisible =  true;
      },
      async copy() {
          await this.$copyText(this.strokes);
      },
      change(value){
        const rawStrokes = this.$parent.$parent.$refs.vueEditor.editor.model.rawStrokes;
        if(value === 'XY'){
          this.strokes = convertToXY(rawStrokes);
        }else if (value === 'pointerevents'){
          this.strokes = convertToPointerevents(rawStrokes);
        } else if(value === 'jiix'){
          this.strokes = "Perfom a recognition to access the JIXX transformation.";
        }
      }
    }
}
  </script>
  
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
  