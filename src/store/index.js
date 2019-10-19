import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersistence from 'vuex-persist'
import spotify from './modules/spotify'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

const vuexLocal = new VuexPersistence({
    storage: window.localStorage
})

export default new Vuex.Store({
  modules: {
      spotify
  },
  strict: debug,
  plugins: [vuexLocal.plugin]
})