<template>
    <div>
        <!-- <RecycleScroller  class="scroller" :items="list" item-height="40" content-tag="ul">
            <template slot-scope="props">
                <li :key="props.item.label">{{ props.item.label }}</li>
            </template>
        </RecycleScroller> -->
        <DynamicScroller :items="list" min-item-size="20" class="scroller">
            <template  slot-scope="props">
                <DynamicScrollerItem :item="props.item" :active="props.active" :size-dependencies="[props.item.message]" :data-index="props.index">
                    <div class="text" :index="props.index" :style="`height:100px`">{{ props.item.label }}</div>
                </DynamicScrollerItem>
            </template>
        </DynamicScroller>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import HelloWorld from '@/components/HelloWorld.vue'; // @ is an alias to /src

@Component
export default class PyExcel extends Vue {
    public list: any[] = [];
    private created(): void {
        for (let index = 0; index < 20000; index++) {
            this.list.push({
                id: index,
                label: 'Title' + index,
                size: 64
            });
        }
    }
}
</script>
<style lang="scss">
.scroller {
    height: 500px;
}

.user {
    height: 32%;
    padding: 0 12px;
    display: flex;
    align-items: center;
}
</style>
