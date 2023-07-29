import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import router from './router/index'
import store from './store/index'
import moment from './plugins/moment'

import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
import './registerServiceWorker'

Vue.use(VueSweetalert2);
Vue.config.productionTip = process.env.VUE_APP_PRODUCTION_TIP

Vue.filter('shortDate', (date) => {
  return moment(date).format('Do MMM YYYY')
})

Vue.filter('longDate', (date) => {
  return moment(date).format('dddd Do MMMM YYYY')
})

Vue.filter('shortDateTime', (date) => {
  return moment(date).format('Do MMM YYYY à HH:mm')
})

Vue.filter('time', (date) => {
  return moment(date).format('HH:mm')
})

new Vue({
  vuetify,
  router,
  store,
  moment,
  render: h => h(App)
}).$mount('#app')
