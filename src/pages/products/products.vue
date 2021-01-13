<template>
    <py-main title="标题" class="width-expand">
        <template slot="header">
            <el-button type="text">导出</el-button>
            <el-button type="text">导入</el-button>
            <router-link :to="{ path:'/products/add' }">  
                <el-button type="primary">添加商品</el-button>
            </router-link>
        </template>

        <py-content sidebar>
            <py-card>
                从不显示
            </py-card>
        </py-content>
    </py-main>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
@Component
export default class Products extends Vue {}
</script>
