import Vue from 'vue'
import store from '../store'
import VueSocketIO from 'vue-socket.io'

Vue.use(new VueSocketIO({
  debug: true,
  connection: 'https://ganteng8server.herokuapp.com',
  vuex: {
    store,
    actionPrefix: 'SOCKET_'
  }
}))
