<template>
  <div>
        <div class="strokedisplaymodalcontainer">
            <el-select v-model="format" placeholder="Format" class="selector">
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
        format : 'pointerevents',
//        strokes : '',
        strokesPlaceHolder: 'Chose a stroke format first',
        options: [
          {
            value: 'pointerevents',
            label: 'PointerEvents'
          },
          {
          value: 'XY',
          label: 'Flat x&y '
        },  {
          value: 'jiix',
          label: 'JIIX'
        }]
      }
    },
    computed : {
      strokes(){
        const strokeGroups = this.$store.state.strokeGroups;
        const rawStrokes = [].concat(...strokeGroups.map(strokeGroup => (strokeGroup.strokes)));
        
        let ret = "";
        if(this.format === 'XY'){
          ret = convertToXY(rawStrokes);
        }else if (this.format === 'pointerevents'){
          ret = convertToPointerevents(rawStrokes);
        } else if(this.format === 'jiix'){
          ret = "Perfom a recognition to access the JIXX exports.";
        }
        return ret;
      }
    },
    methods : {
      reset(){
        this.format = 'pointerevents';
        this.strokes = '';
      },
      async copy() {
          await this.$copyText(this.strokes);
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
    height: 70vh;
    
  }
  .selector {
    padding: 20px;
  }
  </style>
  