import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';

// Create a new Vue app instance
const app = createApp(App);

// Use Vuex store and Vue Router
app.use(store);
app.use(router);

// Mount the app to the element with the ID 'app'
app.mount('#app');

