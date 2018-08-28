<template>
  <div class="pensettings thickness" :class="{'active-thickness': thicknessActive}" @click="updateThickness">
    <div class="thickness-icon" :style="itemStyle"></div>
    <span>{{value}}</span>
  </div>
</template>

<script>

import EventBus from '../../../event-bus';

export default {
  name: 'thickness',
  props: ['itemStyle', 'value', 'active'],
  data() {
    return {
      thicknessActive: this.active,
    };
  },
  mounted() {
    EventBus.$on('thicknessUpdated', () => {
      this.thicknessActive = false;
    });
  },
  methods: {
    updateThickness() {
      EventBus.$emit('thicknessUpdated', ({ value: this.value, itemStyle: this.itemStyle }));
      this.thicknessActive = true;
    },
  },
};
</script>

<style scoped>

</style>
