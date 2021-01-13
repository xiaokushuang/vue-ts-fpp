<template>
  <div class="py-edit-num-input">
      <div class="py-flex">
        <el-button-group class="py-flex py-margin-small-right">
          <el-button @click="handleClickBtn('add')" class="py-button" :class="active==='add'?'py-active-btn':''">添加</el-button>
          <el-button @click="handleClickBtn('set')" class="py-button" :class="active==='set'?'py-active-btn':''">设置</el-button>
        </el-button-group>
        <el-input-number v-model="input_val" controls-position="right" @change="handleChangeNum"></el-input-number>
      </div>
      <div>
        <el-button :loading="sucess_flag&&is_btn_blue" class="py-100-percent py-submit-btn" :class="is_btn_blue?'py-submit-btn-active':''" @click="handleSubmitBtn()">提交</el-button>
      </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Emit, Prop, Watch } from 'vue-property-decorator';

@Component({})
export default class PyPriceInput extends Vue {
    @Prop(Number) old_num_val: number | undefined;//父组件传来的旧值
    @Prop(Number) value: number | undefined;//v-model封装需要的地方1
    @Prop({default:false}) sucess_flag: boolean | undefined;//提交按钮的loading 效果
    private active:string | undefined = 'add' ;
    public input_val:number = this.value;//input 绑定值 v-model封装需要的地方2
    public new_num_val:number = 0;//计算之后的值
    public is_btn_blue:boolean = false;//用来判断button颜色的变量
    //v-model封装需要的地方3
    @Watch('input_val')
    private inputVal(newVal: number, oldVal: number) {
        this.input(newVal);
    }
    //v-model封装需要的地方4
    @Emit('input')
    private input(val: number): number {
        return val;
    }
    @Emit('handleNewVal')
    private handleNewVal(val: number): number {
        return val;
    }
    @Emit('handleSubmit')
    private handleSubmit(val: number): number {
        return val;
    }
    //input change事件
    private handleChangeNum(val:number):void{
      //点击添加按钮，值为0的时候，提交按钮不能点击
      if(this.active==='add'){
        this.is_btn_blue = val!==0?true:false;
        //否则，输入的值与原来的值不相等的时候才能点击
      }else{
        this.is_btn_blue = val!==this.old_num_val?true:false;
      }
      this.new_num_val = this.active==='add' ? this.old_num_val + val : val;
       //将计算之后的值传给父组件
      this.handleNewVal(this.new_num_val)
    }
    //点击添加和设置按钮
    private handleClickBtn(val:string){
      this.active = val
      //点击添加按钮，值为0的时候，提交按钮不能点击
      if(val==='add'){
        this.is_btn_blue = this.input_val!==0?true:false;
        //否则，输入的值与原来的值不相等的时候才能点击
      }else{
        this.is_btn_blue = this.input_val!==this.old_num_val?true:false;
      }
      this.new_num_val = val==='add'?this.old_num_val + this.input_val : this.input_val;
      //将计算之后的值传给父组件
      this.handleNewVal(this.new_num_val)
    }
    private handleSubmitBtn (){
      this.handleSubmit(this.new_num_val)
    }
}
</script>
<style>
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
</style>
<style lang="scss" scope>
@import '@/assets/scss/variables.scss' ;
.py-edit-num-input {
  .py-active-btn{
    background:#6d7175 !important;
    color:#fff !important;
  }
    .py-button {
      padding: 7px 16px;
    }
    .py-submit-btn{
      color:#8c9196;
      background:#f1f1f1;
      border:none;
      cursor:default;
    }
    .py-submit-btn-active{
      color:#fff;
      background:$--color-primary;
      border:none;
      cursor:pointer;
    }
     .py-submit-btn:hover{
        border:none;
      }
    .py-button:hover{
        color: #202223;
        border-color: #c4cdd5;
        background-color: #f6f6f7;
    }
    /deep/ .el-input-number {
       width: calc(100% - 133px);
    }
  }
</style>
