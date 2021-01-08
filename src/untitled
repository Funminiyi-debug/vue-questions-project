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
          <div class="px-2">00:00:00</div>
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
          <span class="pl-4 underline">S</span>
          <span>trikethrough</span>
        </div>
      </div>
      <div class="flex justify-end items-center">
        <i class="fas fa-flag"></i>
        <div class="pl-3"><span class="underline">F</span>lag for Review</div>
      </div>
    </div>
    <div class="bg-teal-1 h-5 lg:block hidden">
      <div class="grid grid-cols-2">
        <div>
        </div>
      </div>
    </div>
    <div class="lg:grid lg:grid-cols-2 bg-red-1 h-full">
      <passage></passage>
      <div>
        <question-one v-if="activeQuestion === 'one'"></question-one>
        <question-two v-if="activeQuestion === 'two'"></question-two>
        <question-three v-if="activeQuestion === 'three'"></question-three>
        <question-four v-if="activeQuestion === 'four'"></question-four>
        <question-five v-if="activeQuestion === 'five'"></question-five>
      </div>
    </div>
    <div class="bg-red-1 flex items-center h-12 justify-end text-white pr-8">
      <div @click="previous" class="flex items-center px-4 border-l cursor-pointer  hover:text-teal-1">
        <i class="fas fa-arrow-left"></i> <div class="pl-2"><span class="underline">P</span>revious</div>
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
import Passage from "./components/Passage.vue";
import QuestionThree from "./components/QuestionThree.vue";
import QuestionTwo from "./components/QuestionTwo.vue";
import QuestionOne from "./components/QuestionOne.vue";
import QuestionFour from "./components/QuestionFour.vue";
import QuestionFive from "./components/QuestionFive.vue";

export default {
  components: {
    Passage,
    QuestionThree,
    QuestionOne,
    QuestionTwo,
    QuestionFour,
    QuestionFive,
  },
  name: "App",
  data() {
    return {
      activeQuestion: "one",
      dateMonth: moment().format("MMMM"),
      dateDay: moment().format("Do"),
    };
  },
  methods: {
    next() {
      console.log(this.activeQuestion);
      if (this.activeQuestion === "one") {
        this.activeQuestion = "two";
      } else if (this.activeQuestion === "two") {
        this.activeQuestion = "three";
      } else if (this.activeQuestion === "three") {
        this.activeQuestion = "four";
      } else if (this.activeQuestion === "four") {
        this.activeQuestion = "five";
      }
    },
    previous() {
      if (this.activeQuestion === "three") {
        this.activeQuestion = "two";
      } else if (this.activeQuestion === "four") {
        this.activeQuestion = "three";
      } else if (this.activeQuestion === "five") {
        this.activeQuestion = "four";
      } else if (this.activeQuestion === "two") {
        this.activeQuestion = "one";
      }
    },
    end() {
      alert("The QUIZ HAS ENDED");
    },
  },
};
</script>

<style src='./assets/css/tailwind.css'></style>

<style>
@import url("https://fonts.googleapis.com/css2?family=PT+Serif&display=swap");
</style>

