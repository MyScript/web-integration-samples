<template>
  <div class="nav-group">
    <button @click="clear" id="clear" class="nav-btn btn-fab-mini btn-lightBlue" :disabled="!canClear || preview">
      <img src="@/static/img/clear.svg">
    </button>
    <button @click="undo" id="undo" class="nav-btn btn-fab-mini btn-lightBlue" :disabled="!canUndo || preview">
      <img src="@/static/img/undo.svg">
    </button>
    <button @click="redo" id="redo" class="nav-btn btn-fab-mini btn-lightBlue" :disabled="!canRedo || preview">
      <img src="@/static/img/redo.svg">
    </button>
  </div>
</template>

<script>
import EventBus from '@/event-bus';

export default {
  name: 'control',
  data() {
    return {
      canUndo: false,
      canRedo: false,
      canClear: false,
      preview: false,
    };
  },
  mounted() {
    EventBus.$on('changed', (data) => {
      this.canUndo = data.event.detail.canUndo;
      this.canRedo = data.event.detail.canRedo;
      this.canClear = data.canClear;
    });
    EventBus.$on('preview', () => {
      this.preview = true;
    });
    EventBus.$on('edit', () => {
      this.preview = false;
    });
  },
  methods: {
    clear() {
      EventBus.$emit('clear');
    },
    undo() {
      EventBus.$emit('undo');
    },
    redo() {
      EventBus.$emit('redo');
    },
  },
};
</script>

<style scoped>

  @media screen and (max-width: 710px) {
    .nav-group {
      margin-top: 6px;
    }
  }

</style>
