<template>
    <div style="width:300px">
        <span>{{ old_num_val }}</span>
        <span v-if="new_num_val && old_num_val !== new_num_val">>>{{ new_num_val }}</span>
        <py-edit-num-input
            v-model="num_input_model"
            :old_num_val="old_num_val"
            :sucess_flag="sucess_flag"
            @handleNewVal="handleNewVal"
            @handleSubmit="handleSubmit"
        >
        </py-edit-num-input>
    </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import pyEditNumInput from '@/components/shared/form/edit-num-input/index.vue';
@Component({
    components: {
        pyEditNumInput
    }
})
export default class Home extends Vue {
    private num_input_model: number = 20;
    private old_num_val: number = 10;
    private new_num_val: any = ''; //注意，这里这样写才不报错，要是定义成number类型，而且不赋初始值，就会报错
    private sucess_flag: boolean = false;
    private handleNewVal(val: number): void {
        this.new_num_val = val;
        this.$forceUpdate();
    }
    private handleSubmit(val: number): void {
        //调用接口
        this.sucess_flag = true;
        setTimeout(() => {
            this.sucess_flag = false;
        }, 1000);
    }
}
</script>

<style lang="scss" scope></style>
