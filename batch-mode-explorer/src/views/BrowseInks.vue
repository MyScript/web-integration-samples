<template>
  <div class="initialContainer">
    <h1>Interactive Ink SDK - Explore batch mode</h1>
    <div class="wrapper">
      <el-button @click="createEmpty" type="primary" class="button box">
        <div class="mainSign">+</div>
        <div>Grab ink direclty from the browser</div>
      </el-button>
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
@import '../static/inkList.css';


.initialContainer {
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
}

</style>