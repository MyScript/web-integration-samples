<template>
  <div class="nav-group left-separation">
    <button @click="disableEraser" id="pen" class="nav-btn btn-fab-mini tools" :class="{ penDisabled: !eraserDisabled, penEnabled: eraserDisabled }">
      <img src="@/static/img/pen.svg">
    </button>
    <button @click="enableEraser" id="eraser" class="nav-btn btn-fab-mini tools" :class="{ eraserEnabled: !eraserDisabled, eraserDisabled: eraserDisabled }">
      <img src="@/static/img/eraser.svg">
    </button>
    <div @click="showThicknessPanel" class="pensettings thickness left-separation" ref="thickness">
      <div class="thickness-icon" :style="activeThickness.itemStyle"></div>
      <span>{{activeThickness.value}}</span>
    </div>
    <thickness-panel id="thickness-panel" v-show="displayThicknessPanel" :style="{ left: thicknessPanelLeft }" />
    <div class="colors left-separation">
      <pen-color v-for="color in colors" :color="color" :checked="color === '#000000'" :key="color" />
      <color-picker />
    </div>
  </div>
</template>

<script>
import EventBus from '@/event-bus';
import PenColor from './PenColor';
import ColorPicker from './ColorPicker';
import ThicknessPanel from './ThicknessPanel';

export default {
  name: 'pen-setting',
  props: {
    colors: {
      type: Array,
      default: function () {
        return ['#000000', '#808080', '#D9D9D9', '#1A8CFF', '#FF1A40', '#2BD965', '#FFDD33'];
      },
    },
  },
  data() {
    return {
      eraserDisabled: true,
      displayThicknessPanel: false,
      thicknessPanelLeft: '',
      activeThickness: {
        value: 1,
        itemStyle: 'width: 5px; height: 5px; margin-top: 11px; margin-left: 11px;',
      },
    };
  },
  components: {
    PenColor,
    ColorPicker,
    ThicknessPanel,
  },
  mounted() {
    EventBus.$on('hideThicknessPanel', () => {
      this.displayThicknessPanel = false;
    });

    EventBus.$on('pointerDown', () => {
      this.displayThicknessPanel = false;
    });

    EventBus.$on('thicknessUpdated', (data) => {
      this.activeThickness = data;
    });

    EventBus.$on('colorChanged', () => {
      this.disableEraser();
    });

    EventBus.$on('customColorChanged', () => {
      this.disableEraser();
    });
  },
  methods: {
    showThicknessPanel() {
      this.displayThicknessPanel = true;
      if (window.innerWidth > 430) {
        this.thicknessPanelLeft = `${this.$refs.thickness.offsetLeft}px`;
      } else {
        this.thicknessPanelLeft = '12px';
      }
    },
    enableEraser() {
      document.body.style.cursor = 'url(\'static/img/eraser-cursor.cur\'), auto';
      this.eraserDisabled = false;
      EventBus.$emit('eraserEnabled');
    },
    disableEraser() {
      document.body.style.cursor = 'initial';
      this.eraserDisabled = true;
      EventBus.$emit('eraserDisabled');
    },
  },
};
</script>

<style scoped>
@media only screen and (max-width: 580px) {
  .nav-group {
    width: 100%;
  }
}

.eraserEnabled {
  border-bottom: #1a9fff 2px solid;
}

.penDisabled {
  border-bottom: initial;
  padding-top: 0;
}

.eraserDisabled {
  border-bottom: initial;
}

.penEnabled {
  border-bottom: #1a9fff 2px solid;
  padding-top: 2px;
}
</style>
