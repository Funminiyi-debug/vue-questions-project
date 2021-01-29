<template>
  <div>
    <div class="lg:text-sm" v-if="passages.length > 0">
      <div class="top-bar">
        <div
          class="bg-red-1 h-10 text-white items-center px-2 text-xs flex justify-between border-b border-white"
        >
          <div class="font-sans">
            Medical College Admission Test
          </div>
          <img alt="Logo" src="../assets/brand-logo-white.png" class="logo" />
          <!-- <i class="fab fa-stumbleupon fa-3x"></i> -->
          <div class="flex flex-col">
            <div class="flex items-center">
              <div><i class="far fa-clock"></i></div>
              <div class="px-2">Timer:</div>
              <div class="hover:text-green-300 cursor-pointer">
                <i class="fas fa-play"></i>
              </div>
              <div class="px-2">{{ counter }}</div>
              <i class="fas fa-toggle-off"></i>
            </div>
            <div class="flex items-center justify-end">
              <!-- <span class="pl-2"> 1 of 7 </span> -->
            </div>
          </div>
        </div>
        <div
          class="second-layer border-b text-xs text-white border-white flex items-center px-2 justify-between"
        >
          <div class="flex">
            <div class="cursor-pointer">
              <span v-on:click="highlightText"
                ><span class="underline">H</span>ighlight</span
              >
            </div>
            <div class="pl-8 flex items-center">
              <i class="fas fa-pen"></i>
              <span v-on:click="strikethroughText">
                <span class="pl-4 underline">Strikethrough</span></span
              >
            </div>
            <div class="pl-8 flex items-center">
              <span v-on:click="saveProgress">
                <span class="pl-4 underline">Save Progress</span></span
              >
            </div>
          </div>
          <div class="flex justify-end items-center" @click="flagForReview">
            <i class="fas fa-flag"></i>
            <div class="pl-3">
              <span class="underline">Flag for Review</span>
            </div>
          </div>
        </div>
        <progressbar v-bind:percentage="percentage" />
      </div>

      <!-- <div class="bg-teal-1 h-5 lg:block hidden">
        <div class="grid grid-cols-2">
          <div></div>
        </div>
      </div> -->
      <div class="lg:grid lg:grid-cols-2 bg-red-1  quiz-window window ">
        <passage
          v-bind:passage="currentPassage"
          v-bind:activePassage="activePassage"
          v-bind:activeQuestion="activeQuestion"
          v-on:prev_passage="prevPassage"
          v-on:next_passage="nextPassage"
          v-bind:highlight="highlight"
          v-bind:strikethrough="strikethrough"
        ></passage>
        <div>
          <!-- v-bind:userAnswer="currentUserAnswer" -->
          <!-- ========================== navigation bar -->
          <navigation
            v-bind:currentQuestion="currentQuestion"
            v-bind:currentPassage="currentPassage"
            v-bind:passages="passages"
            v-bind:userVisitedQuestions="userVisitedQuestions"
            v-on:navigateToQuestion="navigateToQuestion"
          ></navigation>

          <!-- ============ to here -->

          <question
            v-bind:question="currentQuestion"
            v-bind:activeQuestion="activeQuestion"
            v-on:answer-choice="selectAnswer"
            v-bind:userAnswer="currentUserAnswer"
            v-bind:inReview="inReview"
            v-bind:lastQuestion="lastQuestion"
          ></question>
        </div>
      </div>
      <div
        class="bg-red-1 flex items-center h-12 justify-end text-white pr-8 bottom-bar"
      >
        <div
          @click="previous"
          class="flex items-center px-2 border-l cursor-pointer  hover:text-teal-1"
        >
          <i class="fas fa-arrow-left"></i>
          <div class="pl-2"><span class="underline">P</span>revious</div>
        </div>
        <div class="flex items-center px-4 border-0 bg-red-1" v-b-modal.modal-1>
          <i class="fas fa-star"></i> Na <span class="underline">v</span>igation
        </div>
        <div
          v-if="activeQuestion === 'five'"
          class="cursor-pointer pl-4 border-l hover:shadow-lg hover:text-teal-1"
          @click="end"
        >
          <span class="underline">E</span>nd
        </div>
        <div
          v-else
          class="cursor-pointer pl-4 border-l hover:shadow-lg hover:text-teal-1"
          @click="next"
        >
          <span v-if="lastQuestion == true"
            ><span class="underline">S</span>ubmit</span
          >
          <span v-if="lastQuestion == false"
            ><span class="underline">N</span>ext</span
          >
          <i class="fas fa-arrow-right"></i>
        </div>
      </div>
    </div>
    <div v-if="passages.length == 0" class="m-auto text-info">
      <div class="text-center my-5">
        <div class="spinner-border">
          <span class="sr-only">Loading...</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import moment from "moment";
