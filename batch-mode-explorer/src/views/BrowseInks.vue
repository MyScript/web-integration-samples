<template>
  <div class="initialContainer">
    <h1>Interactive Ink SDK - Explore batch mode</h1>
    <div class="wrapper">
      <el-card class="box">
        <el-button @click="createEmpty" type="primary" size="small" class="button create mainButton">+</el-button>
        <div>Grab ink direclty from the browser</div>
      </el-card>
    </div>

    <h3>Start with strokes from models</h3>
    <ink-list :useModels="true"></ink-list>

    <h3>Start with strokes and interpretation results strored from previous sessions</h3>
    <ink-list :useLocals="true"></ink-list>

  </div>

</template>
  
  <script>
import InkList from '@/components/InkList.vue';

export default {

  name: 'browse-inks',
  components: { InkList },
  methods: {
    createEmpty() {
      this.$store.commit('reset');
      this.$router.push({ path: '/write' })
    },
    importStrokes() {
      this.$router.push({ path: '/import-strokes' })
    },
  }
}
</script>
  
  <style scoped>
.mainButton {
  min-height: 173px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
}

.create {
  font-size: 120px;
}

.import {
  font-size: 60px;
}

.wrapper {
  display: grid;
  grid-template-columns: 50% 50%;
  grid-gap: 30px;
}

.box {
  padding: 10px;
}

.time {
  font-size: 1em;
  color: #999;
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
.initialContainer {
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
}

.el-dialog {
  max-width: 90vw;
}
.modalcontainer {
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
  