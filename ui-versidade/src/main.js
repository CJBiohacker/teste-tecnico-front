import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import vuetify from './plugins/vuetify';

import 'vuetify/styles';
import './styles/base.css';

const app = createApp(App);
app.use(router).use(vuetify);
app.mount('#app');
