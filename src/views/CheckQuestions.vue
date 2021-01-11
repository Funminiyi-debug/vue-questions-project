<template>
  <div class="container">
    <h1 class="h3 font-weight-bold">Subjects</h1>

    <ul class="list-group my-5">
      <li
        class="list-group-item text-justify"
        v-for="(subject, index) in subjects"
        v-bind:key="index"
      >
        {{ subject.name }}
      </li>
    </ul>
  </div>
</template>

<script>
import axios from "axios";
import { baseUrl } from "../api/routes";
export default {
  name: "check-questions",
  data() {
    return {
      subjects: []
    };
  },
  mounted() {
    this.fetchSubjects();
  },
  methods: {
    async fetchSubjects() {
      try {
        const res = await axios.get(`${baseUrl}/subjects`);
        this.subjects = [...res.data.subjects];
      } catch (error) {
        console.log(error);
      }
    }
  }
};
</script>
