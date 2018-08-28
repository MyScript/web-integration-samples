<template>
  <div class="notification">
    Thickness
    <a @click="hidePanel" class="delete"></a>
    <div class="flex-container-thickness">
      <thickness v-for="item in thicknessSettings" :key="item.value" :itemStyle="item.style" :value="item.value" :active="item.value === 1 ? true : ''"/>
    </div>
  </div>
</template>

<script>
import EventBus from '../../../event-bus';
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
          style: 'width: 3px; height: 3px; margin-top: 6px',
        },
        {
          value: 1,
          style: 'width: 5px; height: 5px; margin-top: 6px',
        },
        {
          value: 2,
          style: 'width: 8px; height: 8px; margin-top: 5px',
        },
        {
          value: 3,
          style: 'width: 11px; height: 11px; margin-top: 3px',
        },
        {
          value: 4,
          style: 'width: 14px; height: 14px; margin-top: 2px',
        },
        {
          value: 5,
          style: 'width: 17px; height: 17px; margin-top: 0',
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
