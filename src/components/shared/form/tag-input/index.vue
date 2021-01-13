<template>
    <div class="py-tag-input">
        <div class="py-input-inner" :class="{ 'py-input-err': err_txt }">
       <transition-group name="el-zoom-in-center">
         <div class="py-margin-small-right py-margin-small-bottom py-display-inline-block py-max-100-percent py-tag" :key="tag" v-for="tag in tag_list">
            <span class="py-display-inline-block py-text-overflow py-w-97">{{ tag }}</span>
            <span @click="handleClose(tag)"><i class="el-icon-close"></i></span>
          </div>
      </transition-group>
            <el-input
                v-model.trim="input_val"
                name="value"
                :placeholder="placeholder"
                @keyup.enter.native="handleBlur()"
                @input="handleInput"
                @blur="handleBlur()"
            ></el-input>
        </div>
        <div class="py-err-text">{{ err_txt }}</div>
    </div>
</template>

<script lang="ts">
import { Component, Vue, Emit, Prop, Watch } from 'vue-property-decorator';
@Component
export default class PyPriceInput extends Vue {
    @Prop(String) private value: any; //v-model封装需要的地方1
    @Prop({ default: '请用英文逗号隔开每个选项' }) private placeholder: string | undefined; //placeholder
    public input_val: any = this.value; //input 绑定值 v-model封装需要的地方2
    public err_txt: string = ''; //报错信息
    public tag_list: any[] = []; //tag标签数组
    //v-model封装需要的地方3
    @Watch('input_val')
    private inputVal(newVal: string, oldVal: string) {
        this.input(newVal);
    }
    //v-model封装需要的地方4
    @Emit('input')
    private input(val: string): string {
        return val;
    }
    //将taglist 传到父组件
    @Emit('sendTagList')
    private sendTagList(val: any): any {
        return val;
    }
    private handleClose(tag: any): void {
        this.tag_list.splice(this.tag_list.indexOf(tag), 1);
        this.sendTagList(this.tag_list)
    }
    private handleBlur(type:string) {
      if(type==='comma'){
        this.input_val = this.input_val.substr(0, this.input_val.length-1)
      }
        let inputValue = this.input_val;
        if (inputValue && this.tag_list.indexOf(inputValue)<0) {
            this.tag_list.push(inputValue);
            this.input_val = '';
            this.err_txt = '';
        } else {
            if (inputValue) {
                this.err_txt = `您已经使用了选项 '${inputValue}'`;
            }
        }
      this.sendTagList(this.tag_list)
    }
    private handleInput(val: any) {
        if(val.includes(',')){
          this.handleBlur('comma')
        }
    }
}
</script>

<style lang="scss" scope>
@import '@/assets/scss/variables.scss';
.py-100-percent{
  width:100%
}
.py-max-100-percent{
  max-width:100%
}
.py-text-overflow{
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.py-display-inline-block {
  display: inline-block
}
.py-w-97{
   width: calc(100% - 17px);
}
.py-tag-input {
    font-size: 14px;
    .py-input-inner {
        border: 1px solid #c9cccf;
        border-radius: 5px;
        padding: 5px 12px;
        /deep/ .el-input__inner {
            border: none;
            height: 26px;
            line-height: 26px;
            padding: 0 8px;
        }
        /deep/ .el-input.is-disabled .el-input__inner {
            background-color: #fff;
            cursor: not-allowed;
        }
        .py-symbol {
            color: #6d7175;
        }
    }
    .py-tag {
        background-color: #e6f2ff;
        border: 1px solid #cce4ff;
        font-size: 12px;
        color: #0179ff;
        padding: 3px 5px;
        border-radius: 3px;
        box-sizing: border-box;
        i {
            cursor: pointer;
            text-align: center;
            position: relative;
            top: -3px;
            right: -2px;
            font-size: 12px;
            color: #999999;
            height: 14px;
            width: 14px;
            line-height: 14px;
            border-radius: 50%;
            vertical-align: middle;
            margin-left: 3px;
        }
        i:hover {
            color: #ffffff;
            background-color: #0179ff;
        }
    }
    .py-input-inner:focus-within {
        border: 1px solid $--color-primary;
    }
    .py-input-err {
        border: 1px solid $--color-danger !important;
    }
    .py-err-text {
        color: $--color-danger;
        font-size: 12px;
    }
}
</style>
