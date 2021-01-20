<template>
  <div class="bg-white mx-1 mb-12 h-full overflow-auto h-screen passage-window">
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
      <div class="font-bold text-lg pb-2 ">
        Passage {{ activePassage + 1 }} (Questions {{ activeQuestion + 1 }}-{{
          passage.questions.length
        }})
      </div>

      <!-- <div class=""> -->
      <div
        class="pb-2 font-serif text-justify"
        v-for="(section, index) in passage.passage.match(/[^\r\n]+/g)"
        v-bind:key="`passage_${index}`"
      >
        {{ section }}
      </div>
      <div
        class="image-section"
        v-for="(image, index) in passage.passageImages"
        v-bind:key="`image_${index}`"
      >
        <div class="pl-12 m-auto">
          <img :alt="`${image.name}`" :src="returnImage(image.data)" />
        </div>
        <div class="pb-2">
          <span class="text-sm">Figure {{ index + 1 }}</span>
          {{ image.name.substring(0, image.name.lastIndexOf(".")) }}
        </div>
      </div>
      <!-- </div> -->
    </div>
  </div>
</template>

<script>
import "core-js/features/array/includes";
import "core-js/features/object/assign"; /* eslint-disable */
export default {
  mounted() {
    this.$nextTick(() => {
      this.selection = window.getSelection();
    });
  },
  watch: {
    selection(to, from) {
      // console.log(to);
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
    },
    returnImage(image) {
      var bytes = new Uint8Array(image.data);
      var binary = bytes.reduce(
        (data, b) => (data += String.fromCharCode(b)),
        ""
      );
      const src = `data:image/${image.contentType};base64,${btoa(binary)}`;
      return src;
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
.passage-window {
  padding-top: 4rem;
}
</style>
