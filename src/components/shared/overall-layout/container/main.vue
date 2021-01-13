<template>
    <main class="py-container">
        <header class="py-container-header py-flex py-flex-middle py-margin-large-bottom">
            <div class="py-header-left py-flex py-flex-middle py-flex-1">
                <el-button
                    v-if="back"
                    @click="back_click"
                    class="py-margin-right"
                    icon="el-icon-arrow-left"
                    size="medium"
                ></el-button>
                <h1 v-if="title" class="py-container-title">{{ title }}</h1>
            </div>
            <div class="py-header-right py-flex py-flex-middle py-flex-right">
                <slot name="header"></slot>
            </div>
        </header>

        <slot></slot>

        <footer v-if="$slots.footer" class="py-container-footer py-flex py-flex-middle py-flex-between py-margin-top ">
            <slot name="footer"></slot>
        </footer>
    </main>
</template>
<script src="./main.ts" lang="ts"></script>
<style src="./main.scss" lang="scss"></style>
