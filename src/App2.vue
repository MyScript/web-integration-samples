<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>


export default {
  name: 'app',
}
</script>

<style>
@import './static/button.css';
@import './static/diagram.css';

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin: 0px;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  
}

.col-right {
  text-align: right;
}

.col-left {
  text-align: left;
}
.el-container {
    height: 100%;
    width: 100%;
}
</style>