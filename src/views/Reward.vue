<template>
  <div class="container">
    <h1>the winner is {{ winner }} with points: {{ points }}</h1>
    <button class="btn btn-primary" @click.prevent="logout">Logout</button>
    <button class="btn btn-primary" @click.prevent="toDashboard">Back to dashboard</button>
  </div>
</template>

<script>
import router from '../router'
export default {
  name: 'Reward',
  computed: {
    winner () {
      return this.$store.state.whoIsWinner
    },
    points () {
      return this.$store.state.howMuchPoints
    }
  },
  methods: {
    toDashboard () {
      router.push({ name: 'lobby' })
    },
    logout () {
      this.$store.dispatch('logout')
    }
  }
}
</script>

<style scoped>

</style>
