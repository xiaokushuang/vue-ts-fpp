<template>
    <py-main title="标题" :back="{ name: 'products' }">
        <template slot="header">
            <el-button>默认按钮</el-button>
            <el-button>默认按钮</el-button>
            <el-button>默认按钮</el-button>
        </template>

        <py-content sidebar>
            <py-card>
                文本
            </py-card>

            <py-card title="标题">
                <template slot="header">
                    <el-link type="primary">主要链接</el-link>
                </template>

                文本文本
            </py-card>

            <template slot="sidebar">
                <py-card title="标题">
                    文本文本
                </py-card>
            </template>
        </py-content>

        <template slot="footer">
            <div>
                <el-button>操作按钮</el-button>
            </div>
            <div>
                <el-button>操作按钮</el-button>
            </div>
        </template>
    </py-main>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
@Component
export default class ProductDetails extends Vue {}
</script>
