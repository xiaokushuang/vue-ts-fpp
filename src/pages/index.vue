<template>
    <div class="py-main-body">
        <div class="py-main-header">
            <py-header />
        </div>
        <el-container class="py-main-container">
            <el-aside width="240px">
                <NavList />
            </el-aside>
            <el-main class="py-operation-body">
                <div class="py-operation-view">
                    <router-view />
                </div>
            </el-main>
        </el-container>
        <template>
            <el-backtop target=".el-main"></el-backtop>
        </template>
    </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
@Component
export default class Index extends Vue {}
</script>
<style lang="scss">
html,
body,
#app {
    padding: 0;
    margin: 0;
    height: 100%;
    min-width: 1100px;
    background-color: #f6f6f7;
}
.el-container {
    height: 100%;
    background: #f6f6f7;
}
.el-aside {
    position: absolute;
    top: 54px;
    left: 0;
    height: calc(100vh - 54px);
    overflow-x: hidden;
    overflow-y: auto;
    z-index: 10;
    background: #fff;
    border-right: 1px solid #dfe3e8;
    font-family: PingFangSC-Regular, Microsoft YaHei, Arial, Helvetica, sans-serif;
}
.el-main {
    margin-left: 240px;
}
.py-main-body {
    min-height: 100vh;
}
.py-main-header {
    background: #fff;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    height: 54px;
    z-index: 11;
    min-width: 960px;
    border-bottom: #ddddde 1px solid;
}
.py-main-container {
    max-height: 100vh;
    min-width: 1160px;
}
.py-operation-body {
    margin-top: 54px;
    padding-bottom: 20px;
}
.py-operation-view {
    width: 100%;
    margin: 0 auto;
    padding: 15px;
    box-sizing: border-box;
}
</style>
