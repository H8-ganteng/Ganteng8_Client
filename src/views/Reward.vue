<template>
  <div class="container d-flex flex-column justify-content-around" style="height: 80vh">
    <h1>The winner is {{ winner? winner : 'No winner :(' }} <span v-if="winner">with points: {{ points }}</span></h1>
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
