<template>
  <div class="nav">
    <control/>
    <pen-setting/>
  </div>
</template>

<script>
import Control from './navbar/Control';
import PenSetting from './navbar/PenSettings';

export default {
  name: 'navbar',
  components: {
    Control, PenSetting,
  },
};
</script>

<style scoped>
  .nav {
    background-color: white;
    border-top: none;
    flex-wrap: wrap-reverse;
    display: flex;
    align-items: center;
    align-content: center;
    justify-content: space-between;
    z-index: 25;
    border-bottom: 1px solid #D7DDE3;
    padding: 3px 12px;
    transition: opacity 0.5s;
  }

  .nav-group {
    display: flex;
    align-items: center;
  }

  div.nav-group:nth-child(3) {
    width: 270px;
    justify-content: flex-end;
  }
</style>
