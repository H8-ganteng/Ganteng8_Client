import Vue from 'vue'
import Vuex from 'vuex'
import axios from '../api/axios'
import swal from 'sweetalert'
import router from '../router'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isLogin: !!localStorage.username,
    questions: [],
    rules: [
      'Minimal pemain untuk memulai game adalah 3 orang',
      'Setiap pemain akan menebak gambar dengan clue yang sudah diberikan',
      'Setiap soal akan diberikan batas waktu 1 menit untuk dijawab',
      'Setelah selesai dengan soal yg diberikan, game akan berakhir'
    ]
  },
  mutations: {
    SET_QUESTION (state, questions) {
      state.questions = questions.data.data
    }
  },
  getters: {
    questions: (state) => {
      console.log(state.questions)
      return state.questions
    }
  },
  actions: {
    async fetchQuestions ({ commit }) {
      try {
        const question = await axios({
          method: 'GET',
          url: '/questions'
        })
        commit('SET_QUESTION', question)
      } catch (err) {
        await swal({
          title: err.message,
          icon: 'error',
          button: 'ok'
        })
      }
    },
    async logout ({ commit }) {
      try {
        await axios({
          method: 'DELETE',
          url: '/deleteUser',
          data: { username: localStorage.username }
        })
        localStorage.clear()
        await router.push({ name: 'home' })
      } catch (err) {
        await swal({
          title: err.message,
          icon: 'error',
          button: 'ok'
        })
      }
    },
    async login ({ commit }, username) {
      if (username) {
        try {
          await axios({
            method: 'POST',
            url: '/createUser',
            data: { username }
          })
          localStorage.setItem('username', username)
          await router.push({ path: '/lobby' })
        } catch (err) {
          await swal({
            title: err.response.data.msg,
            icon: 'error',
            button: 'ok'
          })
        }
      }
    }
  },
  modules: {
  }
})
