<template>
  <div id="nav" v-if="$store.state.user">
    <router-link to="/">Home</router-link>
    <router-link to="/about">About</router-link>
    <button @click="$store.dispatch('logout')">Logout</button>
  </div>
  <router-view/>
</template>

<script lang="ts">
import { onBeforeMount } from 'vue';
import { useStore } from 'vuex';


export default {
  setup() {
    const store  = useStore() 

    onBeforeMount(() => {
      store.dispatch('fetchUser')
    })
  }
}
</script>

<style scoped>
body {
  margin: 0;
  padding: 0;
}

#nav {
  background-color: #49b06c;
  color: white;
  padding: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
}

#nav a {
  color: white;
  font-size: x-large;
  text-decoration: none;
  margin-right: 15px;
}

#nav button {
  background-color: #007bff;
  color: white;
  border: none;
  padding: 5px 10px;
  border-radius: 3px;
  cursor: pointer;
}

#nav button:hover {
  background-color: #0056b3;
}


</style>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #ffffff;
}
</style>
