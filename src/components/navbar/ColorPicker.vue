<template>
  <div class="pensettings">
    <button @click="openPicker" class="color-picker" :style="style">
      <span v-if="colorChecked" class="check" :style="{ borderColor: tickColor }"></span>
      <img v-else src="@/static/img/add.svg">
    </button>
    <sketch-picker id="color-picker" class="picker" v-model="colors" v-show="showPicker" @input="updateColor"/>
  </div>
</template>

<script>
import { Sketch } from 'vue-color';
import { blackOrWhiteTick, hexToRgb } from '@/utils/utils';
import EventBus from '@/event-bus';

export default {
  name: 'color-picker',
  components: {
    Sketch,
    'sketch-picker': Sketch,
  },
  data() {
    return {
      showPicker: false,
      colors: '',
      currentColor: '',
      colorChecked: false,
      tickColor: 'white',
    };
  },
  computed: {
    style() {
      return `background-color: ${this.currentColor}`;
    },
  },
  mounted() {
    EventBus.$on('colorChanged', () => {
      this.colorChecked = false;
      this.showPicker = false;
    });
    EventBus.$on('pointerDown', () => {
      this.showPicker = false;
    });
  },
  methods: {
    openPicker() {
      this.showPicker = !this.showPicker;
      if (this.colors) {
        this.updateColor(this.colors);
      }
    },
    updateColor(value) {
      this.currentColor = value.hex;
      EventBus.$emit('customColorChanged', this.currentColor);
      this.colorChecked = true;
      this.tickColor = blackOrWhiteTick(hexToRgb(value.hex));
    },
  },
};
</script>

<style scoped>

  @media screen and (max-width: 980px) {
    .picker {
      right: 12px;
    }
  }

  @media only screen and (max-width : 580px) {
    .pensettings {
      display: none;
    }
  }


  .picker {
    z-index: 40;
    width: 245px;
    position: absolute;
  }

  .color-picker {
    height: 36px;
    width: 36px;
    border: #c0c0c0 1px dashed;
    border-radius: 50%;
  }

  .color-picker:focus {
    outline: none;
  }

  .color-picker > img {
    margin-left: auto;
    margin-right: auto;
    display: block;
  }

</style>
