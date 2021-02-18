<template>
  <div class="container-fluid" style="height: 100vh;">
    <h1>welcome to lobby brads</h1>
    <div class="container d-flex flex-start overflow-hidden" style="width: 100vw; height: 85vh">
      <div class="w-25 d-flex flex-column align-items-center overflow-auto mt-3" id="sidebar">
        <Sidebar v-for="index in 5" :key="index" style="width: 90%;"/>
      </div>
      <div class="w-75 d-flex flex-column justify-content-around text-primary">
        <div>
          <h3>1. Minimal pemain untuk memulai game adalah 3 orang </h3>
          <h3>2. Setiap pemain akan menebak gambar dengan clue yang sudah diberikan</h3>
          <h3>3. Setiap soal akan diberikan batas waktu 1 menit untuk dijawab</h3>
          <h3>4. Setelah selesai dengan soal yg diberikan, game akan berakhir</h3>
        </div>
        <h1 style="color: yellow"> <strong>{{ count }}</strong></h1>
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
      count: 5
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
  created () {
    this.countdown()
  }
}
</script>

<style scoped>
#sidebar {
  padding: 20px 0;
  border-radius: 10px;
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
