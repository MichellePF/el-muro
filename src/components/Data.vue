<template>
    <div class="container">
        <div class="wrap">
            <a><router-link :to="{path:'/login'}">Login</router-link></a>
            <a @click="logOut">Log Out</a>
        </div>
        <h1 v-if="user">Hola {{user.displayName}}</h1>
        <section class="clientes contenedor">
            <h2 v-if="user" class="titulo">Que dicen nuestros clientes de: {{user.displayName}}</h2>
            <div class="agregar_comentario">
                <form @submit="add_comentario">
                    <div class="comentario_container">
                        <p>Nombre</p>
                        <input required type="text" v-model="new_usuario_nombre">
                    </div>
                    <textarea v-model="new_texto" name="textarea" rows="5" cols="50" placeholder="Escribe tu comentario"></textarea>
                    <p class="center-content">
                        <input type="submit" class="btn btn-green" value="Agregar">
                    </p>
                </form>
                
                
                
            </div>
            <div class="cards" v-for="post in wall" :key="post.id">
                <div class="card">
                    <img src="../assets/lillia.png" alt="">
                    <div class="contenido-texto-card">
                        <div class="likes">
                             <a @click="add_like" href="#">Likes: {{likes}}</a>
                        </div>
                       
                        <h3>{{post.usuario_nombre}}</h3>
                        <p class="texto_post">{{post.texto}}</p>
                        <div class="texto_post_comentario" v-for="(comentario, i) in post.comentarios" :key="i">
                            <h4>{{comentario.usuario_nombre}}:</h4>
                            <p>{{comentario.texto}}</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>

<script>
import { db } from '@/firebase';

export default {
    name: "Data",
    data(){
        return {
            wall: [],
            new_usuario_nombre: "",
            new_usuario_id: "",
            new_texto: "",
            new_likes: 0,
            new_comentarios: []
        }
    },
    computed: {
        user(){
            return this.$store.state.user
        },
        likes(){
            return this.$store.state.like
        }
    },
    methods: {
        logOut(){
            this.$store.dispatch('logOut');
        },
        add_comentario(ev){
            ev.preventDefault();
            db.collection("wall").add({
                usuario_nombre: this.new_usuario_nombre,
                texto: this.new_texto,
                likes: this.new_likes
                                    
            })
        },
        add_like(){
            this.$store.commit('incremento')
        }
    },
    firestore() {          
		return {
			wall: db.collection('wall')
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

.cards{
    display: flex;
    justify-content: space-evenly;
}

.link-container {
    text-align: right;
    padding: 30px 50px 0 0;
}

.cards .card{
    background: #4d0686;
    display: flex;
    width: 46%;
    height: auto;
    align-items: center;
    justify-content: space-evenly;
    border-radius: 5px;
    box-shadow: 0 0 6px 0 rgba(0, 0, 0, 0.6);
    margin: 10px;
}

.cards .card img{
    width: 100px;
    height: 100px;
    object-fit: cover;
    border: 3px solid #fff;
    border-radius: 50%;
    display: block;
}

.cards .card > .contenido-texto-card{
    width: 60%;
    color: #fff;
}

.cards .card > .contenido-texto-card p{
    font-weight: 300;
    padding-top: 5px;
}

.texto_post_comentario{
    border: 2px solid lightpink;
    margin: 5px;
}
.likes{
    margin: 5px;
    text-align: end;
}
.likes a {
    color: lightpink;

}

.agregar_comentario{
    margin: 10px;
}
.comentario_container{
    margin-bottom: 10px;
}
</style>