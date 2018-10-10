<template>
  <div>
    <el-dialog
        title="Import strokes"
        :visible.sync="centerDialogVisible"
        width="600px"
        center
        class="strokeimporter"
        >
        
        <div class="modalcontainer">
            <div>Import is interactive features only. In batch mode a redraw of strokes into the canvas is done.</div>
            <el-select v-model="format" placeholder="Format" class="selector" @change="changePlaceHolder">
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
          <el-button type="primary" @click="importInk">Import</el-button>
        </span>
      </el-dialog>
    </div>
  </template>
  
  <script>

  
  import strokeGroupsPlaceHolder from './StrokeImporter/StrokeGroupsPlaceHolder';
  import pointerEventPlaceHolder from './StrokeImporter/PointerEventPlaceHolder';
  import strokeConvert from '@/utils/strokeConverter';
  
  
  export default {
  name: 'stroke-importer',
   data() {
      return {
        centerDialogVisible: false,
        format : '',
        strokes : '',
        strokesPlaceHolder: 'Chose a stroke format first',
         options: [
           {
          value: 'srokegroups',
          label: 'Stroke groups (REST stroke input)'
        },{
          value: 'XY',
          label: 'x,y array'
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
      display(){
        this.reset();
        this.centerDialogVisible =  true;
      },
      reset(){
        this.format = '';
        this.strokes = '';
        this.strokesPlaceHolder= 'Chose a stroke format first';
      },
      importStrokeGroups(strokeGroups){
        //With interactive mode TODO manage interactive mode
        //this.$parent.$parent.$refs.vueEditor.editor.pointerEvents(pointerEvents);
        const editor = this.$parent.$parent.$refs.vueEditor.editor;
        editor.eastereggs.importStrokeGroups(editor, strokeGroups);
        editor.forceChange();
      },
      importInk(){
        if(!this.strokes){
          this.$message({
            showClose: true,
            message: 'Please copy/paste strokes first.',
            type: 'warning'
          });
        }else if(this.format === 'XY'){
          this.importStrokeGroups(strokeConvert.convertXYToStrokeGroup(this.strokes));
          this.centerDialogVisible = false
        } else {
          try{
            const strokesObj = JSON.parse(this.strokes);
            if (this.format === 'srokegroups'){
              this.importStrokeGroups(strokesObj);
              this.centerDialogVisible = false
            }else if (this.format === 'pointerevents'){
              this.importStrokeGroups(strokeConvert.convertPointerEventsToStrokeGroup(strokesObj));
              this.centerDialogVisible = false
            } else if(this.format === 'jiix'){
              this.$message({
                showClose: true,
                message: 'Not implemented yet.',
                type: 'warning'
              });
            }
          } catch(err){
            this.$message({
              showClose: true,
              message: 'Please provide a valid JSON input.\n'+err,
              type: 'error'
            });
          }
        }
      },
      changePlaceHolder(value){
        const xyPlaceHolder = "<nb of strokes>\n<nb of point if first stroke>\n<x of first point in first stroke> <space> <y of first point in second stroke>\n ...\n\nex:\n2\n20\n128 83\n125 91\n122 99\n119 107\n118 114\n117 121\n116 125\n117 120\n119 112\n123 101\n127 90\n135 76\n139 70\n141 66\n144 76\n144 88\n143 101\n142 111\n141 118\n142 123\n5\n117 105\n122 105\n128 106\n139 107\n146 106\n"
        if(value === 'XY'){
          this.strokes = xyPlaceHolder;
        } else if (value === 'pointerevents'){
          this.strokes = JSON.stringify(pointerEventPlaceHolder, ' ', 2)
        } else if (this.format === 'srokegroups'){
          this.strokes = JSON.stringify(strokeGroupsPlaceHolder, ' ', 2)
        } else if(value === 'jiix'){
          this.strokesPlaceHolder = "JIIX import is not supported yet";
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
    padding: 10px 20px 20px 20px;
  }
  </style>
  