<template>
    <div class="py-select-input">
        <el-autocomplete
            popper-class="py-autocomplete"
            v-model="input_val"
            :fetch-suggestions="querySearch"
            :placeholder="placeholder"
            @select="handleSelect"
        >
            <template slot-scope="{ item }">
                <div class="name">{{ item.value }}</div>
            </template>
        </el-autocomplete>
    </div>
</template>

<script lang="ts">
import { Component, Vue, Emit, Prop, Watch } from 'vue-property-decorator';
@Component
export default class PySelectInput extends Vue {
    @Prop(String) private value: string | undefined; //v-model封装需要的地方1
    @Prop(String) private placeholder: string | undefined; //placeholder
    @Prop({
        default: () => {
            return [{ value: '大小' }, { value: '颜色' }, { value: '材料' }, { value: '样式' }, { value: '标题' }];
        }
    })
    private select_list: any[]; //下拉内容数组
    public input_val: string | undefined = this.value; //input 绑定值  v-model封装需要的地方2
    //v-model封装需要的地方3
    @Watch('input_val',{deep:true})
    private inputVal(newVal: string, oldVal: string) {
        this.input(newVal);
    }
    //v-model封装需要的地方4
    @Emit('input')
    private input(val: string): string {
        return val;
    }
    querySearch(queryString: any, cb: any) {
        var select_list = this.select_list;
        var results = queryString ? select_list.filter(this.createFilter(queryString)) : select_list;
        // 调用 callback 返回建议列表的数据
        cb(results);
    }
    createFilter(queryString: any) {
        return (res:any) => {
            return res.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0;
        };
    }
    handleSelect(item: any) {
        // console.log(item);
    }
    handleIconClick(ev: any) {
        // console.log(ev);
    }
}
</script>

<style lang="scss" scope>
@import '@/assets/scss/variables.scss';
.py-select-input {
    font-size: 14px;
    .py-autocomplete {
    li {
        line-height: normal;
        padding: 7px;
        .name {
            text-overflow: ellipsis;
            overflow: hidden;
        }
    }
}
}
</style>
