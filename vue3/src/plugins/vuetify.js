import Vue from 'vue'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import ja from 'vuetify/es5/locale/ja'

Vue.use(Vuetify, {
  iconfont: 'md',
  lang: {
    locales: { ja },
    current: 'ja'
  },
  theme: {
    secondary: '#36231F'
  }
})
