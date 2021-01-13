<template>
    <div class="py-price-input">
        <div v-if="label" class="py-label">{{ label }}</div>
        <div v-if="tip_content" class="py-label">{{ tip_content }}</div>
        <div class="py-input-inner" :class="{ 'py-input-err': err_txt }">
            <span v-if="currency_symbol" class="py-symbol">{{ currency_symbol }}</span>
            <el-input
                v-model="input_val"
                name="value"
                :disabled="disabled"
                :placeholder="placeholder"
                @blur="handleBlur()"
                @input="limitInput($event, decimal_point, decimal_num)"
            ></el-input>
            <el-tooltip v-if="tooltip_content" :content="tooltip_content" placement="bottom" effect="dark">
                <i class="el-icon-question"></i>
            </el-tooltip>
        </div>
        <div v-if="err_txt" class="py-err-text">{{ err_txt }}</div>
    </div>
</template>

<script lang="ts">
import { Component, Vue, Emit, Prop, Watch } from 'vue-property-decorator';
@Component
export default class PyPriceInput extends Vue {
    @Prop(String) private value: string | undefined; //v-model封装需要的地方1
    @Prop(String) private label: string | undefined; //label标题
    @Prop(String) private placeholder: string | undefined; //placeholder
    @Prop(String) private tip_content: string | undefined; //tip提示语
    @Prop(String) private tooltip_content: string | undefined; //tooltip提示语
    @Prop({ default: true }) private decimal_point: boolean | undefined; //是否有小数点
    @Prop({ default: false }) private disabled: boolean | undefined; //是否禁用
    @Prop({ default: '2' }) private decimal_num: string | number | undefined; //保留几位小数
    @Prop(String) private err_txt: string | undefined; //错误提示语
    @Prop({ default: 'NT$' }) private currency_symbol: string | undefined; //货币符号
    public input_val: string = this.value; //input 绑定值  v-model封装需要的地方2
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
    //input 输入框值正则校验
    private limitInput(value: string, decimal_point: boolean, decimal_num: string | number | undefined) {
        let point_num_reg = new RegExp(`^\\d*(\.?\\d{0,${decimal_num}})`, 'g');
        this.input_val = this.decimal_point ? this.input_val.replace(/[^\d.]/g, '') : this.input_val.replace(/[^\d]/g, ''); //是否允许输入小数点
        this.input_val = this.input_val.replace(/^\./g, ''); //验证第一个字符是数字
        this.input_val = this.input_val.replace(/\.{2,}/g, '.'); //只保留第一个小数点, 清除多余的
        this.input_val = this.input_val
            .replace('.', '$#$')
            .replace(/\./g, '')
            .replace('$#$', '.')
            .match(point_num_reg)[0]; //保留几位小数
        // this.input_val = this.input_val.replace(/^(\-)*(\d+)\.(\d\d).*$/,'$1$2.$3'); //只能输入两个小数
        //Todo:保留几位小数还未处理
        // let input_val_temp = this._.floor(parseInt(this.input_val), decimal_num)
        //   console.log( input_val_temp.toString())
        // this.input_val = input_val_temp.toString()
    }
    private handleBlur() {
        const DIGIT_PATTERN = /(^|\s)\d+(?=\.?\d*($|\s))/g;
        const MILI_PATTERN = /(?=(?!\b)(\d{3})+\.?\b)/g;
        // this.input_val = this._.floor(parseInt(this.input_val), this.decimal_num)
        // let input_val1 = this._.floor(46, 2);
        // this.input_val = parseInt(this.input_val).toFixed(2);
        console.log('数字向下取整', (22.121).toFixed(2));
        this.input_val = this.input_val.toString().replace(DIGIT_PATTERN, m => m.replace(MILI_PATTERN, ',')); //千分符处理
    }
}
</script>

<style lang="scss" scope>
@import '@/assets/scss/variables.scss';
.py-price-input {
    font-size: 14px;
    .py-label {
        margin-bottom: 9px;
    }
    .py-input-inner {
        display: flex;
        align-items: center;
        justify-content: center;
        border: 1px solid #c9cccf;
        border-radius: 5px;
        padding: 5px 12px;
        /deep/ .el-input {
            width: calc(100% - 35px);
        }
        /deep/ .el-input__inner {
            border: none;
            height: 26px;
            line-height: 26px;
            background: transparent;
            padding: 0;
        }
        /deep/ .el-input.is-disabled .el-input__inner {
            background-color: #fff;
            cursor: not-allowed;
        }
        .py-symbol {
            font-size: 14px;
            color: #6d7175;
            display: inline-block;
            width: 35px;
        }
        i {
            font-size: 16px;
            color: #999999;
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
