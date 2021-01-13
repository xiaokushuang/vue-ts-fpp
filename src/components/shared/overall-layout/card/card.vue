<template>
    <el-card shadow="never" class="py-margin">
        <header v-if="title || $slots.header" slot="header" class=" py-flex py-flex-middle ">
            <div v-if="title" class=" py-flex py-flex-middle py-flex-1">
               <h4 class="py-container-title">{{ title }}</h4>
            </div>
            <div v-if="$slots.header" class=" py-flex py-flex-middle py-flex-right">
                <slot name="header"></slot>
            </div>
        </header>

        <slot ></slot>

    </el-card>
</template>
<script src="./card.ts" lang="ts" ></script>
<style src="./card.scss" lang="scss"></style>


