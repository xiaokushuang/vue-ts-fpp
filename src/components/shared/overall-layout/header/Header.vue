<template>
    <div class="py-header-body"></div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class PyHeader extends Vue {}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style  lang="scss">
//
.py-header-body {
    padding-top: 12px;
    box-sizing: border-box;
}
</style>
