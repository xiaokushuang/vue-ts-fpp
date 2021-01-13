<template>
    <div class="py-multiple-attribute">
        <!-- 选项 -->
        <section class="py-section">
            <p class="py-font-weight">选项</p>
            <div v-for="(data, index) in select_list" :key="data.id" class="py-flex pf-select-block">
                <div class="py-select-left py-margin-right">
                    <div class="py-margin-small-bottom py-font-weight py-select-title">选项{{ index + 1 }}</div>
                    <py-select-input v-model="data.select_val" placeholder="大小"> </py-select-input>
                </div>
                <div class="py-select-right">
                    <div class="py-del py-margin-small-bottom">
                        <span @click="handleDel(data)" class="py-del-span" :class="select_list.length > 1 ? '' : 'py-visibility'"
                            >删除</span
                        >
                    </div>
                    <py-tag-input v-model="data.tag_input_model" @sendTagList="data.tag_list = $event;getPreviewData()"> </py-tag-input>
                </div>
            </div>
            <div>
                <el-button v-if="select_list.length < 3" @click="handleAdd()">添加其他选项</el-button>
            </div>
        </section>
        <!-- 预览 -->
        <section class="py-section">
            <p class="py-font-weight">预览</p>
            <div class="py-table">
                <div class="py-tr">
                    <div v-for="data in multiple_prop_header" :key="data" class="py-td">
                        <div :class="data === '数量' || data === '条码' || data === '操作' ? 'w92' : 'w140'">
                            {{ data }}
                        </div>
                    </div>
                </div>
                <div class="py-tr" v-for="(data, index) in multiple_prop_list" :key="data.useList.multipleProps">
                    <div class="py-td">
                        <div class="w140">
                            {{ data.useList.multipleProps }}
                        </div>
                    </div>
                    <div class="py-td" :class="data.delList.length === 0 ? '' : 'py-visibility'">
                        <py-price-input
                            class="w140"
                            v-model="data.useList.price"
                            placeholder="0.00"
                            currency_symbol="NT$"
                            :decimal_point="true"
                            :decimal_num="2"
                            :disabled="false"
                        >
                        </py-price-input>
                    </div>
                    <div class="py-td" :class="data.delList.length === 0 ? '' : 'py-visibility'">
                        <el-input-number class="w92" v-model="data.useList.num" controls-position="right"></el-input-number>
                    </div>
                    <div class="py-td" :class="data.delList.length === 0 ? '' : 'py-visibility'">
                        <el-input class="w140" v-model="data.useList.sku"></el-input>
                    </div>
                    <div class="py-td" :class="data.delList.length === 0 ? '' : 'py-visibility'">
                        <el-input class="w92" v-model="data.useList.barcode"></el-input>
                    </div>
                    <div class="py-td" :class="data.delList.length === 0 ? '' : 'py-visibility'">
                        <el-button class="w92 py-text-align-left" @click="handleClickDel(data, index)" type="text" size="small">
                            <i class="el-icon-delete "></i>
                        </el-button>
                    </div>
                    <div v-if="data.delList.length !== 0">
                        <div class="py-undo-block">
                            <span>将不会创建此多属性</span>
                            <span @click="handleClickUndo(data, index)" class="py-undo-span">撤销</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import pySelectInput from '@/components/shared/form/select-input/index.vue';
import pyTagInput from '@/components/shared/form/tag-input/index.vue';
import pyPriceInput from '@/components/shared/form/price-input/index.vue';

