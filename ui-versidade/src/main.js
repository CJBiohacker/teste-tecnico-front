import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';
import router from './router';
import vuetify from './plugins/vuetify';

import 'vuetify/styles';
import './styles/base.css';

const pinia = createPinia();
const app = createApp(App);
app.use(pinia).use(router).use(vuetify);
app.mount('#app');
