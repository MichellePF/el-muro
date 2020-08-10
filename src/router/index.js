import Vue from 'vue';
import VueRouter from 'vue-router';

import Login from '@/components/Login.vue'
import Data from '@/components/Data.vue'
import NotFound from '@/components/NotFound.vue'

Vue.use(VueRouter);    // instalamos explícitamente el router
    
export default new VueRouter({
    routes: [
        {
            path: '/', 
            component: Data,
            name: 'data',
            props: true
        },
        
        {
            path: '/login', 
            component: Login,
            name: 'login',
            props: true
        },
        

        {
            path: '*', 
            component: NotFound,
        }
    ]
})