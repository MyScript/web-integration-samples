<template>
    <el-container class="write">
      <el-header>
          <el-menu :default-active="activeIndex" class="el-menu-custom right-separation" mode="horizontal" @select="handleSelect" menu-trigger="click">
            <el-submenu index="1">
              <template slot="title"></template>
              <el-menu-item index="ImportStrokes">Import strokes</el-menu-item>
              <el-menu-item index="1-2" disabled>Browse local inks</el-menu-item>
              <el-menu-item index="1-3" disabled></el-menu-item>
              <el-menu-item index="StrokesDisplay">Display strokes</el-menu-item>
            </el-submenu>
            
          </el-menu>
        
          <Navbar :colors="['#000000', '#FF1A40']"></Navbar>
          <div class="button-container left-separation">
            <el-button type="primary" @click="convert" :disabled="!firstStroke" class="convert-button left-separation">Convert <i class="el-icon-arrow-right el-icon-right"></i></el-button>
          </div>

        
      </el-header>
      <el-main class="mainEditor"><vue-editor :no-logo="true" @loaded="loaded" ref="vueEditor"></vue-editor></el-main>
      <stroke-importer ref="strokeimporter"></stroke-importer>
      <pointer-events-display ref="pointerEventsDisplay"></pointer-events-display>
      <el-button v-if="firstStroke" type="primary" icon="el-icon-star-off" circle @click="star" class="star-button"></el-button>
    </el-container>
</template>

<script>
import Navbar from '@/components/Navbar';
import VueEditor from '@/components/VueEditor';
import StrokeImporter from '@/components/StrokeImporter';
import PointerEventsDisplay from '@/components/PointerEventsDisplay';
import store from '@/store/store';
import EventBus from '@/event-bus';

export default {
  name: 'write',
  components: {Navbar, VueEditor, StrokeImporter, PointerEventsDisplay},
  data(){
    return {
      activeIndex: "1",
      firstStroke : false,
      isCollapse: true,
    }
  },
  methods:{
    handleSelect(menuIndex){
      if(menuIndex === 'ImportStrokes'){
        this.$refs.strokeimporter.display();
      }else if (menuIndex === 'StrokesDisplay') {
        this.$refs.pointerEventsDisplay.display();
      } else {
        this.$message({
          showClose: true,
          message: 'Not implemented yet.',
          type: 'warning'
        });
      }
    },
    convert(){
      const datas = {
          rawStrokes : this.$refs.vueEditor.editor.model.rawStrokes,
          strokeGroups : this.$refs.vueEditor.editor.model.strokeGroups,
        };
      store.commit('updateCurrentContent',datas);
      store.commit('updateStrokeGroups', this.$refs.vueEditor.getStrokeGroups());
      this.$router.push({ path: 'interpret' })
    },
    loaded() {
      if(this.$store.state.currentContent && this.$store.state.currentContent.rawStrokes){
        this.$refs.vueEditor.editor.reDraw(store.state.currentContent.rawStrokes,store.state.currentContent.strokeGroups);
      }
    },
    handleOpen(key, keyPath) {
      // eslint-disable-next-line
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        // eslint-disable-next-line
        console.log(key, keyPath);
      },
      star(){
        const datas = {
          rawStrokes : this.$refs.vueEditor.editor.model.rawStrokes,
          strokeGroups : this.$refs.vueEditor.editor.model.strokeGroups,
          png : this.$refs.vueEditor.editor.png,
        };
        store.commit('addLocalContent',datas);
        this.$message({
          showClose: true,
          message: 'Content stored in your current session',
          type: 'success'
        });
        
        //
      }
  },
  mounted() {
    EventBus.$on('changed', (evt) => {
      this.firstStroke = evt.canClear;
      store.commit('resetExports');
    });
  }
}



</script>
<style>
  .left-separation {
    border-left: 1px solid #D7DDE3;
    padding-left: 7px;
    padding-right: 7px;
  }

  .right-separation {
    border-right: 1px solid #D7DDE3!important;
    padding-right: 20px;
    padding-left: 20px!important;
  }
  
  .el-icon-arrow-down:before {
    content: url('../static/img/menu.svg')!important;
    background-size: 250px 100px;
  }
  .el-submenu__title {
    padding : 0!important;
    height : 56px!important;
    
  }
  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
  }
  
  .el-menu--horizontal > .el-submenu .el-submenu__icon-arrow {
    margin-left: 0px!important;
  }
</style>
<style scoped>
.el-main {
  display: flex;
    flex-direction: column;
    position: relative;
  width: 100%;
  height: 100%;
  padding: 0px;

}

.el-header {
  display : flex;
  flex-direction: row;
  border-bottom: solid 1px #e6e6e6;
  justify-content: space-between;
  padding: 0px;
  background-color: #d7dde33b;
}
.convert-button {
  margin: 10px;
}
.el-menu--horizontal{
  border-bottom: none;
}
.button-container{
  display: flex;
  background-color: white;
}
.star-button {
  position: absolute;
  bottom: 15px;
  right: 15px;
  z-index: 20;
}

</style>
