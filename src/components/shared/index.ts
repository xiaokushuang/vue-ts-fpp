import Vue from 'vue';
import * as _ from 'lodash';
import PyMain from './overall-layout/container/main.vue';
import PyContent from './overall-layout/container/content.vue';
import PyCard from './overall-layout/card/card.vue';
import PyHeader from './overall-layout/header/Header.vue';
import NavList from './overall-layout/nav-list/NavList.vue';

const components = [PyMain, PyContent, PyCard, PyHeader, NavList];

const py_components = {
    install(Vue: any, options = {}) {
        _.forEach(components, component => {
            Vue.component(component.name, component);
        });
    }
};

export default py_components;