import Passage from "../components/Passage.vue";
import Question from "../components/Question.vue";
import Progressbar from "../components/Progressbar.vue";
import Navigation from "../components/Navigation.vue";

import { baseUrl } from "../api/routes";
import allPassages from "../mock/data";
import axios from "axios";

export default {
  components: {
    Passage,
    Question,
    Progressbar,
    Navigation
  },
  name: "Home",
  created() {
    this.fetchPassages(this.$route.params.subjectid);
  },
  mounted() {
    this.startTimer();
  },
  destroyed() {
    this.saveData();
    clearInterval(this.timer);
  },

  computed: {
    currentUserAnswer() {
      if (this.userVisitedQuestions.questionsAnswered.length > 0) {
        const theQuestion = this.userVisitedQuestions.questionsAnswered.find(
          bank => bank.question._id == this.currentQuestion._id
        );
        if (theQuestion) {
          return theQuestion.userAnswer;
        }
      }
      return "";
    }
  },
  watch: {
    $route(to, from) {
      this.fetchPassages(to.params.subjectid);
      // this.getHistory();
    },
    activeQuestion(to, from) {
      if (
        this.activePassage + 1 == this.passages.length &&
        to + 1 == this.currentPassage.questions.length
      ) {
        this.lastQuestion = true;
      } else {
        this.lastQuestion = false;
      }
    }
  },
  props: ["user"],
  data() {
    return {
      inReview: false,
      strikethrough: false,
      highlight: false,
      userVisitedQuestions: {
        username: this.user.name,
        email: this.user.email,
        questionsAttempted: [],
        questionsAnswered: [],
        score: 0
      },
      lastQuestion: false,
      get currentQuestion() {
        return this.passages[this.activePassage].questions[this.activeQuestion];
      },
      get currentPassage() {
        return this.passages[this.activePassage];
      },
      get allQuestions() {
        const allQuestons = [
          ...this.passages.map(passage => {
            return [...passage.questions.map(question => question)];
          })
        ].flat(Infinity);
        return allQuestons;
      },
      activeQuestion: 0,
      activePassage: 0,
      dateMonth: moment().format("MMMM"),
      dateDay: moment().format("Do"),
      passages: [],
      // progress bar
      get percentage() {
        return parseInt(
          (this.userVisitedQuestions.questionsAttempted.length /
            this.allQuestions.length) *
            100
        );
      },

      // timer
      timer: 0,
      seconds: 0,
      counter: "00:00:00"
    };
  },

  methods: {
    getHistory() {
      const history = localStorage.getItem(
        `userData_${this.userVisitedQuestions.username}`
      );

      if (!history) {
        this.userVisitedQuestions = {
          ...history,
          ...this.userVisitedQuestions
        };
      }
    },
    async fetchPassages(id) {
      try {
        let res = await axios.get(`${baseUrl}/passages/get-by-subject/${id}`);

        // res = await res.json();
        this.handleError(res);

        this.passages = res.data.passages;
      } catch (error) {
        console.error(error);
      }
    },
    next() {
      if (this.activeQuestion + 1 < this.currentPassage.questions.length) {
        this.activeQuestion += 1;
      } else {
        if (this.activePassage + 1 == this.passages.length) {
          return this.endQuiz();
        }
        this.activePassage += 1;
        this.activeQuestion = 0;
      }
      this.handleQuestionViewed(this.currentQuestion);
    },
    previous() {
      if (this.activeQuestion > 0) {
        this.activeQuestion -= 1;
      } else {
        if (this.activePassage > 0) {
          this.activePassage -= 1;
          this.activeQuestion =
            this.passages[this.activePassage].questions.length - 1;
        }
      }
    },
    end() {
      alert("The QUIZ HAS ENDED");
    },

    nextPassage() {
      if (this.activePassage + 1 < this.passages.length) {
        this.activePassage += 1;
        this.activeQuestion = 0;
      }
    },
    prevPassage() {
      if (this.activePassage > 0) {
        this.activePassage -= 1;
        this.activeQuestion = 0;
      }
    },
    endQuiz() {
      return this.$router.push(`/end/${this.$route.params.subjectid}`);
    },

    startTimer() {
      const pad = val => {
        var valString = val + "";
        if (valString.length < 2) {
          return "0" + valString;
        } else {
          return valString;
        }
      };
      this.timer = setInterval(() => {
        ++this.seconds;
        const seconds = pad(this.seconds % 60);
        const minutes = parseInt(this.seconds / 60);
        const hours = pad(parseInt(minutes / 60));
        this.counter = `${hours}:${pad(minutes)}:${pad(seconds)}`;
      }, 1000);
    },

    // user interaction side
    selectAnswer(choice) {
      const previousChoice = this.userVisitedQuestions.questionsAnswered.findIndex(
        value => value.question._id == this.currentQuestion._id
      );

      if (previousChoice != -1) {
        if (previousChoice) {
          this.userVisitedQuestions.questionsAnswered[
            previousChoice
          ].userAnswer = choice.userAnswer;
        } else {
          return;
        }
      } else {
        const { userAnswer } = choice;
        const payload = {
          passage: this.currentPassage,
          question: this.currentQuestion,
          userAnswer: userAnswer
        };
        this.userVisitedQuestions.questionsAnswered.push(payload);
      }
    },
    // questions viewed
    handleQuestionViewed() {
      const hasBeenViewed = this.userVisitedQuestions.questionsAttempted.find(
        value => value._id == this.currentQuestion._id
      );

      if (!hasBeenViewed) {
        this.userVisitedQuestions.questionsAttempted.push(this.currentQuestion);
      }
      return;
    },
    handleError(error) {
      if (error.status == 409) {
        alert("Oops! User already exist");
        return;
      }
      if (error.status == 500) {
        alert("Server Error, please try again");
        return;
      }

      if (error.status == 401) {
        alert("You have to be logged in");
        this.$router.push("/login");
      }

      if (error.status == 400) {
        alert("Ensure all fields are filled");
        return;
      }
      if (error.status == 404) {
        alert("not found");
      }
    },
    getScore() {
      let score = 0;
      if (this.userVisitedQuestions.questionsAnswered == 0) {
        return;
      }
      this.userVisitedQuestions.questionsAnswered.forEach(item => {
        const correctAnswer = item.question.alternatives.find(
          option => option.isCorrect == true
        ).text;
        if (correctAnswer == item.userAnswer) {
          score += 1;
        }
      });
      return (score / this.allQuestions.length) * 100;
    },
    async saveData() {
      this.userVisitedQuestions.timeTaken = this.counter;
      this.userVisitedQuestions.score = this.getScore();
      // save to local storage
      localStorage.setItem(
        `userData_${this.userVisitedQuestions.username}`,
        JSON.stringify(this.userVisitedQuestions)
      );

      const request = {
        name: this.userVisitedQuestions.username,
        email: this.userVisitedQuestions.email,
        subject: {
          subject: this.$route.params.subjectid,
          score: this.userVisitedQuestions.score,
          answers: this.userVisitedQuestions.questionsAnswered,
          counter: (this.userVisitedQuestions.timeTaken = this.counter)
        }
      };

      this.$store.commit("userVisitedQuestions", this.userVisitedQuestions);
      this.$store.commit("passages", this.passages);
      this.$emit("addResults", request.subject);

      const res = await axios.post(`${baseUrl}/users/add-subject-to-user`, {
        ...request
      });
    },

    // strikethroughs and highlights
    highlightText() {
      // this.highlight = !this.highlight;
      if (this.highlight == false) {
        this.highlight = true;
      } else {
        this.highlight = false;
      }
    },
    strikethroughText() {
      if (this.strikethrough == false) {
        this.strikethrough = true;
      } else {
        this.strikethrough = false;
      }
    },
    navigateToQuestion({ questionIndex, passageIndex }) {
      this.activePassage = passageIndex;
      this.activeQuestion = questionIndex;
    },
    flagForReview() {
      const questionToFlag = this.currentQuestion;
      const testPassages = this.passages.map(passage => {
        passage.questions = [
          ...passage.questions.map(question => {
            if (question._id == questionToFlag._id) {
              question.isFlagged = true;
            }

            return question;
          })
        ];
        return passage;
      });
      this.passages = testPassages;
    },
    saveProgress() {
      // make separate route for saved progress
      const request = {
        name: this.userVisitedQuestions.username,
        email: this.userVisitedQuestions.email,
        subject: {
          subject: this.$route.params.subjectid,
          answers: this.userVisitedQuestions.questionsAnswered,
          questionsAttempted: this.userVisitedQuestions.questionsAnswered,
          activeQuestion: this.activeQuestion,
          activePassage: this.activePassage,
          counter: (this.userVisitedQuestions.timeTaken = this.counter)
        }
      };

      // api call goes here
    }
  }
};
</script>

<style src="../assets/css/tailwind.css"></style>
<style scoped>
.bottom-bar {
  position: fixed;
  bottom: 0;
  right: 0;
  left: 0;
  overflow: auto;
}
.top-bar {
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  overflow: auto;
}
.underline {
  cursor: pointer;
}

.second-layer {
  background-color: rgb(21, 184, 184);
}

.window {
  /* min-height: 70vh; */
}
</style>

<style>
@import url("https://fonts.googleapis.com/css2?family=PT+Serif&display=swap");
.logo {
  /* filter: invert(100%);
  -webkit-filter: invert(100%); */
  height: 2.5rem;
}
</style>
