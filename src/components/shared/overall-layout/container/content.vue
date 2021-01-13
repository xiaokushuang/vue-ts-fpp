<template>
    <div v-if="$slots.sidebar">
        <el-row :gutter="24">
            <el-col :span="16">
                <slot ></slot>
            </el-col>
            <el-col :span="8">
                <slot name="sidebar" ></slot>
            </el-col>
        </el-row>
    </div>
    <div v-else>
        <slot ></slot>
    </div>
</template>
<script src="./content.ts" lang="ts" ></script>
