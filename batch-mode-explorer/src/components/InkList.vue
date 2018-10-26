<template>
  <div class="wrapper">
    <el-button v-for="(localInk, index) in data" :key="index" @click="select(index)" type="secondary" class="button box">
      <img :src="localInk.png" class="image">
      <div class="bottom">
        <time class="time">{{ formatDate(localInk.date) }}</time>
        <el-button v-if="!useModels" @click.stop="remove(index)" size="small" icon="el-icon-delete" class="button button-right"></el-button>
      </div>
    </el-button>
    
    <el-button v-if="Object.keys(data).length === 0"  type="secondary" class="button box starCard" :disabled="true">
      <div class="mainSign starSign"><i class="el-icon-star-off"></i></div>
      <div>Use the star button to visualize your inks later</div>
    </el-button>
    


  </div>
</template>
  
  <script>
import { mapState } from 'vuex';

export default {

  name: 'ink-list',
  data() {
    return {
      centerDialogVisible: false,
    }
  },
  computed: {
    data: function () {
      if (this.useModels === true) {
        return this.models
      } else {
        return this.localContent
      }
    },
    ...mapState([
      'localContent', 'models'
    ])
  },
  props: {
    useLocals: Boolean,
    useModels: Boolean,
  },
  methods: {
    select(idx) {

      this.$store.commit('restoreContext', this.data[idx]);
      //TODO Manage status and get the results
      this.$router.push({ path: '/write' });
      return false;
    },
    remove(idx) {
      this.$store.commit('removeLocalContentItem', idx);
    },
    formatDate(aDate) {
      const parsedDate = new Date(aDate);
      //return parsedDate;
      return (parsedDate.toDateString());
    }
  }
}
</script>
  
<style scoped>
@import '../static/inkList.css';
</style>

  