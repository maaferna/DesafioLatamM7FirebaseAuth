import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';
import router from './router';
import { useUserStore } from './stores/userStore';

import 'bootstrap/dist/css/bootstrap.min.css'; 
import 'bootstrap';

const app = createApp(App);

app.use(createPinia());
app.use(router);

const userStore = useUserStore(); 
userStore.initializeAuth().then(() => {
    app.mount('#app')
  }) 


