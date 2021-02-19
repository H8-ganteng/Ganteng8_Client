<template>
  <div class="container-fluid" style="height: 100vh;">
    <h1 class="title">welcome to lobby</h1>
    <div class="container d-flex flex-start overflow-hidden" style="width: 100vw; height: 85vh">
      <div class="w-50 d-flex align-items-center" id="sidebar">
        <h1 class="quote">
          Jika Anda tidak dapat menjelaskan sesuatu hal secara sederhana, itu artinya Anda belum cukup paham.<br/>
          <strong>~ Albert Einstein</strong>
        </h1>
      </div>
      <div class="w-50 row overflow-auto">
        <RoomCard class="col-4" v-for="(item, i) in 29" :key="i" :i="i"/>
      </div>
    </div>
  </div>
</template>

<script>
import RoomCard from '../components/RoomCard'
export default {
  name: 'Lobby',
  components: {
    RoomCard
  },
  data () {
    return {
    }
  },
  computed: {
  },
  methods: {
  }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Ballet&display=swap');
.quote {
  font-family: 'Ballet', cursive;
  color: #fff;
  text-shadow: 0 0 5px black;
}
#sidebar {
  padding: 20px 0;
  border-radius: 10px;
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
