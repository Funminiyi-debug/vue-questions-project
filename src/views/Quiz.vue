<template>
  <div class="lg:text-sm">
    <div
      class="bg-red-1 h-10 text-white items-center px-2 text-xs flex justify-between border-b border-white"
    >
      <div class="font-sans">
        Medical College Admission Test
        <!-- <span>{{ dateMonth }} {{ dateDay }}</span> -->
      </div>
      <!-- <img alt="Vue logo" src="./assets/logo.jpeg" /> -->
      <i class="fab fa-stumbleupon fa-3x"></i>
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
      class="bg-red-2 border-b text-xs text-white border-white flex items-center px-2 justify-between"
    >
      <div class="flex">
        <div class="cursor-pointer">
          <span class="underline">H</span>ighlight
        </div>
        <div class="pl-8 flex items-center">
          <i class="fas fa-pen"></i>
          <span class="pl-4 underline">Strikethrough</span>
        </div>
      </div>
      <div class="flex justify-end items-center">
        <i class="fas fa-flag"></i>
        <div class="pl-3"><span class="underline">Flag for Review</span></div>
      </div>
    </div>
    <div class="bg-teal-1 h-5 lg:block hidden">
      <div class="grid grid-cols-2">
        <div></div>
      </div>
    </div>
    <div class="lg:grid lg:grid-cols-2 bg-red-1 h-full">
      <passage
        v-bind:passage="currentPassage"
        v-bind:activePassage="activePassage"
        v-bind:activeQuestion="activeQuestion"
        v-on:prev_passage="prevPassage"
        v-on:next_passage="nextPassage"
      ></passage>
      <div>
        <!-- v-bind:userAnswer="currentUserAnswer" -->
        <question
          v-bind:question="currentQuestion"
          v-bind:activeQuestion="activeQuestion"
          v-on:answer-choice="selectAnswer"
          v-bind:userAnswer="currentUserAnswer"
        ></question>
      </div>
    </div>
    <progressbar v-bind:percentage="percentage" />
    <div class="bg-red-1 flex items-center h-12 justify-end text-white pr-8">
      <div
        @click="previous"
        class="flex items-center px-4 border-l cursor-pointer  hover:text-teal-1"
      >
        <i class="fas fa-arrow-left"></i>
        <div class="pl-2"><span class="underline">P</span>revious</div>
      </div>
      <div class="flex items-center px-4 border-l">
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
        <span class="underline">N</span>ext
        <i class="fas fa-arrow-right"></i>
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
import allPassages from "../mock/data";
import { baseUrl } from "../api/routes";

export default {
  components: {
    Passage,
    Question,
    Progressbar
  },
  name: "Home",
  mounted() {
    this.startTimer();
  },
  computed: {
    currentUserAnswer() {
      if (this.userVisitedQuestions.questionsAnswered.length > 0) {
        const theQuestion = this.userVisitedQuestions.questionsAnswered.find(
          bank => bank.question.description == this.currentQuestion.description
        );
        if (theQuestion) {
          return theQuestion.userAnswer;
        }
      }
      return "";
    }
  },
  unmounted() {
    clearInterval(this.timer);
  },
  watch: {
    $route(to, from) {
      console.log("this ran");
      console.log(to.params.subjectid);
      this.fetchPassages(to.params.subjectid);
    }
  },
  data() {
    return {
      userVisitedQuestions: {
        username: "FUnminiyi",
        email: "the.real.el.honrad@gmail.com",
        questionsAttempted: [],
        questionsAnswered: []
      },
      get currentQuestion() {
        return this.passages[this.activePassage].questions[this.activeQuestion];
      },
      get currentPassage() {
        return this.passages[this.activePassage];
      },
      activeQuestion: 0,
      activePassage: 0,
      dateMonth: moment().format("MMMM"),
      dateDay: moment().format("Do"),
      passages: [...allPassages],
      passage: allPassages[0],
      // progress bar
      get percentage() {
        return parseInt((this.activePassage / this.passages.length) * 100);
      },

      // timer
      timer: 0,
      seconds: 0,
      counter: "00:00:00"
    };
  },
  methods: {
    async fetchPassages(id) {
      console.log("getting passages");
      try {
        let res = await fetch(`${baseUrl}/subjects/${id}`, {
          method: "get"
        });

        res = await res.json();
        console.log(res);

        // this.passages = res.passages;
      } catch (error) {
        console.error(error);
        this.handleError(error);
      }
    },
    next() {
      if (this.activeQuestion + 1 < this.passage.questions.length) {
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
      return this.$router.push({ name: "End" });
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
        value => value.question.description == this.currentQuestion.description
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
          // subject: this.subject,
          question: this.currentQuestion,
          userAnswer: userAnswer
        };
        this.userVisitedQuestions.questionsAnswered.push(payload);
      }
    },
    // questions viewed
    handleQuestionViewed() {
      const hasBeenViewed = this.userVisitedQuestions.questionsAttempted.find(
        value => value.description == this.currentQuestion.description
      );

      if (!hasBeenViewed) {
        this.userVisitedQuestions.questionsAttempted.push(this.currentQuestion);
      }
      return;
    }
  }
};
</script>

<style src="../assets/css/tailwind.css"></style>

<style>
@import url("https://fonts.googleapis.com/css2?family=PT+Serif&display=swap");
</style>
