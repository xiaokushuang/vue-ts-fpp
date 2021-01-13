import { RouteConfig } from 'vue-router';

export const products: RouteConfig[] = [
    {
        path: 'products',
        name: 'products',
        component: () => import('../pages/products/products.vue')
    },
    {
        path: 'product/:id',
        component: () => import('../pages/products/product-details.vue')
    },{
        path: 'products/add',
        component: () => import('../pages/products/add-product.vue')
    },
    {
        path: 'themes',
        component: () => import('../pages/Themes/index.vue')
    }
];
