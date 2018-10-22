<template>

  <el-container class="write">
    <el-header>

      <a id="index-header-link" @click="back" class="ooo-link-back" style="cursor: pointer"></a>

      <Navbar :colors="['#000000', '#FF1A40']"></Navbar>
      <!--
            FIXME Use this button in mobile view
            div class="button-container">
            <el-button type="primary" @click="convert" :disabled="!firstStroke" class="convert-button left-separation">Convert <i class="el-icon-arrow-right el-icon-right"></i></el-button>
          </div-->
      <!-- Star ink and result button -->
      <div class="button-container">
        <el-button v-if="firstStroke" type="primary" icon="el-icon-star-off" circle @click="star" class="star-button"></el-button>
      </div>

    </el-header>

    <el-main class="mainEditor">
      <vue-editor :no-logo="true" @loaded="loaded" ref="vueEditor"></vue-editor>

      <el-tabs tab-position="top" :stretch="true" v-model="activeTab">
        <el-tab-pane label="Strokes" name="strokes">
          <pointer-events-display></pointer-events-display>
        </el-tab-pane>
        <el-tab-pane label="Content type" name="content-type">
          <interpretation-options></interpretation-options>
        </el-tab-pane>
        <el-tab-pane label="Interpretation" name="interpretation">
          <div v-if="status === 'WAITING_CONVERSION_OPTIONS'">Specify the content type first</div>
          <control-and-export v-else></control-and-export>
        </el-tab-pane>
      </el-tabs>
    </el-main>

    <!-- Menu views -->

  </el-container>

</template>

<script>
import InterpretationOptions from '@/components/InterpretationOptions';
import ControlAndExport from '@/components/ControlAndExport';
import Navbar from '@/components/Navbar';
import VueEditor from '@/components/VueEditor';
import PointerEventsDisplay from '@/components/PointerEventsDisplay';
import store from '@/store/store';
import EventBus from '@/event-bus';
import search from '@/utils/search';
import { mapState } from 'vuex';

export default {
  name: 'write',
  components: { Navbar, VueEditor, PointerEventsDisplay, InterpretationOptions, ControlAndExport },
  data() {
    return {
      activeTab: "strokes",
      firstStroke: false,
      isCollapse: true,
      searchTerm: "",
    }
  },
  computed: mapState([
    'status',
  ]),

  methods: {
    refreshStrokesInCanvas() {
      if (this.$store.state.strokeGroups && this.$store.state.strokeGroups.length > 0) {
        //this.$refs.vueEditor.editor.reDraw(store.state.currentContent.rawStrokes,store.state.currentContent.strokeGroups);

        const editor = this.$refs.vueEditor.editor;
        editor.eastereggs.importStrokeGroups(editor, this.$store.state.strokeGroups);
        editor.forceChange();
      }
    },
    back() {
      this.$router.push({ path: '/' })
    },
    convert() {
      store.commit('updateStrokeGroups', this.$refs.vueEditor.getStrokeGroups());
      this.$router.push({ path: 'interpret' })
    },
    loaded() {
      this.refreshStrokesInCanvas()
    },
    handleOpen(key, keyPath) {
      // eslint-disable-next-line
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      // eslint-disable-next-line
      console.log(key, keyPath);
    },
    star() {
      //TODO Add the exported results to later on allow a restauration

      store.commit('addLocalContent', this.$refs.vueEditor.editor.png);

      this.$message({
        showClose: true,
        message: 'Content stored in your current session',
        type: 'success'
      });

      //
    },
    searchWithJiix() {
      search(this.searchTerm, this.$refs.vueEditor.editor)
    }
  },
  mounted() {

    EventBus.$on('requestClear', () => {
      this.$refs.vueEditor.editor.clear();
    });
    EventBus.$on('restoreContext', () => {
      this.refreshStrokesInCanvas()
    });
    EventBus.$on('changed', (evt) => {
      this.firstStroke = evt.canClear;
    });

    EventBus.$on('pointerDown', () => {
      if (this.$store.state.status === "CONVERTED") {
        this.$store.commit('switchToContentModified');
      }
    })
    EventBus.$on('viewTabModificationRequested', (evt) => {
      this.activeTab = evt;
    })
  }
}



</script>
<style>
.left-separation {
  border-left: 1px solid #d7dde3;
  padding-left: 7px;
  padding-right: 7px;
}

.right-separation {
  border-right: 1px solid #d7dde3 !important;
  padding-right: 20px;
  padding-left: 20px !important;
}

.el-icon-arrow-down:before {
  content: url('../static/img/menu.svg') !important;
  background-size: 250px 100px;
}
.el-submenu__title {
  padding: 0 !important;
  height: 56px !important;
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}

.el-menu--horizontal > .el-submenu .el-submenu__icon-arrow {
  margin-left: 0px !important;
}
</style>
<style scoped>
.el-main {
  display: grid;
  grid-template-columns: 65% 35%;

  position: relative;
  width: 100%;
  height: 100%;
  padding: 0px;
}

.el-header {
  display: flex;
  flex-direction: row;
  border-bottom: solid 1px #e6e6e6;
  justify-content: space-between;
  padding: 0px;
  background-color: #d7dde33b;
}
.convert-button {
  margin: 10px;
}
.el-menu--horizontal {
  border-bottom: none;
}
.button-container {
  display: flex;
  align-self: center;
}
.star-button {
  margin: 10px;
}
.input-with-select {
  justify-self: center;
}
</style>
