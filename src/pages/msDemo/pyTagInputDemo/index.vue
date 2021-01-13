<template>
  <div style="width:300px">
   <py-tag-input 
      v-model="tag_input_model"
       @sendTagList="receiveTagList"
    >
   </py-tag-input>
   <el-button type="primary" @click="handleSubmit()">提交</el-button>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import pyTagInput from "@/components/shared/form/tag-input/index.vue";
@Component({
  components: {
    pyTagInput
  }
})
export default class Home extends Vue {
 private tag_input_model: string = '';
  receiveTagList(val:any){
      debugger;
    }
 private handleSubmit(){
   console.log('111',this.tag_input_model)
 }
}
</script>


<style lang="scss" scope>

</style>
