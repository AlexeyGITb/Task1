import Vue from 'vue'
import App from './App.vue'
// You also need to import the styles. If you're using webpack's css-loader, you can do so here:
import 'vue-snotify/styles/material.css'; // or dark.css or simple.css


import Snotify, { SnotifyPosition } from 'vue-snotify'

const options = {
  toast: {
    position: SnotifyPosition.centerTop
  }
}

Vue.use(Snotify, options)


new Vue({
  el: '#app',
  render: h => h(App)
})


