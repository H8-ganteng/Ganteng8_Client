<template>
  <div>
    <b-card
      :title="'Room ' + (i + 1)"
      img-src="https://picsum.photos/600/300/?image=25"
      img-alt="Image"
      img-top
      class="mb-2 mt-2"
    >
      <b-button @click.prevent="goToRoom">join</b-button>
    </b-card>
  </div>
</template>

<script>
export default {
  name: 'RoomCard',
  props: ['i'],
  methods: {
    goToRoom () {
      this.$router.push({ path: '/room' + (this.i + 1) })
    }
  }
}
</script>

<style scoped>

</style>
