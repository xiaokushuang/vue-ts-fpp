import { RawLocation } from 'vue-router';
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class PyMain extends Vue {
    @Prop() title: string | undefined;
    @Prop() back: RawLocation | undefined;

    public back_click() {
        if (this.back) {
            this.$router.push(this.back);
        }
    }
}
