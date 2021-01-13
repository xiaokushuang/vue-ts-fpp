<template>
    <div class="warp left-nav-class">
        <el-menu :default-active="$route.path" :router="true" style="height: 100%;">
            <div v-for="(item, index) in nav_list" :key="index">
                <el-submenu :index="item.path" v-if="item.has_children">
                    <template slot="title">
                        <i :class="item.icon"></i>
                        <span>{{ item.nav_name }}</span>
                    </template>
                    <el-menu-item-group>
                        <el-menu-item v-for="(items, k) in item.has_children" :key="index + '-' + k" :index="items.path"
                            >{{ items.nav_name }}
                        </el-menu-item>
                    </el-menu-item-group>
                </el-submenu>
                <el-menu-item v-else :index="item.path">
                    <i :class="item.icon"></i>
                    <span>{{ item.nav_name }}</span>
                </el-menu-item>
            </div>
        </el-menu>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
interface nav_children {
    nav_name: string;
    path: string;
    jurisdiction: boolean;
}
interface Nav {
    nav_name: string;
    path: string;
    jurisdiction: boolean;
    icon: string;
    has_children?: Array<nav_children>;
}
@Component({})
export default class NavList extends Vue {
    public nav_list: Array<Nav> = [
        {
            nav_name: 'home',
            path: '/',
            jurisdiction: true,
            icon: 'el-icon-s-home'
        }, {
            nav_name: 'Products',
            path: '/products',
            jurisdiction: true,
            icon: 'el-icon-s-home',
            has_children: [{
                nav_name: 'All Products',
                path: '/products',
                jurisdiction: true
            }]
        }, {
            nav_name: 'Orders',
            jurisdiction: true,
            icon: 'el-icon-s-goods',
            path: '/Orders',
            has_children: [
                {
                    nav_name: 'Orders',
                    path: '/Drafts',
                    jurisdiction: true
                },
                {
                    nav_name: 'Drafts',
                    path: '/Drafts',
                    jurisdiction: true
                },
                {
                    nav_name: 'Abandoned checkouts',
                    path: '/Abandoned',
                    jurisdiction: true
                }
            ]
        }
    ];
}
</script>
