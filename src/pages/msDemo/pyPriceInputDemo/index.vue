<template>
  <div style="width:200px">
   <py-price-input 
      v-model="price_input_model"
      placeholder="0.00"
      label="价格"
      currency_symbol="NT$"
      :decimal_point="true"
      :decimal_num="2"
      :disabled="false"
      err_txt=""
      tip_content="这是一段提示文字"
      tooltip_content="若要显示折扣价格，请将产品的原始价格移动至“原价”。在“价格”中输入较低的价格。">
   </py-price-input>
   <el-button type="primary" @click="handleSubmit()">提交</el-button>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import pyPriceInput from "@/components/shared/form/price-input/index.vue";
@Component({
  components: {
    pyPriceInput
  }
})
export default class Home extends Vue {
 private price_input_model: string = '222';
 private handleSubmit(){
   console.log('111',this.price_input_model)
 }
}
</script>


<style lang="scss" scope>

</style>
