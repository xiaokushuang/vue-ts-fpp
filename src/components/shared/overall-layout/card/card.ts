import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class PyCard extends Vue {
    @Prop(String) title: string | undefined;
    // @Prop(String) return_button: string | undefined;
}
