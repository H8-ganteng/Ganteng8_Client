<template>
  <div>
    <div class="container" style="width: 500px; height: 500px">
      <img style="object-fit: contain" :src="question.imageUrl"/>
    </div>
    <h1>{{ no + 1 }}. {{ question.clue }}</h1>
  </div>
</template>

<script>
export default {
  name: 'Question',
  props: ['question', 'no']
}
</script>

<style scoped>

</style>
