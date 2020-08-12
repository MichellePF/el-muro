<template>
    <div class="container">
        <div class="wrap">
            <a><router-link :to="{path:'/login'}">Login</router-link></a>
            <a @click="logOut">Log Out</a>
        </div>
        <h1 v-if="user">Hola {{user.displayName}}</h1>
        <div class="container_img">
            <img src="../assets/lux.jpg" alt="" height="600px">
        </div>
    </div>
</template>

<script>
export default {
    name: "Data",
    computed: {
        user(){
            return this.$store.state.user;
        }
    },
    methods: {
        logOut(){
            this.$store.dispatch('logOut');
        }
    }
}
</script>

<style scoped>
.container {
    height: 800px;
}

.wrap {
    text-align: end;
    margin-bottom: 20px;
}

.wrap a {
    background: #1a2537;
    color: white;
    padding: 15px;
    text-decoration: none;
    margin-right: 10px;
}
</style>