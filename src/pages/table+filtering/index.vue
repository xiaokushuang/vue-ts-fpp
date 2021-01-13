<template>
    <div class="py-main-body">
        <pyFiltering v-model="source_search"></pyFiltering>
        <pyTable :table_data="table_data" :config="table_config" :table_page="page" @on_click="test">
            <template slot="test" slot-scope="scope">
                <el-button type="primary">{{ scope.data.name }}</el-button>
            </template>
            <template slot="ssr" slot-scope="scope">
                {{ scope.data.address }}
            </template>
        </pyTable>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import pyFiltering from '@/components/shared/py-data-filtering/py-filtering.vue';
import { search } from '@/components/shared/py-data-filtering/interface';
import pyTable from '@/components/shared/py-table/py-table.vue';
import { config, page } from '@/components/shared/py-table/interface';
@Component({
    components: {
        pyTable,
        pyFiltering
    }
})
export default class test extends Vue {
    /**
     * test
     */
    public source_search: search = {
        content: '',
        sort_Type: '',
        sort: [
            {
                label: '按照时间排序',
                eventName: 'onTime'
            },
            {
                label: '按照时间排序2',
                eventName: 'onTime2'
            },
        ],
        condition: [
            {
                title: '产品供应商',
                value: '',
                type: 'radio',
                options: [
                    {
                        label: '康师傅红烧牛肉面',
                        value: 'ksf'
                    },
                    {
                        label: '今麦郎葱香排骨面',
                        value: 'jml'
                    },
                    {
                        label: '五谷道场酸笋肥牛面',
                        value: 'wdc'
                    },
                    {
                        label: '汤达人豚骨拉面',
                        value: 'tdr'
                    },
                ]
            },
            {
                title: '标签',
                value: '',
                type: 'input',
            },
            {
                title: '状态',
                value: [],
                type: 'checkbox',
                options: [
                    {
                        label: '有货',
                        value: '1'
                    },
                    {
                        value: '无货'
                    }
                ]
            }
        ]
    };
    public table_data: Array<any> = [
        {
            date: '2016-05-03',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1518 弄',
            phone: '12339393939393993'
        },
        {
            date: '2016-05-02',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1518 弄',
            phone: '12339393939393993'
        },
        {
            date: '2016-05-04',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1518 弄',
            phone: '12339393939393993'
        },
        {
            date: '2016-05-01',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1518 弄',
            phone: '12339393939393993'
        },
        {
            date: '2016-05-08',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1518 弄',
            phone: '12339393939393993'
        },
        {
            date: '2016-05-06',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1518 弄',
            phone: '12339393939393993'
        },
        {
            date: '2016-05-07',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1518 弄',
            phone: '12339393939393993'
        }
    ];
    public table_config: config = {
        table_config: [
            {
                label: '日期',
                data_key: 'date',
                width: '100'
            },
            {
                label: '名称',
                data_key: 'name',

                width: '300',
                slot_name: 'test'
            },
            {
                label: '手机',
                data_key: 'phone',

                width: '300'
            },
            {
                label: '地址',
                data_key: 'address',

                width: '200',
                slot_name: 'ssr',
                fixed: 'right'
            }
        ],
        table_control: [
            {
                title: '编辑产品',
                eventName: 'Edit'
            },
            {
                title: '其他操作',
                options: [
                    {
                        title: '设置为xx',
                        eventName: 'xxx'
                    },
                    {
                        title: '设置为1',
                        eventName: 'xxx'
                    },
                    {
                        title: '设置为2',
                        eventName: 'xxx'
                    },
                    {
                        title: '设置为3',
                        eventName: 'xxx'
                    }
                ]
            }
        ]
    };
    public page: page = {
        page_count: 1,
        page_size: 10,
        total: 100
    };
    public test(cel: string) {
        console.log(cel);
    }
}
</script>
