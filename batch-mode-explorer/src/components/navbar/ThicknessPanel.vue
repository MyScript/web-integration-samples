<template>
  <div class="notification">
    Thickness
    <a @click="hidePanel" class="delete"></a>
    <div class="flex-container-thickness">
      <thickness v-for="item in thicknessSettings" :key="item.value" :itemStyle="item.style" :value="item.value" :active="item.value === 1 ? true : ''" />
    </div>
  </div>
</template>

<script>
import EventBus from '@/event-bus';
import Thickness from './Thickness';

export default {
  name: 'thickness-panel',
  components: {
    Thickness,
  },
  data() {
    return {
      thicknessSettings: [
        {
          value: 0.5,
          style: 'width: 3px; height: 3px; margin-top: 12px; margin-left: 12px;',
        },
        {
          value: 1,
          style: 'width: 5px; height: 5px; margin-top: 11px; margin-left: 11px;',
        },
        {
          value: 2,
          style: 'width: 8px; height: 8px; margin-top: 10px; margin-left: 10px;',
        },
        {
          value: 3,
          style: 'width: 11px; height: 11px; margin-top: 8px; margin-left: 8px;',
        },
        {
          value: 4,
          style: 'width: 14px; height: 14px; margin-top: 6px; margin-left: 6px;',
        },
      ],
    };
  },
  methods: {
    hidePanel() {
      EventBus.$emit('hideThicknessPanel');
    },
  },
};
</script>

<style scoped>
@media screen and (max-width: 430px) {
  .notification {
    right: 12px;
    top: 96px;
  }
}

@media screen and (min-width: 430px) {
  .notification {
    top: 56px;
  }
}
.notification {
  display: initial;
}
</style>
