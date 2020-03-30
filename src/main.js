import Vue from "vue";
import App from "./App.vue";
import './index.js';
//Node Modules import
import BootstrapVue from 'bootstrap-vue';
// Import global styles
import 'bootstrap-vue/dist/bootstrap-vue.css';//Node Module
import './assets/css/custom.css';  //Local css


Vue.config.productionTip = false

Vue.use(BootstrapVue)

new Vue({
  render: h => h(App),
}).$mount('#app')
