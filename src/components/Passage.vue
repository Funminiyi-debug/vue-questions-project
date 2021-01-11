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
      <div
        class="font-bold text-lg pb-2"
        v-bind:strikethrough="strikethrough"
        v-bind:class="{
          highlight: highlight == true,
          strikethrough: strikethrough == true
        }"
      >
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
import rangy from "rangy";
import "core-js/features/array/includes";
import "core-js/features/object/assign"; /* eslint-disable */
export default {
  mounted() {
    this.$nextTick(() => {
      // rangy.init();
      // console.log(rangy);
      // this.highlightToggler = rangy.createCssClassApplier(
      //   "highlight",
      //   this.highlight
      // );
      // // this.strikethroughToggler = rangy.createCssClassApplier(
      //   "strikethrough",
      //   this.strikethrough
      // );
      // $(function() {
      //   $(document).mouseup(function() {
      //     cssApplier.toggleSelection();
      //   });
      // });
    });
  },
  watch: {
    passage(to, from) {
      // this.highlightToggler = rangy.createCssClassApplier("highlight", true);
      // // this.strikethroughToggler = rangy.createCssClassApplier(
      // //   "strikethrough",
      // //   true
      // // );
      // console.log("this is the toggler", this.highlightToggler);
      // $(function() {
      //   $(document).mouseup(function() {
      //     this.highlightToggler.toggleSelection();
      //   });
      // });
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
      strikethroughToggler: ""
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
/* .highlight {
  color: red;
  background: yellow;
} */

.highlight {
  color: red;
  background: yellow;
}

.strikethrough {
  text-decoration: line-through;
}

/* .strikethrough::-moz-selection {
  text-decoration: line-through;
} */
</style>
