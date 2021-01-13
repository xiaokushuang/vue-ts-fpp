<template>
    <div class="py-filtering">
        <div class="py-flex py-flex-middle py-flex-left py-filtering-search">
            <el-input class="py-flex-1" size="small" title="请输入内容" prefix-icon="el-icon-search" v-model="search.content" />
            <div class="py-button-group" v-if="search.condition && search.condition.length > 0">
                <template v-for="(item, index) in search.condition"
                    ><el-dropdown
                        class="py-dropdown"
                        v-if="index < 3"
                        size="small"
                        trigger="click"
                        :key="index"
                        :class="{ 'hidden-md-and-down': index === 2 || index === 1 }"
                    >
                        <div class="py-dropdown-content">{{ item.title }}<i class="el-icon-arrow-down el-icon--right"></i></div>
                        <el-dropdown-menu slot="dropdown">
                            <div v-if="item.type === 'input'">
                                <div class="py-dropdown-slot-box py-flex py-flex-top py-flex-column">
                                    <el-input size="small" title="请输入内容" v-model="item.value" />
                                    <el-link @click="clearValue(index)" type="primary">清除</el-link>
                                </div>
                            </div>
                            <div v-else-if="item.type === 'radio'">
                                <div class="py-dropdown-slot-box py-flex py-flex-top py-flex-column">
                                    <template v-for="option in item.options || []">
                                        <el-radio v-model="item.value" :key="option.value" :label="option.value">{{
                                            option.label || option.value
                                        }}</el-radio>
                                    </template>
                                    <el-link @click="clearValue(index)" type="primary">清除</el-link>
                                </div>
                            </div>
                            <div v-else-if="item.type === 'checkbox'">
                                <div class="py-dropdown-slot-box py-flex py-flex-top py-flex-column">
                                    <el-checkbox-group class="py-flex py-flex-column" v-model="item.value">
                                        <template v-for="option in item.options || []">
                                            <el-checkbox :key="option.value" :label="option.value">{{
                                                option.label || option.value
                                            }}</el-checkbox>
                                        </template>
                                    </el-checkbox-group>
                                    <el-link @click="clearValue(index)" type="primary">清除</el-link>
                                </div>
                            </div>
                        </el-dropdown-menu>
                    </el-dropdown>
                </template>
                <div class="py-dropdown">
                    <div class="py-dropdown-content" @click="drawer = true">更多筛选器</div>
                    <el-drawer :modal="false" title="筛选器" :visible.sync="drawer" :with-header="false" size="20%">
                        <div class="py-filtering-drawer">
                            <div class="title py-flex py-flex-between py-flex-middle">
                                <span>更多筛选器</span>
                                <i class="el-icon-close" @click="drawer = false"></i>
                            </div>
                            <el-collapse v-model="active_collapse">
                                <template v-for="(item, index) in search.condition">
                                    <el-collapse-item :title="item.title" :name="index" :key="index">
                                        <div v-if="item.type === 'input'">
                                            <div class="py-dropdown-slot-box py-flex py-flex-top py-flex-column">
                                                <el-input size="small" title="请输入内容" v-model="item.value" />
                                                <el-link @click="clearValue(index)" type="primary">清除</el-link>
                                            </div>
                                        </div>
                                        <div v-else-if="item.type === 'radio'">
                                            <div class="py-dropdown-slot-box py-flex py-flex-top py-flex-column">
                                                <template v-for="option in item.options || []">
                                                    <el-radio v-model="item.value" :key="option.value" :label="option.value">{{
                                                        option.label || option.value
                                                    }}</el-radio>
                                                </template>
                                                <el-link @click="clearValue(index)" type="primary">清除</el-link>
                                            </div>
                                        </div>
                                        <div v-else-if="item.type === 'checkbox'">
                                            <div class="py-dropdown-slot-box py-flex py-flex-top py-flex-column">
                                                <el-checkbox-group class="py-flex py-flex-column" v-model="item.value">
                                                    <template v-for="option in item.options || []">
                                                        <el-checkbox :key="option.value" :label="option.value">{{
                                                            option.label || option.value
                                                        }}</el-checkbox>
                                                    </template>
                                                </el-checkbox-group>
                                                <el-link @click="clearValue(index)" type="primary">清除</el-link>
                                            </div>
                                        </div>
                                    </el-collapse-item>
                                </template>
                            </el-collapse>
                        </div>
                        <div class="py-filtering-footer">
                            <div class="py-flex py-flex-between py-filtering-footer-control">
                                <el-button @click="clearAllValue">清除所有筛选条件</el-button>
                                <el-button type="success" @click="drawer = false">完成</el-button>
                            </div>
                        </div>
                    </el-drawer>
                </div>
            </div>
            <el-dropdown trigger="click" v-if="search.sort && search.sort.length > 0">
                <span class="el-dropdown-link">
                    <div class="py-dropdown-content">排序<i class="el-icon-arrow-down el-icon--right"></i></div>
                </span>
                <el-dropdown-menu slot="dropdown">
                    <div class="py-dropdown-slot-box py-flex py-flex-top py-flex-column">
                        <el-radio
                            v-for="(item, index) in search.sort"
                            :key="index + item.eventName"
                            v-model="search.sort_Type"
                            :label="item.eventName"
                            >{{ item.label || item.eventName }}</el-radio
                        >
                    </div>
                </el-dropdown-menu>
            </el-dropdown>
        </div>
        <div class="py-flex py-flex-left py-flex-wrap py-filtering-tag">
            <template v-for="(item, index) in tag_label || []">
                <el-tag v-show="item !== ''" :key="index" closable type="info" @close="clearValue(index)">
                    {{ item }}
                </el-tag>
            </template>
        </div>
    </div>
