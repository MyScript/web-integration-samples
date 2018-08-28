<template>
  <el-container>
    <el-main>
      <el-tabs tab-position="top">
        <el-tab-pane label="Write">JJIX</el-tab-pane>
        <el-tab-pane label="Type">Type</el-tab-pane>
        <el-tab-pane label="Convert">Convert</el-tab-pane>
      </el-tabs>
    </el-main>
    <el-footer>
      <el-row>
        <el-col :span="12">
          <el-button-group>
              <el-tooltip class="item" effect="dark" content="Befenit from gestures detection and all interactive iink features" placement="top">
            <el-button icon="el-icon-edit" @click="edit">Interactive edit</el-button>
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

export default {
  name: 'exportsDisplay',
  components: {
  }
}
</script>
<style>
.el-tabs__item.is-active {
  background-color: #d8eefe;
}
</style>

