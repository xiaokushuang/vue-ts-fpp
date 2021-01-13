import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';
import * as _ from 'lodash';
import { products } from './products';

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
    {
        path: '/',
        name: 'index',
        component: () => import('../pages/index.vue'),
        children: _.concat(products)
    },
    {
        path: "/excel",
        component: () => import("../pages/excel/index.vue")
    },
    {
        path: "/tinymceDemo",
        name: "tinymceDemo",
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "about" */ "../pages/msDemo/pyTinymceDemo/index.vue")
    },
    {
        path: "/priceInputDemo",
        name: "priceInputDemo",
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "about" */ "../pages/msDemo/pyPriceInputDemo/index.vue")
    },
    {
        path: "/editNumInputDemo",
        name: "editNumInputDemo",
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "about" */ "../pages/msDemo/pyEditNumInputDemo/index.vue")
    },
    {
        path: "/tagInputDemo",
        name: "tagInputDemo",
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "about" */ "../pages/msDemo/pyTagInputDemo/index.vue")
    },
    {
        path: "/selectInputDemo",
        name: "selectInputDemo",
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "about" */ "../pages/msDemo/pySelectInputDemo/index.vue")
    },
    {
        path: "/multipleAttribute",
        name: "multipleAttribute",
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "about" */ "../components/shared/pageComponent/multiple-attribute/index.vue")
    }
];

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
});

export default router;
