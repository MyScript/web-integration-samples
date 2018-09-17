<template>
  <div class="parttypechooser">
    <el-select v-model="partType" placeholder="Select part type">
      <el-option-group v-for="group in partTypeList" :key="group.label" :label="group.label">
        <el-option v-for="item in group.options" :key="item.value" :label="item.label" :value="item.value">
        </el-option>
      </el-option-group>
    </el-select>
    
    <el-select v-if="partType !== '' && partType !== 'MATH'" v-model="lang" filterable placeholder="Select language">
    <el-option
      v-for="(value, key) in langList.result"
      :key="value"
      :label="value"
      :value="key">
    </el-option>
  </el-select>
  
  <el-button v-if="partType !== 'MATH' && lang !== ''" type="primary" @click="convert">Convert</el-button>

  </div>
</template>

<script>
import langList from '@/static/languages.js';

const partTypeList = [{
          label: 'Interactive parts',
          options: [{
            value: 'TEXT',
            label: 'Text'
          }, {
            value: 'MATH',
            label: 'Math'
          }]
        }, {
          label: 'Batch mode',
          options: [{
            value: 'DIAGRAM',
            label: 'Diagram'
          }, {
            value: 'RAWCONTENT',
            label: 'Raw-Content'
          }]
        }];



export default {
  name: 'parttypechooser',
   data() {
      return {
        partTypeList,
        langList,
        partType: '',
        lang: '',
      }
    },
    methods : {
      convert(){
        this.$emit("converting", {partType : this.partType, lang : this.lang})
      }
    }
}

</script>
<style>
.parttypechooser {
  display: flex;
  flex-direction: column;
  max-width: 200px;
  margin: auto;
}

</style>