</template>

<script lang="ts">
import { forIn } from 'lodash';
import { search } from './interface';
import { Component, Prop, Vue, Watch, Emit } from 'vue-property-decorator';
@Component({})
export default class pyFiltering extends Vue {
    @Prop({
        type: Object,
        default: (): search => {
            return {
                content: '', //搜索-value
                sort_Type: '', //排序-value
                condition: [],
                sort: []
            };
        }
    })
    value!: search;
    get tag_label(): any {
        return this._.map(this.search.condition, (item, key) => {
            if (item.value !== '' && item.value.length > 0) {
                if (this._.isString(item.value)) {
                    if (item.type === 'input') {
                        return item.value;
                    } else {
                        let data = this._.find(item.options, option => {
                            return option.value == item.value;
                        });
                        return data?.label || data?.value || '';
                    }
                }
                if (this._.isArray(item.value)) {
                    let data = this._.map(item.value, value => {
                        return this._.find(item.options, option => {
                            return option.value == value;
                        });
                    });
                    return this._.map(data, key => {
                        if (key?.label) {
                            return key.label;
                        } else {
                            return key?.value;
                        }
                    }).join(',');
                }
            }
            return '';
        });
    }
    public search: search = this.value;
    @Watch('search', { immediate: true, deep: true })
    onSearch(newVal: search) {
        this.input(newVal);
    }
    @Emit('input')
    private input(value: search) {
        return value;
    }
    public drawer: boolean = false;
    public active_collapse: number[] = [0];
    private clearValue(index: number): void {
        let condition = this.search.condition || [];
        if (this._.isArray(condition[index].value)) {
            condition[index].value = [];
        } else if (this._.isString(condition[index].value)) {
            condition[index].value = '';
        }
    }
    private clearAllValue(): void {
        this._.forEach(this.search.condition, (value, key) => {
            this.clearValue(<any>key);
        });
    }
}
</script>
<style lang="scss">
.py-filtering {
    padding: 16px;
}
.py-filtering-search {
    height: 40px;
    & > * {
        margin-right: 10px;
    }
    .py-dropdown-content {
        display: inline-block;
        color: #606266;
        font-size: 14px;
        height: 30px;
        padding: 0 15px;
        line-height: 30px;
        border: 1px solid #dcdfe6;
        border-radius: 4px;
        cursor: pointer;
    }
    & > .py-button-group {
        .el-drawer__body {
            padding: 0 10px;
            position: relative;
        }
        .py-dropdown {
            display: inline-block;
            height: 32px;
        }
        .py-dropdown:nth-last-child(2):first-child {
            .py-dropdown-content {
                border-radius: 4px 0 0 4px;
                border-right: 0px;
            }
        }
        .py-dropdown:nth-last-child(2):first-child ~ .py-dropdown:nth-last-child(1) {
            .py-dropdown-content {
                border-radius: 0 4px 4px 0;
            }
        }
        .py-dropdown:nth-last-child(3):first-child {
            .py-dropdown-content {
                border-radius: 4px 0 0 4px;
                border-right: 0px;
            }
        }
        .py-dropdown:nth-last-child(3):first-child ~ .py-dropdown:nth-last-child(2) {
            .py-dropdown-content {
                border-radius: 0;
                border-right: 0px;
            }
        }
        .py-dropdown:nth-last-child(3):first-child ~ .py-dropdown:nth-last-child(1) {
            .py-dropdown-content {
                border-radius: 0 4px 4px 0;
            }
        }
        .py-dropdown:nth-last-child(4):first-child {
            .py-dropdown-content {
                border-radius: 4px 0 0 4px;
                border-right: 0px;
            }
        }
        .py-dropdown:nth-last-child(4):first-child ~ .py-dropdown:nth-last-child(3) {
            .py-dropdown-content {
                border-radius: 0;
                border-right: 0px;
            }
        }
        .py-dropdown:nth-last-child(4):first-child ~ .py-dropdown:nth-last-child(2) {
            .py-dropdown-content {
                border-right: 0px;
                border-radius: 0;
            }
        }
        .py-dropdown:nth-last-child(4):first-child ~ .py-dropdown:nth-last-child(1) {
            .py-dropdown-content {
                border-radius: 0 4px 4px 0;
            }
        }
    }
    .py-filtering-drawer {
        .title {
            font-size: 20px;
            padding: 20px 0 20px;
            i {
                cursor: pointer;
            }
        }
    }
    .py-filtering-footer {
        height: 68px;
        .py-filtering-footer-control {
            border-top: 0.1rem solid #dfe3e8;
            position: absolute;
            bottom: 0;
            left: 0;
            right: 0;
            padding: 14px 20px;
            height: 40px;
        }
    }
}
.py-filtering-tag {
    transition: height 0.5s;
    & > * {
        margin-top: 10px;
        margin-right: 10px;
    }
}
.py-dropdown-slot-box {
    min-width: 150px;
    padding: 0 6px;
    .el-radio,
    .el-input {
        margin: 6px 0;
    }
    .el-input {
        width: 150px;
    }
    .el-link {
        margin-top: 6px;
    }
}
</style>
