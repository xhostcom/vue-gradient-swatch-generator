import Vue from "vue";
//Node Modules import
import BootstrapVue from 'bootstrap-vue';
import VueSweetalert2 from 'vue-sweetalert2';
import App from "./App.vue";
// Import global styles
import 'bootstrap-vue/dist/bootstrap-vue.css';//Node Module
import './assets/css/custom.css';  //Local css
import './registerServiceWorker'

Vue.config.productionTip = false;

Vue.use(BootstrapVue);
Vue.use(VueSweetalert2);

new Vue({
  render: h => h(App),
}).$mount('#app')
