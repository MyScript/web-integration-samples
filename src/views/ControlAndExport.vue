<template>
  <el-container>
    <el-header>
      <el-row type="flex">
        <el-col :span="1" class="col-left">
          <a id="index-header-link" @click="$router.push({ path: 'interpret' })" class="ooo-link-back" style="cursor: pointer"></a>
        </el-col>
      </el-row>
    </el-header>
    <el-main>
      <el-tabs tab-position="top"	>
        <el-tab-pane v-for="requestedMimeType in interpretationOptions.requestedMimeTypes" :key="requestedMimeType" :label="requestedMimeType">
          <div class="controlView" v-if="exportResults[requestedMimeType]">
            <img v-if="requestedMimeType.startsWith('image/png') || requestedMimeType.startsWith('image/jpeg')"  class="interpretedContent" :src="exportResults[requestedMimeType]"/>
            <vue-json-pretty  v-else-if="requestedMimeType.startsWith('application/vnd.myscript.jiix')" :data="exportResults[requestedMimeType]" class="interpretedContent"></vue-json-pretty>
            <div v-else-if="requestedMimeType.startsWith('image/svg')"  class="interpretedContent">
              <div v-html="exportResults[requestedMimeType]"></div>
            </div>
            <div v-else-if="requestedMimeType.startsWith('application/vnd')" class="explaination">
              Power Point files could not be previewed in a web browser easily please use the download button.
            </div>
            <div v-else>
              {{exportResults[requestedMimeType]}}
            </div>
          </div>
          <div v-else>
            <spinner size="large" message="Interpreting..."/>
            <div class="explaination">Your input is actually interpreated by MyScript Cloud</div>
          </div>
          <el-button v-if="exportResults[requestedMimeType]" type="primary" icon="el-icon-download" circle @click="download" class="dl-button"></el-button>
        </el-tab-pane>
      </el-tabs>
        
    </el-main>
  </el-container>
</template>

<script>
// @ is an alias to /src
import { mapState } from 'vuex'
import Spinner from 'vue-simple-spinner'
import VueJsonPretty from 'vue-json-pretty'

export default {
  name: 'controlAndExport',
  components: {
    Spinner,
    VueJsonPretty
  },
  computed: mapState([
    // map this.count to store.state.count
    'interpretationOptions',
    'exportResults'
  ]),
  methods: {
    download(){
      this.$message({
          showClose: true,
          message: 'Not implemented yet.',
          type: 'warning'
        });
    },
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
    max-width: 80vmin;
    max-height: 80vmin;
}
.interpretedContent > div > svg {
    max-width: 80vmin;
    max-height: 80vmin;
}

.controlView {
  text-align: left;
  margin: 5px;
}
.explaination{
  font-size: 0.8em;
  color: #757B7F;
}
</style>

