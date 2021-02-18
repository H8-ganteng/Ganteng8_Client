<template>
  <div class="container-fluid" style="height: 100vh;">
    <h1 class="title">welcome to lobby</h1>
    <div class="container d-flex flex-start overflow-hidden" style="width: 100vw; height: 85vh">
      <div class="w-25 d-flex flex-column align-items-center overflow-auto mt-3" id="sidebar">
        <Sidebar v-for="user in users" :key="user.id" :user="user" style="width: 90%;"/>
      </div>
      <div class="w-75 d-flex flex-column justify-content-around text-primary">
        <div>
          <h1 class="rules">Rules</h1>
          <div class="d-flex flex-column" id="rules-container">
            <h4 class="rules" v-for="(rule, index) in rules" :key="index">{{ index + 1 }}. {{ rule }}</h4>
          </div>
        </div>
        <h1 class="rules"> <strong>{{ count }}</strong></h1>
      </div>
    </div>
  </div>
</template>

<script>
import Sidebar from '../components/Sidebar.vue'
import router from '../router'
export default {
  name: 'Lobby',
  components: {
    Sidebar
  },
  data () {
    return {
      count: 45
    }
  },
  computed: {
    users () {
      return this.$store.state.users
    },
    rules () {
      return this.$store.state.rules
    }
  },
  methods: {
    async countdown () {
      if (this.count > 0) {
        await setTimeout(() => {
          this.count -= 1
          this.countdown()
        }, 1000)
      } else {
        await this.$store.dispatch('fetchQuestions')
        await router.push({ name: 'game' })
      }
    }
  },
  async created () {
    await this.$store.dispatch('fetchUsers')
    if (this.users.length > 2) {
      await this.countdown()
    }
  }
}
</script>

<style scoped>
#sidebar {
  padding: 20px 0;
  border-radius: 10px;
}
h1.rules, h3.rules {
  color: #f4ffe5;
  text-shadow: 0 0 3px #010221;
}

#rules-container {
  color: #f4ffe5;
  text-shadow: 0 0 3px #010221;
  justify-content: flex-start;
  align-items: flex-start;
}

.title {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", serif;
  padding-top: 1%;
}

/* width */
::-webkit-scrollbar {
  width: 10px;
}

/* Track */
::-webkit-scrollbar-track {
  background: #f1f1f1;
}

/* Handle */
::-webkit-scrollbar-thumb {
  background: #888;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: #555;
}
</style>
