import Vue from 'vue';
import VueRouter from 'vue-router';
import firebase from 'firebase/app';

import Login from '@/components/Login.vue'
import Data from '@/components/Data.vue'
import NotFound from '@/components/NotFound.vue'

Vue.use(VueRouter);    // instalamos explícitamente el router
    
const router = new VueRouter({
    routes: [
        {
            path: '/', 
            component: Data,
            name: 'data',
            props: true,
            meta: {
                requiresAuth: true
            }
        },
        
        {
            path: '/login', 
            component: Login,
            name: 'login',
            props: true,
        },
        

        {
            path: '*', 
            component: NotFound,
        }
    ]
})

router.beforeEach((to, from, next) => {

    let currentUser = firebase.auth().currentUser;
    
    if (to.meta.requiresAuth && currentUser == null) {
      next('/login')
    } else {
      next()
    }
  })
  
  export default router;