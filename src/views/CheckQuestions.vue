<template>
  <div class="container">
    <h1 class="h3 font-weight-bold">Subjects</h1>

    <ul class="list-group my-5">
      <li
        class="list-group-item text-justify btn-light"
        v-for="(subject, index) in subjects"
        v-bind:key="index"
      >
        <router-link
          :to="{ name: 'all-passages', params: { subjectid: subject._id } }"
        >
          {{ subject.name }}</router-link
        >
        <span class="float-right">
          <button class="btn btn-danger" @click="handleDelete(subject._id)">
            Delete
          </button></span
        >
      </li>
    </ul>

    <div class="form-group">
      <input
        type="text"
        name="subject"
        class="form-control"
        v-model="subject"
      />
    </div>
    <button class="btn btn-danger" @click="addSubject">Add Subject</button>
  </div>
</template>

<script>
import axios from "axios";
import { baseUrl } from "../api/routes";
export default {
  name: "check-questions",
  data() {
    return {
      subjects: [],
      subject: ""
    };
  },
  mounted() {
    this.$nextTick(() => {
      const isAdmin = this.$store.getters.isAdmin;
      if (!isAdmin) {
        this.$router.push("/admin-login");
      }
      this.fetchSubjects();
    });
  },
  methods: {
    async fetchSubjects() {
      try {
        const res = await axios.get(`${baseUrl}/subjects`);
        this.subjects = [...res.data.subjects];
      } catch (error) {
        console.log(error);
      }
    },
    async addSubject() {
      try {
        const res = await axios.post(`${baseUrl}/subjects`, {
          name: this.subject
        });
        this.fetchSubjects();
        this.subject = "";
      } catch (error) {
        alert("Server error");
        console.log(error);
      }
    },
    async handleDelete(id) {
      try {
        const res = await axios.delete(`${baseUrl}/subjects/${id}`);
      } catch (error) {
        console.log(error);
      }
      this.subjects = this.subjects.filter(element => element._id != id);
    }
  }
};
</script>
