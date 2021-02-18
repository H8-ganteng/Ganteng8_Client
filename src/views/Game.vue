<template>
  <div class="container-fluid" style="height: 100vh;">
    <div class="container d-flex flex-start overflow-hidden" style="width: 100vw; height: 85vh">
      <div class="w-75 d-flex flex-column justify-content-around text-primary">
        <div>
          <Question :question="question" :no="questionNum"/>
        </div>
        <Answer v-if="isAnswered" @isAnswer="isAnswer"/>
      </div>
      <div class="w-25 d-flex flex-column align-items-center overflow-auto mt-3" id="sidebar">
        <h1 style="color: black; text-shadow: 0 0 5px white"> <strong>{{ count }}</strong></h1>
        <Sidebar v-for="user in users" :key="user.id" :user="user" style="width: 90%;"/>
      </div>
    </div>
  </div>
</template>

<script>
import Sidebar from '../components/Sidebar.vue'
import Answer from '../components/Answer.vue'
import Question from '../components/Question.vue'
import router from '../router'
import swal from 'sweetalert'
export default {
  name: 'Game',
  components: {
    Sidebar,
    Answer,
    Question
  },
  data () {
    return {
      count: 60,
      questionNum: 0,
      isNextQuestion: false,
      isAnswered: true
    }
  },
  methods: {
    async isAnswer (answer) {
      await this.$store.dispatch('isAnswer', { question: this.question, answer })
      if (this.$store.state.whoIsRight) {
        await swal(this.$store.state.whoIsRight + ' is right', {
          buttons: false,
          timer: 1000
        })
        await this.nextQuestion()
      } else {
        await swal('incorrect!!!', {
          buttons: false,
          timer: 1000
        })
        this.isAnswered = false
      }
      await this.$store.dispatch('resetWhoIsRight')
    },
    async nextQuestion () {
      this.isNextQuestion = true
    },
    async countdown () {
      if (this.count > 0 && !this.isNextQuestion) {
        setTimeout(() => {
          this.count -= 1
          this.countdown()
        }, 1000)
      } else {
        if (this.questionNum === this.questionLength - 1) {
          await this.$store.dispatch('whoIsWinner')
          await router.push({ name: 'reward' })
        }
        this.isAnswered = true
        this.questionNum += 1
        this.count = 60
        this.isNextQuestion = false
        await this.countdown()
      }
    }
  },
  computed: {
    users () {
      return this.$store.state.users
    },
    question () {
      return this.$store.state.questions[this.questionNum]
    },
    questionLength () {
      return this.$store.state.questions.length
    }
  },
  async created () {
    await this.$store.dispatch('fetchAll')
    await this.countdown()
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
