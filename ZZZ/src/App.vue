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
.ooo-link-back {
    display: block;
    min-height: 24px;
    min-width: 24px;
    margin: 16px;
    background:transparent url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+Cjxzdmcgd2lkdGg9IjI0cHgiIGhlaWdodD0iMjRweCIgdmlld0JveD0iMCAwIDI0IDI0IiB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiPgogICAgPCEtLSBHZW5lcmF0b3I6IFNrZXRjaCAzLjguMyAoMjk4MDIpIC0gaHR0cDovL3d3dy5ib2hlbWlhbmNvZGluZy5jb20vc2tldGNoIC0tPgogICAgPHRpdGxlPnVpL2xhcnI8L3RpdGxlPgogICAgPGRlc2M+Q3JlYXRlZCB3aXRoIFNrZXRjaC48L2Rlc2M+CiAgICA8ZGVmcz48L2RlZnM+CiAgICA8ZyBpZD0idWkiIHN0cm9rZT0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIxIiBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPgogICAgICAgIDxnIGlkPSJ1aS9sYXJyIiBmaWxsPSIjMUE5RkZGIj4KICAgICAgICAgICAgPHBhdGggZD0iTTcuNDE0MjEzNTQsMTMgTDEyLjcwNzEwNjgsMTguMjkyODkzMiBDMTMuMDk3NjMxMSwxOC42ODM0MTc1IDEzLjA5NzYzMTEsMTkuMzE2NTgyNSAxMi43MDcxMDY4LDE5LjcwNzEwNjggQzEyLjMxNjU4MjUsMjAuMDk3NjMxMSAxMS42ODM0MTc1LDIwLjA5NzYzMTEgMTEuMjkyODkzMiwxOS43MDcxMDY4IEw0LjY0OTY0Nzg2LDEzLjA2Mzg2MTQgQzQuMDYxNzQwMDcsMTIuNDc1OTUzNyA0LjA2MjA3OTAyLDExLjUyMzcwNzQgNC42NDk2NDc4NiwxMC45MzYxMzg2IEwxMS4yOTI4OTMyLDQuMjkyODkzMjIgQzExLjY4MzQxNzUsMy45MDIzNjg5MyAxMi4zMTY1ODI1LDMuOTAyMzY4OTMgMTIuNzA3MTA2OCw0LjI5Mjg5MzIyIEMxMy4wOTc2MzExLDQuNjgzNDE3NTEgMTMuMDk3NjMxMSw1LjMxNjU4MjQ5IDEyLjcwNzEwNjgsNS43MDcxMDY3OCBMNy40MTQyMTM1NCwxMSBMMjAsMTEgQzIwLjU1MjI4NDcsMTEgMjEsMTEuNDQ3NzE1MyAyMSwxMiBDMjEsMTIuNTUyMjg0NyAyMC41NTIyODQ3LDEzIDIwLDEzIEw3LjQxNDIxMzU0LDEzIFoiIGlkPSJDb21iaW5lZC1TaGFwZSI+PC9wYXRoPgogICAgICAgIDwvZz4KICAgIDwvZz4KPC9zdmc+Cg==) no-repeat 50%/contain;
    }
</style>