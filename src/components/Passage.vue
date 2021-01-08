<template>
  <div class="bg-white mx-1 mb-2 h-full">
    <div class="flex justify-between p-4">
      <button
        class="p-1 hover:bg-red-1 border hover:text-white hover:shadow-lg"
        @click="prevPassage"
      >
        Previous Passage
      </button>
      <button
        class="p-1 hover:bg-red-1 border hover:text-white hover:shadow-lg"
        @click="nextPassage"
      >
        Next Passage
      </button>
    </div>
    <div class="px-4">
      <div class="font-bold text-lg pb-2">
        Passage {{ activePassage + 1 }} (Questions {{ activeQuestion + 1 }}-{{
          passage.questions.length
        }})
      </div>
      <!-- <div class=""> -->
      <div
        class="pb-2 font-serif"
        v-bind:key="index"
        v-for="(section, index) in passage.passage.match(/[^\r\n]+/g)"
      >
        {{ section }}
      </div>
      <!-- </div> -->
    </div>
  </div>
</template>

<script>
/* eslint-disable */
export default {
  props: ["passage", "activePassage", "activeQuestion"],
  methods: {
    nextPassage() {
      this.$emit("next_passage");
    },
    prevPassage() {
      this.$emit("prev_passage");
    }
  }
};
</script>

<style></style>
