<template>
  <div style="width:200px">
   <py-select-input 
      v-model="select_input_model"
      :select_list="select_list"
      placeholder="大小"
      >
   </py-select-input>
   <el-button type="primary" @click="handleSubmit()">提交</el-button>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import pySelectInput from "@/components/shared/form/select-input/index.vue";
@Component({
  components: {
    pySelectInput
  }
})
export default class Home extends Vue {
 private select_input_model: string = '';
 private select_list: any[] = [{ value: '大小' }, { value: '颜色' }, { value: '材料' }, { value: '样式' }, { value: '标题' }];
 private handleSubmit(){
   console.log('111',this.select_input_model)
 }
}
</script>


<style lang="scss" scope>

</style>
