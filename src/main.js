import Vue from 'vue'
import Vuex from 'vuex'

import firebase from 'firebase/app';
import 'firebase/auth';
import './firebase.js'

import VueFirestore from 'vue-firestore';
import App from './App.vue'
import router from './router'

Vue.config.productionTip = false

Vue.use(Vuex);
Vue.use(VueFirestore, {key: 'id'});   

const store = new Vuex.Store({
  state: {
    user: null,
    error: null
  },
  mutations: {
    set_user(state, new_user){
      state.user = new_user;
    },
    set_error(state, new_error){
      state.error = new_error;
    }
  },
  actions: {
    register(context, datos) {
      firebase.auth().createUserWithEmailAndPassword(datos.email, datos.password)
      // en el caso de que el registro sea exitoso
      .then(function (response) {
        console.log(response);
        context.commit('set_error', null);
        context.commit('set_user', datos.email);
        router.push('/');
      })
      // en el caso de que ocurra un error
      .catch(function (error) {
        context.commit('set_error', error.message);
        context.commit('set_user', null);
      });
    },
    login(context, datos){
      firebase.auth().signInWithEmailAndPassword(datos.email, datos.password)
      .then(function(response){
        console.log(response)
        console.log(datos.email)
        context.commit('set_error', null);
        context.commit('set_user', datos.email);
        router.push('/');
      })
      .catch(function(error){
        context.commit('set_error', error.message);
        context.commit('set_user', null);
      })
    },
    logOut(context){
      firebase.auth().signOut()
      .then(function(response){
        console.log(response)
        context.commit('set_error', null);
        context.commit('set_user', null);
        router.push('/login');
      })
      
    }

  }
})

new Vue({
  store,
  render: h => h(App),
  router,
}).$mount('#app')
