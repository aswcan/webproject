import Vue from 'vue'
import vuex from 'vuex'
// import axios from 'axios'

Vue.use(vuex)

export default new vuex.Store({
  state: {
    playsrc: '',
    index: 0,
    playlist: []
  },
  mutations: {
    setplaylist (state, listarray) {
      state.playlist = listarray
    },
    addplaylist (state, id) {
      state.playlist.unshift(id)
    },
    playfromthis (state, index) {
      state.playsrc = state.playlist[index]
      state.index = index + 1
    }
  }
})
