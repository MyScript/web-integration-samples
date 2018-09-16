<template>
  <el-container class="fullscreen">
  <el-header>
    <div class="left bg-purple"></div>
   
  </el-header>
  <el-main>
    <div class="left bg-purple"></div>

  </el-main>
  </el-container>

</template>

<script>
export default {
  name: 'full-screen-menu',
  props: {
    msg: String
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.left {
  height: 100%;
  width: 30%;
}
.right {
  height: 100%;
  width: 70%;
}

.el-header, .el-main {
  display: flex;
  height: 100%;
  width: 100%;
  padding: 0px;
}

.fullscreen {
  position :absolute;
  top : 0;
  bottom: 0;
  left: 0;
  right: 0;
  height: 100%;
  width: 100%;
  background: #d3dce6;
}

  .bg-purple {
    background: #e5e9f2;
  }

</style>
