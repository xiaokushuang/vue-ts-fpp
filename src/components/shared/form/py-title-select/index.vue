<template>
  <div class="py-title-select">
    <div class="py-title">{{title}}</div>
    <div class="py-select">
      <el-select
        v-model="input_val"
        no-match-text=""
        no-data-text=""
        popper-class="py-title-select"
        @change="handleChange"
        @input="handleInput"
        v-bind="$attrs"
        v-on="$listeners"
      >
        <template v-if="$slots.add">
          <slot name="add"></slot>
        </template>
        <el-option
          v-for="item in list"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        >
        </el-option>
      </el-select>
      <!-- <div v-if="hasTag">
        <div 
          v-for="{item, index} in input_val"
          :item="item"
          :key="index"
        >
        </div>
      </div> -->
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from "vue-property-decorator";

type ValueType = 'string' | 'number';

@Component({
  name: "PYTitleSelect",
})
export default class extends Vue {
  @Prop({
    required: true
  }) private title!: string; // 标题
  @Prop() private value!: string // 默认值
  @Prop() private options!: object[];
  @Prop({default: false}) private hasTag!: boolean; // 是否展示标签
  private input_val: string | number =  this.value? this.value:'';
  private list: object[] = this.options? this.options : []; // 当前匹配的options
  private showAdd: boolean = true;

  @Watch("value")
  private watchValue(val: ValueType ): void{
    this.input_val = val;
  }

  private handleInput(val: ValueType): void {
    this.$emit("input", val);
  }

  private handleChange(val: ValueType): void{
    this.$emit("change", val);
  }
  
}
</script>

<style lang='scss' scoped>
.py-title-select {
  display: flex;
  flex-direction: column;
}
.el-form {
  .py-title-select {
    display: flex;
    flex-direction: row;
  }
  .py-title, .py-select {
    display: inline-block;
  }
}
.py-title {
  padding: 20px 0;
}


</style>