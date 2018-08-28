<template>
  <div class="write">
    <el-container>
      <el-header>
        <Navbar></Navbar>
      </el-header>
      <el-main class="editor">Editor</el-main>
      <el-footer>
        <el-row>
          <el-col :span="12">
            <el-button icon="el-icon-upload2" disabled>Import pointer events</el-button>
            <el-button icon="el-icon-picture-outline" disabled>Choose model</el-button>
          </el-col>
          <el-col :span="12">
            <el-button type="primary" @click="convert">Convert <i class="el-icon-arrow-right el-icon-right"></i></el-button>
          </el-col>
        </el-row>

      </el-footer>
    </el-container>

  </div>
</template>

<script>
import Navbar from '@/components/left/Navbar.vue';

export default {
  name: 'write',
  components: {Navbar},
  methods:{
    convert(){
      this.$router.push({ path: 'convert' })
    }
  }
}

</script>
<style scoped>
.editor{
  min-height: 600px;
}
</style>
