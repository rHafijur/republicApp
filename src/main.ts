import { createApp } from 'vue'
// import VueResource from 'vue-resource';
import axios from 'axios'
import VueAxios from 'vue-axios'
import App from './App.vue'
import router from './router';
import { IonicVue } from '@ionic/vue';

/* Core CSS required for Ionic components to work properly */
import '@ionic/vue/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/vue/css/normalize.css';
import '@ionic/vue/css/structure.css';
import '@ionic/vue/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/vue/css/padding.css';
import '@ionic/vue/css/float-elements.css';
import '@ionic/vue/css/text-alignment.css';
import '@ionic/vue/css/text-transformation.css';
import '@ionic/vue/css/flex-utils.css';
import '@ionic/vue/css/display.css';

/* Theme variables */
// import './theme/variables.css';
axios.defaults.baseURL = 'http://localhost/modelTest/public/api';

axios.defaults.headers.common['Authorization'] = "Bearer "+localStorage.token;

const app = createApp(App)
.use(IonicVue)
.use(VueAxios,axios)
.use(router);
  
router.isReady().then(() => {
  app.mount('#app');
});