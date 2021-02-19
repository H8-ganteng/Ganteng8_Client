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
    users: [],
    whoIsRight: '',
    whoIsWinner: '',
    count: 60,
    isStart: false,
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
      state.users.forEach(user => {
        if (user.username === username) {
          user.points += 10
          this._vm.$socket.emit('setPoints', user)
        }
      })
      // this.$socket.emit('setPoints', state.users)
      state.whoIsRight = username
    },
    SET_WHOISWINNER (state, winner) {
      state.whoIsWinner = winner
    },
    SET_HOWMUCHPOINTS (state, points) {
      state.howMuchPoints = points
    },
    ADD_USER (state, user) {
      state.users.push(user)
    },
    SET_COUNT (state, count) {
      state.count = count
    },
    SET_STARTGAME (state) {
      state.isStart = true
    },
    SET_POINTS (state, userFromServer) {
      state.users.forEach(user => {
        if (user.username === userFromServer.username) {
          user.points = userFromServer.points
        }
      })
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
    SOCKET_setPoint ({ commit }, user) {
      commit('SET_POINTS', user)
    },
    async SOCKET_countdown ({ commit }, counter) {
      commit('SET_COUNT', counter)
    },
    async SOCKET_addUser ({ commit, dispatch }, data) {
      if (!data.isGameStart) {
        console.log(data.isGameStart)
        commit('ADD_USER', data.user)
        dispatch('login', data.user.username)
      } else {
        console.log('game is start')
      }
    },
    SOCKET_startGameServer ({ commit }) {
      commit('SET_STARTGAME')
      router.push('/game')
    },
    async SOCKET_setCount ({ commit }) {
      commit('SET_COUNT', 45)
    },
    async whoIsWinner ({ state, commit }) {
      let winner
      for (let i = 0; i < state.users.length - 1; i++) {
        if (state.users[i].points < state.users[i + 1].points) {
          winner = state.users[i + 1]
        }
      }
      this._vm.$socket.emit('gameFinish')
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
