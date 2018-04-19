// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from '@/App.vue'
import router from '@/router'
import lang from '@/lang/lang.js'
import VueI18n from 'vue-i18n'
import store from '@/store'

Vue.config.productionTip = false
Vue.use(VueI18n)

const i18n = new VueI18n(lang)

new Vue({
  el: '#app',
  i18n,
  router,
  store,
  template: '<App></App>',
  components: {App}
})
