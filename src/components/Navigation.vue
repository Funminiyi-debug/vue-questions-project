<template>
  <!-- Modal -->
  <b-modal id="modal-1" title="Passages" class="d-flex flex-row">
    <button
      type="button"
      class="btn btn-light btn-sm mx-2"
      v-bind:class="{ ' border bg-success text-white': question.isViewed }"
      v-for="(question, index) in questions"
      v-bind:key="index"
      @click="navigateToQuestion(question)"
    >
      {{ index + 1 }}
    </button>
  </b-modal>
</template>

<script>
export default {
  name: "navigationbar",
  props: [
    "currentQuestion",
    "currentPassage",
    "passages",
    "userVisitedQuestions"
  ],
  watch: {
    "userVisitedQuestions.questionsAnswered"(to, from) {
      this.questions.map(question => {
        const exists = to.findIndex(
          item => item.question._id == question._id && item.userAnswer != ""
        );

        if (exists != -1) {
          question.isViewed = true;
          return question;
        }
      });

      this.questions.filter(question => question != undefined);
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.passages.forEach(passage => {
        passage.questions.forEach(question => {
          this.questions.push(question);
        });
      });
    });
  },

  data() {
    return {
      questions: []
    };
  },
  methods: {
    navigateToQuestion(question) {
      const payload = {
        questionIndex: 0,
        passageIndex: 0
      };
      this.passages.forEach((passage, passageIndex) => {
        const questionIndex = passage.questions.findIndex(
          item => item._id == question._id
        );
        if (questionIndex != -1) {
          payload.passageIndex = passageIndex;
          payload.questionIndex = questionIndex;
        }
      });
      this.$emit("navigateToQuestion", payload);
      this.$bvModal.hide("modal-1");
    }
  }
};
</script>
