import Vue from 'vue'
import Vuex from 'vuex'
import spotify from './modules/spotify'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  modules: {
      spotify
  },
  strict: debug
})