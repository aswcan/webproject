import Vue from 'vue'
import vuex from 'vuex'
import $axios from '../utils/request'
// import axios from 'axios'

Vue.use(vuex)

export default new vuex.Store({
  state: {
    playsrc: '',
    index: 0,
    playlist: [],
    isplay: false,
    musiclist: {},
    userlist: ''
  },
  mutations: {
    appendmusiclist (state, list) {
      state.musiclist = list
    },
    setplaylist (state, listarray) {
      state.playlist = listarray
    },
    addplaylist (state, id) {
      state.playlist.unshift(id)
    },
    async playfromthis (state, index) {
      const isok = await $axios.get('/check/music?id=' + state.playlist[index].id)
      console.log(isok)
      // if(isok)
      state.playsrc = state.playlist[index].id
      console.log(state.playsrc)
      // console.log(state.playsrc)
      state.index = index + 1
      // console.log(state.index)
      state.isplay = true
    },
    changestatus (state, stu) {
      state.isplay = stu
    }
  }
})
