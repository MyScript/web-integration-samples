<template>
  <div>
    <div class="strokedisplaymodalcontainer">
      <el-select v-model="format" placeholder="Format" class="selector">
        <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
        </el-option>
      </el-select>
      <el-switch v-model="editionMode" active-text="Edit" inactive-text="View" class="editionSwitch">
      </el-switch>
      <textarea class="strokedisplayarea" :disabled="!this.editionMode" v-model="strokes" :placeholder="strokesPlaceHolder"></textarea>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button type="primary" :disabled="!this.editionMode" @click="loadInk">Load ink</el-button>
      <el-button type="secondary" :disabled="!format" @click="copy">Copy</el-button>
    </span>
  </div>
</template>
  
  <script>
import EventBus from '@/event-bus';
import strokeConvert from '@/utils/strokeConverter';


export default {
  name: 'pointer-events-display',
  data() {
    return {
      format: 'pointerevents',
      editionMode: false,
      importedStrokes: '',
      strokesPlaceHolder: 'Chose a stroke format first',
      options: [
        {
          value: 'pointerevents',
          label: 'PointerEvents'
        },
        {
          value: 'XY',
          label: 'Flat x&y '
        }, {
          value: 'jiix',
          label: 'JIIX'
        }]
    }
  },
  computed: {
    strokes: {
      // getter
      get: function () {
        if (this.editionMode && this.importedStrokes) {
          return this.importedStrokes;
        } else {
          const strokeGroups = this.$store.state.strokeGroups;
          const rawStrokes = [].concat(...strokeGroups.map(strokeGroup => (strokeGroup.strokes)));

          let ret = "";
          if (this.format === 'XY') {
            ret = strokeConvert.convertRawStrokesToXY(rawStrokes);
          } else if (this.format === 'pointerevents') {
            ret = strokeConvert.convertRawStrokesToPointerevents(rawStrokes);
          } else if (this.format === 'jiix') {
            ret = "Perfom a recognition to access the JIXX exports.";
          }
          return ret;
        }
      },
      // setter
      set: function (newValue) {
        this.importedStrokes = newValue;
      }
    }
  },
  methods: {
    async copy() {
      await this.$copyText(this.strokes);
    },
    importStrokeGroups(strokeGroups) {
      const context = {
        strokeGroups
      }
      EventBus.$emit('requestClear');
      this.$store.commit('restoreContext', context);
      EventBus.$emit('restoreContext');
    },
    loadInk() {
      if (!this.strokes) {
        this.$message({
          showClose: true,
          message: 'Please copy/paste strokes first.',
          type: 'warning'
        });
      } else if (this.format === 'XY') {
        this.importStrokeGroups(strokeConvert.convertXYToStrokeGroup(this.strokes));
        this.centerDialogVisible = false
      } else {
        try {
          const strokesObj = JSON.parse(this.strokes);
          if (this.format === 'srokegroups') {
            this.importStrokeGroups(strokesObj);
            this.centerDialogVisible = false
          } else if (this.format === 'pointerevents') {
            this.importStrokeGroups(strokeConvert.convertPointerEventsToStrokeGroup(strokesObj));
            this.centerDialogVisible = false
          } else if (this.format === 'jiix') {
            this.$message({
              showClose: true,
              message: 'Not implemented yet.',
              type: 'warning'
            });
          }
        } catch (err) {
          this.$message({
            showClose: true,
            message: 'Please provide a valid JSON input.\n' + err,
            type: 'error'
          });
        }
      }
    },
  }
}
</script>
  
  <style scoped>
.strokedisplaymodalcontainer {
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
  max-height: 70%;
  height: 60vh;
}
.selector {
  padding: 20px;
}

.editionSwitch {
  align-self: center;
  margin-bottom: 20px;
}
</style>
  