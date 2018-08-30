<template>
    <el-container class="write">
      <el-header>
        <Navbar></Navbar>
      </el-header>
      <el-main class="mainEditor"><vue-editor :no-logo="true" ref="vueEditor"></vue-editor></el-main>
      <el-footer>
        <el-row>
          <el-col :span="16" class="col-left">
            <el-button icon="el-icon-upload2" disabled>Import pointer events</el-button>
            <el-button icon="el-icon-picture-outline" disabled>Choose model</el-button>
          </el-col>
          <el-col :span="8" class="col-rigth">
            <el-button type="primary" @click="convert" :disabled="!firstStroke">Convert <i class="el-icon-arrow-right el-icon-right"></i></el-button>
          </el-col>
        </el-row>

      </el-footer>
    </el-container>
</template>

<script>
import Navbar from '@/components/left/Navbar.vue';
import VueEditor from '@/components/VueEditor';
import store from '@/store/index';
import EventBus from '@/event-bus';

export default {
  name: 'write',
  components: {Navbar, VueEditor},
  data(){
    return {
      firstStroke : false,
    }
  },
  methods:{
    convert(){
      store.commit('updateStrokeGroups', this.$refs.vueEditor.getStrokeGroups());
      this.$router.push({ path: 'convert' })
    }
  },
  mounted() {
    EventBus.$on('changed', (evt) => {
      this.firstStroke = evt.canClear;
      store.commit('resetExports');
    });
  }
}



</script>
<style scoped>
.el-main {
    flex-direction: column;
    position: relative;
    width: 100%;
    height: 100%;
    padding: 10px;
}
</style>
