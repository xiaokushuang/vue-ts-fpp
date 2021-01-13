<template>
  <vuedraggable
    :element="element"
    v-model="list"
    :options="options"
  >
   <slot></slot>
  </vuedraggable>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import vuedraggable from 'vuedraggable';

@Component({
  // name: "PYDraggable",
  components: {
    vuedraggable
  }
})
export default class PYDraggable extends Vue {
  @Prop() private element!: string;
  @Prop() private list!: object[];
  @Prop() private options!: object;
}
</script>

<style lang='scss' scoped>

</style>