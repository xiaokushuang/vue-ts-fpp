import VueRouter, { Route } from 'vue-router';

declare module '*.vue' {
    import Vue from 'vue';
    export default Vue;
}
declare module 'vue/types/vue' {
    interface Vue {
        _: any;
        $router: VueRouter;
        $route: Route;
    }
}
