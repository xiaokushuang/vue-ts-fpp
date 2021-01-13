<template>
  <div class="py-title-input">
    <div class="py-title">{{title}}</div>
    <div class="py-input">
      <el-input 
        v-model="input_val" 
        :maxlength="maxlength"
        @change="handleInputChange"
        @input="handleInput"
        v-bind="$attrs"
        v-on="$listeners"
      />
      <el-tooltip 
        v-if="hasTooltip" 
        :content="tooltip_content"
        class="py-tooltip"
      >
        <i class="el-icon-question"></i>
      </el-tooltip>
    </div>
    <div v-if="hasWordNum" class="py-limit"> 使用的字符长度 {{input_val.length}}/{{maxlength}} </div>
    <div v-if="hasErrorTip" class="py-error"> {{errorTip}} </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch, Emit } from "vue-property-decorator";

type ValueType = 'string' | 'number';

@Component({
  name: "PYTitleInput",
})
export default class extends Vue {
  @Prop({
    required: true
  }) private title!: string; // 标题
  @Prop() private value!: string; // 初始值
  @Prop({default: false}) private hasWordNum!: boolean; // 是否显示字数
  @Prop() private maxlength!: number; // 最大字数
  @Prop({default: false}) private hasTooltip!: boolean; // 是否显示tooltip
  @Prop() private tooltip_content!: string; // tooltip内容 需要配合hasTooltip使用
  @Prop({default: false}) private hasErrorTip!: boolean; // 是否显示错误提示
  @Prop() private verificationValue!: any; // 验证方法 需要配合hasErrorTip使用
  
  private input_val: any = this.value? this.value : '';
  private errorTip = '';
  
  @Watch('value', {immediate: true})
  private watchValue(val: ValueType ): void{
    this.input_val = val;
  }

  private handleInput(val: ValueType): void {
    this.$emit("input", val);
    if(this.hasErrorTip) {
      this.errorTip = this.verificationValue(val?val:'');
    } 
  }

  public handleInputChange(val: ValueType): void{
    this.$emit("change", val);
  }
}
</script>

<style lang='scss' scoped>
.py-title-input {
  display: flex;
  flex-direction: column;
}

.el-form {
  // .py-title-input {
  //   display: flex;
  //   flex-direction: row;
  // }
  // .py-title, .py-input {
  //   display: inline-block;
  // }
}
.py-title {
  // padding: 20px 0;
}

.py-input {
  position: relative;
  margin-bottom: 10px;
}

.py-tooltip {
  position: absolute;
  right: 10px;
  top: 10px;
}

.py-limit {
  padding: 10px 0;
}

.py-error {
  padding: 10px 0;
  color: #f56c6c;
}
</style>