<template>
  <div class="container-fluid" style="height: 100vh;">
    <h1>this is in the game</h1>
    <div class="container d-flex flex-start overflow-hidden" style="width: 100vw; height: 85vh">
      <div class="w-75 d-flex flex-column justify-content-around text-primary">
        <div>
          <Question :question="question" :no="questionNum"/>
        </div>
        <h1 style="color: yellow"> <strong>{{ count }}</strong></h1>
        <Answer/>
      </div>
      <div class="w-25 d-flex flex-column align-items-center overflow-auto mt-3" id="sidebar">
        <Sidebar v-for="index in 5" :key="index" style="width: 90%;"/>
      </div>
    </div>
  </div>
</template>

<script>
import Sidebar from '../components/Sidebar.vue'
import Answer from '../components/Answer.vue'
import Question from '../components/Question.vue'
import router from '../router'
export default {
  name: 'Game',
  components: {
    Sidebar,
    Answer,
    Question
  },
  data () {
    return {
      count: 3,
      questionNum: 0
    }
  },
  methods: {
    async countdown () {
      if (this.count > 0) {
        setTimeout(() => {
          this.count -= 1
          this.countdown()
        }, 1000)
      } else {
        if (this.questionNum === this.questionLength - 1) {
          await router.push({ name: 'reward' })
          await setTimeout(() => {}, 3000)
          await this.$store.dispatch('logout')
        }
        this.questionNum += 1
        this.count = 3
        await this.countdown()
      }
    }
  },
  computed: {
    question () {
      return this.$store.state.questions[this.questionNum]
    },
    questionLength () {
      return this.$store.state.questions.length
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
