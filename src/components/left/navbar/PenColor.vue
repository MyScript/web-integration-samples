<template>
  <div class="pensettings">
    <button @click="changeColor" class="color" :style="style">
      <span v-if="colorChecked" class="check" :style="{ borderColor: tickColor }"></span>
    </button>
  </div>
</template>

<script>
import { blackOrWhiteTick, hexToRgb } from '../../../utils/utils';
import EventBus from '../../../event-bus';

export default {
  name: 'pen-color',
  props: ['color', 'checked'],
  data() {
    return {
      tickColor: 'white',
      colorChecked: this.checked,
    };
  },
  mounted() {
    EventBus.$on('colorChanged', () => {
      this.colorChecked = false;
    });
    EventBus.$on('customColorChanged', () => {
      this.colorChecked = false;
    });
  },
  computed: {
    style() {
      return `background-color: ${this.color}`;
    },
  },
  methods: {
    changeColor() {
      EventBus.$emit('colorChanged', this.color);
      this.tickColor = blackOrWhiteTick(hexToRgb(this.color));
      this.colorChecked = true;
    },
  },
};
</script>

<style scoped>

  .pensettings {
    text-align: center;
    user-select: none;
    margin-right: 12px;
  }

  .color {
    height: 36px;
    width: 36px;
    border: #c0c0c0 1px solid;
    border-radius: 50%;
  }

  .check {
    border-bottom: 2px solid black;
    border-right: 2px solid black;
    display: inline-block;
    transform: rotate(45deg);
    height: 16px;
    width: 8px;
  }

</style>
