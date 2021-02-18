<template>
  <div id="login-area">
    <div class="login-container">
      <h1>Pick username</h1>
      <form @submit.prevent="isLogin">
        <div class="form-group">
          <input type="text" v-model="username" class="form-control">
        </div>
        <button type="submit" class="btn btn-primary">Let's weird</button>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Home',
  data () {
    return {
      username: ''
    }
  },
  methods: {
    async isLogin () {
      await this.$store.dispatch('login', this.username)
    }
  }
}
</script>

<style scoped>

#login-area {
  height: 75vh;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
}
.login-container {
  background: linear-gradient(
    to right bottom,
    rgba(2, 167, 182, 0.2),
    rgba(242, 244, 243, 0.8));
  width: 25rem;
  border-radius: 7px;
  padding: 20px;
}

</style>
