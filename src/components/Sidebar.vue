<template>
  <div class="card mb-3" style="max-width: 440px;">
    <div class="d-flex">
      <div class="w-25 overflow-hidden" style="border-radius: 50%; width: 60px; height: 60px; margin: 7px">
        <img src="https://st2.depositphotos.com/1502311/12020/v/600/depositphotos_120206860-stock-illustration-profile-picture-vector.jpg" alt="keqing" style="object-fit: fill; height: 70px" />
      </div>
      <div class="w-75 d-flex flex-column align-items-center justify-content-center">
        <h4>{{ user.username }}</h4>
        <small>score: {{ user.points }} pts</small>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Sidebar',
  props: ['user']
}
</script>

<style scoped>

</style>
