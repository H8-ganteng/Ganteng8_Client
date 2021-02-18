<template>
  <form class="d-flex flex-column align-items-center" @submit.prevent="sendAnswer">
    <div class="form-group">
      <input type="text" v-model="answer" class="form-control" aria-describedby="emailHelp">
    </div>
    <button type="submit" class="btn btn-primary">Submit</button>
  </form>
</template>

<script>
export default {
  name: 'Answer',
  data () {
    return {
      answer: ''
    }
  },
  methods: {
    async sendAnswer () {
      await this.$emit('isAnswer', this.answer)
      this.answer = ''
    }
  }
}
</script>

<style scoped>

</style>
