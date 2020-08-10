<template>
    <div>
        <div class="wrap">
            <a><router-link :to="{path:'/login'}">Login</router-link></a>
            <button @click="logOut">Salir</button>
        </div>
        <h1>Hola {{user}}</h1>
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
.wrap {
    text-align: end;
    margin-bottom: 20px;
}

.wrap a {
    background: #1a2537;
    color: white;
    padding: 15px;
    text-decoration: none;
}
</style>