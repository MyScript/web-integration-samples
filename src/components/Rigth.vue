<template>
  <div class="rigth fullWidth">
        <Parttypechooser v-if="selectionState ==='SELECTING' " @converting="launchSpinner"></Parttypechooser>
        <Spinner v-if="selectionState ==='SPINING'"  size="massive" message="Converting..."  ></Spinner>
        <Exportcontent v-if="selectionState ==='EXPORTED'"></Exportcontent>
  </div>
</template>

<script>
import Parttypechooser from './rigth/Parttypechooser.vue';
import Exportcontent from './rigth/Exportcontent.vue';
import Spinner from 'vue-simple-spinner';

export default {
  name: 'rigth',
  components: {Parttypechooser, Spinner, Exportcontent},
  data(){
    return {
      selectionState : 'SELECTING',
    }
  },
  methods : {
    launchSpinner(){
      this.selectionState ='SPINING';
      setInterval(() => this.selectionState = 'EXPORTED', 5000)
    }
  }
}

</script>
<style>

</style>