@Component({
    components: {
        pySelectInput,
        pyTagInput,
        pyPriceInput,
    }
})
export default class PyMultipleAttribute extends Vue {
    private select_input_model: string = '';
    private tag_input_model: string = '';
    private select_list: any[] = [
        {
            id: new Date().getTime() + 1,
            select_val: '',
            tag_input_model: '',
            tag_list: []
        }
    ];
    multiple_prop_header: any[] = ['多属性', '价格', '数量', 'SKU', '条码', '操作'];
    multiple_prop_list: any[] = [
        // {
        //     useList: [
        //         {
        //             multipleProps: '11',
        //             price: '',
        //             num: 0,
        //             sku: '',
        //             barcode: ''
        //         }
        //     ],
        //     delList: []
        // },
        // {
        //     useList: [
        //         {
        //             multipleProps: '22',
        //             price: '',
        //             num: 0,
        //             sku: '',
        //             barcode: ''
        //         }
        //     ],
        //     delList: []
        // },
        // {
        //     useList: [
        //         {
        //             multipleProps: '33',
        //             price: '',
        //             num: 0,
        //             sku: '',
        //             barcode: ''
        //         }
        //     ],
        //     delList: []
        // }
    ];
    getPreviewData(){
      let tagArr = []
      for(let i = 0;i<this.select_list.length;i++){
          tagArr.push(this.select_list[i].tag_list)
      }
      console.log('tagArr',tagArr)
      //数组排列组合处理
      let propArr = this.permuteAndCombine(tagArr)
      let newPropArr1 = propArr.map((item:any) => ({multipleProps:item,price:'',num:0,sku:'',barcode:''}))
      let newPropArr2 = newPropArr1.map((item:any) => ({useList:item,delList: []}))
      this.multiple_prop_list = newPropArr2
      console.log('multiple_prop_list',newPropArr2);
      
    }
    private handleDel(val: any) {
        let index = this.select_list.findIndex((item:any) => {
            if (item.id === val.id) {
                return true;
            }
        });
        this.select_list.splice(index, 1);
        this.getPreviewData()
    }
    handleClickDel(row: any, index: number) {
        this.multiple_prop_list[index].delList.push(this.multiple_prop_list[index].useList);
    }
    handleClickUndo(row: any, index: number) {
        this.multiple_prop_list[index].delList.length = 0;
        this.$forceUpdate();
    }
    private handleAdd() {
        this.select_list.push({
            id: new Date().getTime() + 2,
            select_val: '',
            tag_input_model: '',
            tag_list: []
        });
    }
    permuteAndCombine(tagArr:any):any{
        let sarr = [[]];
      for (let i = 0; i < tagArr.length; i++) {
          let tarr = [];
          for (let j = 0; j < sarr.length; j++)
              for (let k = 0; k < tagArr[i].length; k++)
                  tarr.push(sarr[j].concat(tagArr[i][k]));
                  sarr = tarr;
      }
     
      return sarr.join('@').replace(/,/g, '/').split('@')
    }
    
}
</script>

<style lang="scss" scope>
@import '@/assets/scss/variables.scss';
.w140 {
    width: 140px !important;
}
.w92 {
    width: 92px !important;
}
.py-visibility {
    visibility: hidden;
}
.py-font-weight {
    font-weight: bold;
}
.el-icon-delete {
    font-size: 20px;
}
.py-multiple-attribute {
    width: 600px;
    font-size: 14px;
    /deep/ .el-input-number {
        width: 100%;
    }
    .py-section {
        border-bottom: 1px solid #c9cccf;
        padding-bottom: 20px;
        padding-top: 20px;
    }
    .pf-select-block {
        padding-bottom: 10px;
        margin-bottom: 10px;
        border-bottom: 1px solid #c9cccf;
    }
    .pf-select-block:nth-of-type(3) {
        border: none;
    }
    .py-select-left {
        width: 150px;
    }
    .py-select-right {
        width: 400px;
        .py-del {
            text-align: right;
            color: $--color-primary;
        }
        .py-del-span:hover {
            text-decoration: underline;
            cursor: pointer;
        }
    }

    .py-table {
        overflow: auto;
        .py-undo-block {
            position: absolute;
            right: 98px;
            top: 20px;
            .py-undo-span {
                color: $--color-primary;
            }
            .py-undo-span:hover {
                text-decoration: underline;
                cursor: pointer;
            }
        }
        .py-tr {
            position: relative;
            display: flex;
            width: fit-content;
            border-bottom: 1px solid #c9cccf;
            .py-td {
                padding: 10px 10px;
                position: relative;
                vertical-align: middle;
                word-break: break-all;
            }
        }
    }
}
</style>
