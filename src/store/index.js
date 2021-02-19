import Vue from 'vue'
import Vuex from 'vuex'
import axios from '../api/axios'
import swal from 'sweetalert'
import router from '../router'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isLogin: !!localStorage.username,
    rooms: {},
    questions: [],
    users: [],
    whoIsRight: '',
    whoIsWinner: '',
    howMuchPoints: 0,
    rules: [
      'Minimal pemain untuk memulai game adalah 3 orang',
      'Setiap pemain akan menebak gambar dengan clue yang sudah diberikan',
      'Setiap soal akan diberikan batas waktu 1 menit untuk dijawab',
      'Setelah selesai dengan soal yg diberikan, game akan berakhir'
    ]
  },
  mutations: {
    SET_QUESTION (state, questions) {
      state.questions = questions
    },
    SET_USERS (state, users) {
      state.users = users.data
    },
    SET_WHOISRIGHT (state, username) {
      console.log(state.users, username)
      state.users.forEach(user => {
        if (user.username === username) {
          user.points += 10
        }
      })
      state.whoIsRight = username
    },
    SET_WHOISWINNER (state, winner) {
      state.whoIsWinner = winner
    },
    SET_HOWMUCHPOINTS (state, points) {
      state.howMuchPoints = points
    }
  },
  getters: {
    questions: (state) => {
      return state.questions
    },
    users: (state) => {
      return state.users
    }
  },
  actions: {
    async whoIsWinner ({ state, commit }) {
      let winner = state.users[0]
      for (let i = 0; i < state.users.length - 1; i++) {
        if (state.users[i].points < state.users[i + 1].points) {
          winner = state.users[i + 1]
        }
      }
      commit('SET_HOWMUCHPOINTS', winner.points)
      commit('SET_WHOISWINNER', winner.username)
    },
    async resetWhoIsRight ({ commit }) {
      commit('SET_WHOISRIGHT', null)
    },
    async isAnswer ({ commit, dispatch }, { question, answer }) {
      if (question.answer.toLowerCase() === answer.toLowerCase()) {
        commit('SET_WHOISRIGHT', localStorage.username)
      }
    },
    async fetchAll ({ dispatch }) {
      try {
        await Promise.all([
          dispatch('fetchUsers'),
          dispatch('fetchQuestions')
        ])
      } catch (err) {
        await swal({
          title: err.message,
          icon: 'error',
          button: 'ok'
        })
      }
    },
    async fetchUsers ({ commit }) {
      try {
        const users = await axios({
          method: 'GET',
          url: '/user'
        })
        commit('SET_USERS', users)
      } catch (err) {
        await swal({
          title: err.message,
          icon: 'error',
          button: 'ok'
        })
      }
    },
    async fetchQuestions ({ commit }) {
      try {
        const payload = await axios({
          method: 'GET',
          url: '/questions'
        })

        const questions = [...payload.data.data]
        const questionsRandomed = []
        payload.data.data.forEach((question, i) => {
          if (i < 10) {
            const random = Math.floor(Math.random() * questions.length)
            questionsRandomed.push(questions[random])
            questions.splice(random, 1)
          }
        })
        commit('SET_QUESTION', questionsRandomed)
      } catch (err) {
        await swal({
          title: err.message,
          icon: 'error',
          button: 'ok'
        })
      }
    },
    async logout () {
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
    async login ({ commit, dispatch }, username) {
      if (username) {
        try {
          await axios({
            method: 'POST',
            url: '/createUser',
            data: { username }
          })
          localStorage.setItem('username', username)
          await dispatch('fetchUsers')
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
