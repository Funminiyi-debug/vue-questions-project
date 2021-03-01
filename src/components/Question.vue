<template>
  <div class="bg-white mx-1 px-4 h-full overflow-auto h-screen question-window">
    <div class="font-bold text-lg pt-6 pb-2 text-left">
      <img
        alt="Logo"
        src="../assets/brand-logo.png"
        class="logo-1 m-auto my-3 text-left"
      />

      Question {{ activeQuestion + 1 }}
      <span v-if="inReview == true">
        <span class="text-success" v-if="userAnswer == correctAnswer">✔</span>
        <span class="text-danger" v-if="userAnswer != correctAnswer">❌</span>
      </span>
    </div>
    <div
      class="pl-10 text-left mr-5"
      v-for="(section, index) in question.description.match(/[^\r\n]+/g)"
      v-bind:key="`question_${index}`"
    >
      {{ section }}
    </div>
    <div class="text-xs" v-if="inReview == true">
      <div class="flex-col flex">
        <i class="fas fa-question-circle"></i>
        <div>Solution</div>
      </div>
    </div>
    <div class="pl-10 my-3">
      <form>
        <div
          v-for="(solution, index) in question.alternatives"
          :key="index"
          class="flex pb-4 items-center text-left"
        >
          <!-- :id="solution.id" -->
          <input
            v-bind:disabled="inReview == true"
            class="mr-2 item-start"
            type="radio"
            :value="solution.text"
            v-model="picked"
          />

          <!-- :checked="userAnswer" -->
          <label :for="solution.id"
            ><span class="font-bold pr-2 ">{{ options[index] }}.</span>
            <span class="font-semibold text-left">{{
              solution.text
            }}</span></label
          >
        </div>
        <!-- <input type="submit" value="submit" class="btn btn-danger" /> -->
        <div class="text-info py-5 text-left" v-if="inReview == true">
          <span class="text-bold"> You chose:</span> {{ userAnswer }}
          <br /><br />
          <span class="text-bold"> Correct Answer:</span> {{ correctAnswer }}
          <br /><br />
          <span class="text-left">
            <span class="text-justify text-info">
              <span class="text-bold"> Explanation:</span>
              {{ question.answerExplanation }}
            </span>
          </span>
        </div>
      </form>
      <br />
    </div>
  </div>
</template>

<script>
/* eslint-disable */
export default {
  name: "question",
  props: [
    "question",
    "activeQuestion",
    "userAnswer",
    "inReview",
    "correctAnswer"
  ],

  data() {
    return {
      picked: "",
      options: ["A", "B", "C", "D", "E"]
      // correctAnswer: this.question.alternatives.find(
      //   value => value.isCorrect == true
      // ).text
    };
  },
  watch: {
    picked(newValue, oldValue) {
      if (this.inReview == false) {
        this.$emit("answer-choice", {
          userAnswer: newValue
        });
      }
    },
    question(newValue, oldValue) {
      if (this.userAnswer) {
        this.picked = this.userAnswer;
        return;
      }
      // ========== beta
      // this.correctAnswer = this.question.alternatives.find(
      //   value => value.isCorrect == true
      // ).text;

      // end of beta
      this.picked = "";
    }
  },
  methods: {
    // handleSubmit(e) {
    // }
  }
};
</script>

<style scoped>
.text-left {
  text-align: "center";
}
.logo-1 {
  height: 3rem;
  margin-bottom: 2rem !important;
}
.question-window {
  padding-top: 4rem;
}

.text-bold {
  font-weight: bold;
  margin-top: 1rem;
}
</style>
