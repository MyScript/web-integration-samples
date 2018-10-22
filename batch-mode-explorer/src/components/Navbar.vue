<template>
  <div class="nav">
    <control />
    <pen-setting :colors="colors" />
  </div>
</template>

<script>
import Control from './navbar/Control';
import PenSetting from './navbar/PenSettings';

export default {
  name: 'navbar',
  props: {
    colors: {
      type: Array
    },
  },
  components: {
    Control, PenSetting,
  },
};
</script>

<style scoped>
.nav {
  border-top: none;
  flex-wrap: wrap-reverse;
  display: flex;
  align-items: center;
  align-content: center;
  justify-content: space-between;
  z-index: 25;
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
