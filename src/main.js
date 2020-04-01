import Vue from "vue";
//Node Modules import
import BootstrapVue from 'bootstrap-vue';
import App from "./App.vue";
import './index.js';
// Import global styles
import 'bootstrap-vue/dist/bootstrap-vue.css';//Node Module
import './assets/css/cryptofont.css';
import './assets/css/custom.css';  //Local css


Vue.config.productionTip = false

Vue.use(BootstrapVue)

new Vue({
  render: h => h(App),
}).$mount('#app')
