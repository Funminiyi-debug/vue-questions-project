<template>
  <div class="bg-white mx-1 px-4 h-full">
    <div class="font-bold text-lg pt-6 pb-2">
      Question {{ activeQuestion + 1 }}
    </div>
    <div
      class="pl-10"
      v-for="(section, index) in question.description.match(/[^\r\n]+/g)"
      v-bind:key="`question_${index}`"
    >
      {{ section }}
    </div>
    <div class="text-xs">
      <div class="flex-col flex">
        <i class="fas fa-question-circle"></i>
        <div>Solution</div>
      </div>
    </div>
    <div class="pl-10">
      <form>
        <div
          v-for="(solution, index) in question.alternatives"
          :key="index"
          class="flex pb-4 items-center"
        >
          <!-- :id="solution.id" -->
          <input
            v-bind:disabled="inReview == true"
            class="mr-2"
            type="radio"
            :value="solution.text"
            v-model="picked"
          />
          <!-- :checked="userAnswer" -->
          <label :for="solution.id"
            ><span class="font-bold pr-2">{{ options[index] }}.</span>
            <span class="font-semibold">{{ solution.text }}</span></label
          >
        </div>
        <!-- <input type="submit" value="submit" class="btn btn-danger" /> -->
        <div class="text-info py-5" v-if="inReview == true">
          You chose: {{ userAnswer }} <br />
          Correct Answer: {{ correctAnswer }} <br />
          <span class="text-justify">
            Explanation: {{ question.answerExplanation }}
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

<style></style>
