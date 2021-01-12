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
    <div
      class="px-4"
      v-bind:strikethrough="strikethrough"
      v-bind:class="{
        highlight: highlight == true,
        strikethrough: strikethrough == true
      }"
    >
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
// import rangy from "rangy";
// import "../rangy/rangy-core";
// import "../rangy/rangy-cssclassapplier";
import "core-js/features/array/includes";
import "core-js/features/object/assign"; /* eslint-disable */
// import * as rangyClassApplier from "rangy-classapplier";
export default {
  mounted() {
    this.$nextTick(() => {
      this.selection = window.getSelection();
    });
  },
  watch: {
    selection(to, from) {
      console.log(to);
    }
  },

  props: [
    "passage",
    "activePassage",
    "activeQuestion",
    "strikethrough",
    "highlight"
  ],
  data() {
    return {
      highlightToggler: "",
      strikethroughToggler: "",
      selection: ""
    };
  },
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

<style scoped>
.highlight {
  color: red;
  background: yellow;
}

.strikethrough {
  text-decoration: line-through;
}

::-moz-selection {
  color: red;
  background: yellow;
}

::selection {
  color: red;
  background: yellow;
}
</style>
