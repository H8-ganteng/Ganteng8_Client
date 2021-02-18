<template>
  <div>
    <h2>{{ no + 1 }}. {{ question.clue }}</h2>
    <div
      class="container overflow-hidden d-flex justify-content-center align-items-center"
      style="width: 400px; height: 400px">
      <img style="object-fit: fill; width: 100%" :src="question.imageUrl"/>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Question',
  props: ['question', 'no']
}
</script>

<style scoped>
h2 {
  color: black;
  text-shadow: 0 0 5px white;
}
</style>
