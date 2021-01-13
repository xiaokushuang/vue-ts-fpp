<template>
    <div class="py-customize-table">
        <div v-if="multiple_selection.length > 0" class="py-control-table">
            <div class="py-control-checkbox">
                <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="onControlCheckbox"></el-checkbox>
                <div class="py-control-description">
                    已选中<span>{{ multiple_selection.length }}</span
                    ><span v-if="is_all">+</span>
                </div>
            </div>
            <el-button-group>
                <template v-for="item in config.table_control">
                    <el-dropdown v-if="'options' in item" :key="item.title" trigger="click">
                        <el-button size="small" class="py-control-dropdown-button">
                            {{ item.title }}
                        </el-button>
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item
                                @click.native="on_click(item_children.eventName || '')"
                                v-for="item_children in item.options || []"
                                :key="item_children.title"
                                >{{ item_children.title }}</el-dropdown-item
                            >
                        </el-dropdown-menu>
                    </el-dropdown>
                    <el-button v-else @click="on_click(item.eventName || '')" :key="item.title" size="small"> {{ item.title }} </el-button>
                </template>
            </el-button-group>
            <div class="py-table-description">
                <span v-if="is_all">
                    店铺中的所有该类型的条目均已选中。
                </span>
                <span v-else>
                    选中此页面列表中的所有条目。
                </span>
            </div>
            <el-link type="primary" @click="batchOperation">
                <span v-if="is_all">
                    撤销
                </span>
                <span v-else>
                    选中店铺中的所有该类型的条目
                </span>
            </el-link>
        </div>
        <el-table ref="multipleTable" :data="table_data" tooltip-effect="dark" style="width: 100%" @selection-change="tableCheckboxActive">
            <el-table-column fixed="left" type="selection" width="55"> </el-table-column>

            <el-table-column
                v-for="item in config.table_config"
                :key="item.data_key"
                :prop="item.data_key"
                :label="item.label"
                :width="item.width"
                :fixed="item.fixed"
            >
                <div v-if="'slot_name' in item" slot-scope="scope">
                    <slot :name="item.slot_name" :data="scope.row"></slot>
                </div>
                <div v-else slot-scope="scope">{{ scope.row[item.data_key] }}</div>
            </el-table-column>
        </el-table>
        <div class="py-table-page">
            <el-pagination
                background
                @size-change="onSizeChange"
                @current-change="onCurrentChange"
                :current-page="table_page.page_count"
                :page-sizes="[10, 20, 40, 50]"
                :page-size="table_page.page_size"
                :total="table_page.total"
                layout=" prev, pager, next, total, sizes"
            >
            </el-pagination>
        </div>
    </div>
</template>

<script lang="ts">
import { Table } from 'element-ui';
import { Component, Prop, Vue, Watch, Emit, Ref } from 'vue-property-decorator';
import { config, page } from './interface';
@Component({})
export default class PyTable extends Vue {
    @Prop({
        type: Array,
        default: () => {
            return [];
        }
    })
    table_data!: any[];
    @Prop({
        type: Object,
        default: (): config => {
            return {
                table_config: [],
                table_control: []
            };
        }
    })
    config!: config;
    @Prop({
        type: Object,
        default: (): page => {
            return {
                page_count: 1,
                page_size: 10,
                total: 10
            };
        }
    })
    table_page!: page;

    @Ref() readonly multipleTable!: Table;

    @Emit('on_click')
    private on_click(event: string) {
        if (event != '') {
            return {
                event: event,
                multiple_selection: this.multiple_selection,
                not_selected: this.not_selected,
                is_all: this.is_all
            };
        }
    }
    @Emit('on_page')
    private on_page() {
        return {};
    }

    public multiple_selection: any[] = []; //多选框选中情况
    public not_selected: any[] = []; //没有选中的对象
    public is_all: boolean = false; //是否选中数据库中的全部

    public isIndeterminate: boolean = false; //多选框是否部分选中
    public checkAll: boolean = false; //多选框是否全部选中

    @Watch('multiple_selection', { immediate: true, deep: true })
    onMultipleSelection(newVal: object[]) {
        if (newVal.length < this.table_data.length && newVal.length != 0) {
            this.isIndeterminate = true;
        } else {
            this.isIndeterminate = false;
        }
        if (newVal.length === this.table_data.length) {
            this.checkAll = true;
        } else {
            this.checkAll = false;
        }
    }
    private tableCheckboxActive(val: object[]): void {
        this.not_selected = this._.differenceWith(this.table_data, val, this._.isEqual);
        this.multiple_selection = val;
    }
    private onControlCheckbox(val: boolean): void {
        // this.multiple_selection = val;
        if (val && !this.isIndeterminate) {
            this.multiple_selection = this.table_data;
            this.toggleSelection(this.table_data);
        } else {
            this.multiple_selection = [];
            this.toggleSelection([]);
        }
    }
    private toggleSelection(options: object[]): void {
        if (options.length > 0) {
            options.forEach(option => {
                this.multipleTable.toggleRowSelection(option);
            });
        } else {
            this.is_all = false;
            this.multipleTable.clearSelection();
        }
    }
    private batchOperation(): void {
        this.is_all = !this.is_all;
    }
    private onSizeChange(val: number): void {
        this.table_page.page_size = val;
    }
    private onCurrentChange(val: number): void {
        this.table_page.page_count = val;
    }
}
</script>
<style lang="scss">
.py-customize-table {
    position: relative;
    .el-table th > .cell {
        padding-left: 14px;
        padding-right: 14px;
    }
    .py-control-table {
        position: absolute;
        width: calc(100%);
        height: 46px;
        top: 0;
        right: 0;
        z-index: 4;
        background-color: white;
        display: flex;
        align-items: center;
        .py-control-checkbox {
            padding: 0 14px;
            min-width: 24px;
            height: 28px;
            display: flex;
            align-items: center;
        }
        .py-control-description {
            margin-left: 36px;
            font-size: 14px;
            color: #606266;
        }
        .py-control-dropdown-button {
            border: 1px solid #dcdfe6;
        }
        .py-table-description {
            margin-left: 24px;
            font-size: 14px;
            color: #606266;
        }
    }
    .py-table-page {
        margin-top: 20px;
        .el-pagination {
            text-align: right;
        }
    }
}
</style>
