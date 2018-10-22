<template>
  <el-container>
    <el-main>
      <el-row v-if="status === 'CONTENT-MODIFIED'">
        <el-col :span="24">
          <div class="takecare">The content have been modified since. Please request a new interpretation.</div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-select v-model="requestedMimeType">
            <el-option v-for="requestedMimeType in interpretationOptions.requestedMimeTypes" :key="requestedMimeType" :label="requestedMimeType" :value="requestedMimeType">
            </el-option>
          </el-select>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <div v-if="status === 'CONVERTING'">
            <spinner size="large" message="Interpreting..." />
            <div class="explaination">Your input is actually interpreated by MyScript Cloud</div>
          </div>
          <div class="controlView" v-if="exportResults[requestedMimeType]">
            <img v-if="requestedMimeType.startsWith('image/png') || requestedMimeType.startsWith('image/jpeg')" class="interpretedContent" :src="exportResults[requestedMimeType]" />
            <vue-json-pretty v-else-if="requestedMimeType.startsWith('application/vnd.myscript.jiix')" :data="exportResults[requestedMimeType]" class="interpretedContent"></vue-json-pretty>
            <div v-else-if="requestedMimeType.startsWith('image/svg')" class="interpretedContent">
              <div v-html="exportResults[requestedMimeType]"></div>
            </div>
            <div v-else-if="requestedMimeType.startsWith('application/vnd')" class="explaination">
              Power Point files could not be previewed in a web browser easily please use the download button.
            </div>
            <div v-else>
              {{exportResults[requestedMimeType]}}
            </div>
          </div>
          <el-button v-if="exportResults[requestedMimeType]" type="primary" icon="el-icon-download" circle @click="download" class="dl-button"></el-button>
        </el-col>
      </el-row>
    </el-main>
  </el-container>
</template>

<script>
// @ is an alias to /src
import { mapState } from 'vuex'
import Spinner from 'vue-simple-spinner'
import VueJsonPretty from 'vue-json-pretty'
import EventBus from '@/event-bus';

export default {
  name: 'control-and-export',
  components: {
    Spinner,
    VueJsonPretty
  },
  data() {
    return {
      requestedMimeType: '',
    }
  },
  computed: mapState([
    // map this.count to store.state.count
    'interpretationOptions',
    'exportResults',
    'status'
  ]),
  methods: {
    download() {
      this.$message({
        showClose: true,
        message: 'Not implemented yet.',
        type: 'warning'
      });
    },
    reconvert() {
      this.$message({
        showClose: true,
        message: 'Not implemented yet.',
        type: 'warning'
      });
    }
  },
  mounted() {
    this.requestedMimeType = this.interpretationOptions.requestedMimeTypes[0];
    EventBus.$on('requestedMimeTypesChanged', () => {
      this.requestedMimeType = this.interpretationOptions.requestedMimeTypes[0];
    })

  }

}
</script>
<style>
.el-tabs {
  position: relative;
}

.el-tab-pane {
  min-height: 50px;
}

.dl-button {
  position: absolute;
  bottom: 5px;
  right: 5px;
}

.interpretedContent {
  max-width: 100%;
  max-height: 100%;
}
.interpretedContent > div > svg {
  max-width: 100%;
  max-height: 100%;
}

.controlView {
  text-align: left;
  margin: 5px;
  overflow: auto;
}
.explaination {
  font-size: 0.8em;
  color: #757b7f;
}
</style>
<style scoped>
.el-row {
  padding-bottom: 20px;
}

.takecare {
  border: solid 1px lightgrey;
  border-radius: 5px;
  padding: 10px;
  background-color: #e6a23c;
}
</style>
