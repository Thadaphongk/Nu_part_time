import Vue from 'vue'
import VeeValidate from 'vee-validate'
import App from './App.vue'
import store from './store'
import router from './router'

//StyleSheet
import 'font-awesome/css/font-awesome.css'
import 'bootstrap/dist/css/bootstrap.css'
import 'alertifyjs/build/css/alertify.css'
import 'alertifyjs/build/css/themes/default.css'
import './assets/styles.css'

//javascripts
import 'bootstrap/dist/js/bootstrap'
import * as alertify from 'alertifyjs'
import * as jquery from 'jquery'

Vue.config.productionTip = false
Vue.prototype.jquery = jquery
Vue.prototype.alertify = alertify
Vue.use(VeeValidate)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
