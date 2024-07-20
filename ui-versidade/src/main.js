import { createApp } from 'vue';
import { createVuetify } from 'vuetify';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';
import App from './App.vue';
import router from './router';
import './styles/base.css';
import 'vuetify/styles';


const vuetify = createVuetify({
    components,
    directives,
  });

const app = createApp(App);

app.use(router).use(vuetify);

app.mount('#app');
