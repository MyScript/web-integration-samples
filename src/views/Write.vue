<template>
    <el-container class="write">
      <el-header>
        <Navbar></Navbar>
      </el-header>
      <el-main class="mainEditor"><editor :no-logo="true"></editor></el-main>
      <el-footer>
        <el-row>
          <el-col :span="16" class="col-left">
            <el-button icon="el-icon-upload2" disabled>Import pointer events</el-button>
            <el-button icon="el-icon-picture-outline" disabled>Choose model</el-button>
          </el-col>
          <el-col :span="8" class="col-rigth">
            <el-button type="primary" @click="convert">Convert <i class="el-icon-arrow-right el-icon-right"></i></el-button>
          </el-col>
        </el-row>

      </el-footer>
    </el-container>
</template>

<script>
import Navbar from '@/components/left/Navbar.vue';
import Editor from '@/components/Editor';

export default {
  name: 'write',
  components: {Navbar, Editor},
  methods:{
    convert(){
      this.$router.push({ path: 'convert' })
    }
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
