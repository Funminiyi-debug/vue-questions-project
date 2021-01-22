<template>
  <div class="jumbotron h-screen">
    <h3 class="styled">Subjects</h3>

    <div class="container">
      <div class=" col-12 my-5">
        <div class="list-group text-justify">
          <router-link
            :to="{ name: 'all-passages', params: { subjectid: subject._id } }"
            href="#"
            class="list-group-item list-group-item-action"
            v-for="(subject, index) in subjects"
            v-bind:key="index"
          >
            {{ subject.name }}
            <span class="float-right">
              <button
                class="btn btn-danger btn-sm"
                @click="handleDelete(subject._id)"
              >
                Delete
              </button></span
            >
          </router-link>
        </div>
      </div>

      <div class="form-group mx-sm-3 mb-3 row">
        <label for="inputPassword2" class="sr-only">Enter Subject</label>
        <input
          type="text"
          class="form-control col-8 form-control-sm"
          id="inputPassword2"
          placeholder="Enter Subject"
          v-model="subject"
        />
        <button
          type="submit"
          class="btn btn-danger mb-2 col-4 btn-sm"
          @click="addSubject"
        >
          Add Subject
        </button>
      </div>
    </div>
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
