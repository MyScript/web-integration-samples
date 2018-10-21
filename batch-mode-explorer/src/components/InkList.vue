<template>
  <div class="wrapper">
          <el-card v-for="(localInk, index) in data" :key="index"  class="box">
             <img :src="localInk.png" class="image">
              <div>
                <time class="time">{{ localInk.date }}</time>
                <div class="bottom clearfix">
                  <el-button @click="select(index)" type="primary" size="small" class="button">Load</el-button>
                  <el-button v-if="!useModels" @click="remove(index)" size="small" icon="el-icon-delete" class="button button-right"></el-button>
                </div>
              </div>
            </el-card>

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
    data : function(){
      if(this.useModels === true){
        return this.models
      }else{
        return this.localContent
      }
    },
    ...mapState([
      'localContent','models'
    ])
  },
  props: {
    useLocals: Boolean,
    useModels : Boolean,
  },
    methods : {
      select(idx){

        this.$store.commit('restoreContext', this.data[idx]);
        //TODO Manage status and get the results
        this.$router.push({ path: '/write' });
      },
      remove(idx){
        this.$store.commit('removeLocalContentItem',idx);
      },
    }
}
  </script>
  
  <style scoped>
  .wrapper {
    display: grid;
    grid-template-columns: 50% 50%;
    grid-gap: 10px;
  }

  .box {
    padding: 10px;
  }

    .time {
      font-size: 1em;
      color: #999;
    }
    .image{
      min-width: 100%;
      max-width: 100%;
    }
    
    .bottom {
    margin-top: 13px;
    line-height: 12px;
  }

  .button-right {
    float: right;
  }

  .image {
    width: 100%;
    display: block;
  }
   .el-dialog {
    max-width: 90vw;
  }
  .modalcontainer{
    display: flex;
    flex: 1;
    padding: 10px;
    flex-direction: column;
  }
  .selector {
    padding: 20px;
  }

  </style>

  