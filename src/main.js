import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import VDateRange from 'vuetify-daterange-picker'
import 'vuetify-daterange-picker/dist/vuetify-daterange-picker.css'

Vue.use(VDateRange)
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
  mounted: function () {
  }
}).$mount('#app')
