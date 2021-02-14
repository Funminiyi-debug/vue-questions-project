<template>
  <div class="container h-screen">
    <nav
      class="navbar navbar-expand-lg rounded navbar-dark bg-dark mt-4 sticky-top"
    >
      <div class="container-fluid">
        <router-link class="navbar-brand text-capitalize" to="/admin"
          >Shemmasian</router-link
        >
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item">
              <router-link to="/admin/add-question" class="nav-link"
                >Add Passage</router-link
              >
            </li>
            <li class="nav-item">
              <router-link to="/admin/students" class="nav-link "
                >Students</router-link
              >
            </li>
            <li class="nav-item">
              <router-link to="/admin/check-questions" class="nav-link active"
                >Subjects</router-link
              >
            </li>
          </ul>
          <ul class="navbar-nav ml-auto mb-2 mb-lg-0 text-white">
            <li class="nav-item cursor">
              <span v-on:click="logout()">Logout</span>
            </li>
          </ul>
        </div>
      </div>
    </nav>
    <h3 class="styled mt-3">Subjects</h3>
    <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
      <div class="table-container">
        <div class="table-responsive">
          <table class="table custom-table m-0">
            <thead>
              <th>S/N</th>
              <th>Name</th>
              <th>Average Score</th>
              <th>Average Time Taken</th>
            </thead>
            <tbody>
              <tr v-for="(subject, index) in subjects" v-bind:key="index">
                <td>{{ index + 1 }}</td>
                <td>
                  <router-link
                    :to="{
                      name: 'all-passages',
                      params: { subjectid: subject.subject._id }
                    }"
                  >
                    {{ subject.subject.name }}
                  </router-link>
                </td>
                <td>
                  {{ subject.scores }}
                </td>
                <td>
                  {{ subject.timeTaken }}
                </td>
                <td>
                  <span class="float-right">
                    <button
                      class="btn btn-danger btn-sm"
                      @click="handleDelete(subject.subject._id)"
                    >
                      Delete
                    </button></span
                  >
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
    <div class="container">
      <div class=" col-12 my-5">
        <div class="list-group text-justify"></div>
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
      // this.fetchSubjects();
      this.fetchMetrics();
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
        this.fetchMetrics();
        this.subject = "";
      } catch (error) {
        // alert("Server error");
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
    },
    async fetchMetrics() {
      await axios.get(`${baseUrl}/dashboard/subjects/metrics`).then(res => {
        this.subjects = [...res.data.response.percentageCorrectPerSubject];
      });
    },
    logout() {
      this.$store.commit("isAdmin", false);
      this.$router.push("/admin-login");
    }
  }
};
</script>
<style scoped>
.cursor {
  cursor: pointer;
}
</style>
