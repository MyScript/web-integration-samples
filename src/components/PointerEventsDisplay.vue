<template>
  <div>
        <div class="strokedisplaymodalcontainer">
            <el-select v-model="format" placeholder="Format" class="selector" @change="change">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          <textarea class="strokedisplayarea" :disabled="format === ''" v-model="strokes" :placeholder="strokesPlaceHolder"></textarea>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary"  :disabled="!format" @click="copy">Copy</el-button>
        </span>
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
    const pointerEvents = {
      events : rawStrokes.map(rawStroke => {
        return {
          "pointerType": "PEN",
          "pointerId": rawStroke.pointerId,
          "x": rawStroke.x,
          "y": rawStroke.y,
          "t": rawStroke.t,
          "p": rawStroke.p
        };
      })
    }
    return ""+JSON.stringify(pointerEvents, ' ', 2)
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
          this.strokes = "Perfom a recognition to access the JIXX exports.";
        }
      }
    }
}
  </script>
  
  <style>
 
  .strokedisplaymodalcontainer{
    display: flex;
    flex: 1;
    padding: 10px;
    flex-direction: column;
    max-height: 95%;
    height: 95%;
  }
  .strokedisplayarea {
    width: 100%;
    min-width: 100%;
    max-width: 100%;
    max-height: 80%;
    height: 70%;
    
  }
  .selector {
    padding: 20px;
  }
  </style>
  