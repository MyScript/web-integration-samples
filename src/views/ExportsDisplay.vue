<template>
  <el-container>
    <el-header>
      <el-row type="flex">
        <el-col :span="1" class="col-left">
          <a id="index-header-link" @click="$router.push({ path: 'convert' })" class="ooo-link-back" style="cursor: pointer"></a>
        </el-col>
      </el-row>
    </el-header>
    <el-main>
      <el-tabs tab-position="left">
        <el-tab-pane v-for="requestedMimeType in requestedExportResultsTypes" :key="requestedMimeType" :label="requestedMimeType">
          <div v-if="exportResults[requestedMimeType]">
            {{exportResults[requestedMimeType]}}
          </div>
          <div v-else>
            Spinner
          </div>
        </el-tab-pane>
      </el-tabs>
    </el-main>
    <el-footer>
      <el-row>
        <el-col :span="12">
          <el-button-group>
              <el-tooltip class="item" effect="dark" content="Befenit from gestures detection and all interactive iink features" placement="top">
            <el-button icon="el-icon-edit" @click="interactiveEdit">Interactive edit</el-button>
              </el-tooltip>
              <el-tooltip class="item" effect="dark" content="Non interative way of editing" placement="top">
          <el-button @click="edit">Non interactive edit <i class="el-icon-edit el-icon-right"></i></el-button>
          </el-tooltip>
          </el-button-group>
        </el-col>
        <el-col :span="12">
          <el-button type="primary" @click="download">Download<i class="el-icon-download el-icon-right"></i></el-button>
        </el-col>
      </el-row>
    </el-footer>
  </el-container>
</template>

<script>
// @ is an alias to /src
import { mapState } from 'vuex'

export default {
  name: 'exportsDisplay',
  computed: mapState([
    // map this.count to store.state.count
    'requestedExportResultsTypes',
    'exportResults'
  ]),
  components: {
  },
  methods: {
    download(){},
    edit(){},
    interactiveEdit(){},
  }
}
</script>
<style>

</style>

