<template>
  <div>
    <div>
      <div v-if="users.length == 0">
        <div class="text-center my-5">
          <div class="spinner-border">
            <span class="sr-only">Loading...</span>
          </div>
        </div>
      </div>
    </div>
    <div v-if="users.length > 0" class="container">
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
                <router-link to="/admin/students" class="nav-link active"
                  >Students</router-link
                >
              </li>
              <li class="nav-item">
                <router-link to="/admin/check-questions" class="nav-link "
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
      <h3 class="styled mt-5">Students</h3>
      <div class="row ">
        <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
          <div class="table-container">
            <div class="table-responsive">
              <table class="table custom-table m-0">
                <thead>
                  <th>S/N</th>
                  <th>Name</th>
                  <th>Email</th>
                </thead>
                <tbody>
                  <tr v-for="(user, index) in users" v-bind:key="index">
                    <td>{{ index + 1 }}</td>
                    <td class="text-info">
                      <router-link
                        :to="{
                          name: 'student-result',
                          params: { id: user._id }
                        }"
                        >{{ user.name }}</router-link
                      >
                    </td>
                    <td>{{ user.email }}</td>
                    <td>
                      <button
                        class="btn btn-danger"
                        @click="handleDelete(user._id)"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import { baseUrl } from "../api/routes";

export default {
  name: "StudentsList",
  mounted() {
    this.$nextTick(() => {
      const isAdmin = this.$store.getters.isAdmin;
      if (!isAdmin) {
        this.$router.push("/admin-login");
      }
      this.fetchUsers();
      this.fetchSubjects();
    });
  },
  data() {
    return {
      users: []
    };
  },
  methods: {
    async fetchSubjects() {
      try {
        let res = await fetch(`${baseUrl}/subjects`);
        // this.handleError(res);
        res = await res.json();
        const allSubjects = [...res.subjects];
        // this.$store.commit("allSubjects", allSubjects);
      } catch (error) {
        console.log(error);
      }
    },
    async fetchUsers() {
      if (this.$store.getters.allUsers.length > 0) {
        this.users = this.$store.getters.allUsers;
        return;
      }
      try {
        const res = await axios.get(`${baseUrl}/users`);
        this.$store.commit("getAllUsers", res.data.users);
        this.users = [...res.data.users];
      } catch (error) {
        console.log(error);
      }
    },
    // Delete
    async handleDelete(id) {
      try {
        const res = await axios.delete(`${baseUrl}/users/${id}`);
      } catch (error) {
        console.log(error);
      }
      this.users = this.users.filter(element => element._id != id);
    },
    async fetchMetrics() {
      await axios
        .get(`${baseUrl}/dashboard/metrics`)
        .then(res => {
          this.metrics = res.data.response;
        })
        .catch(err => {
          console.log(err);
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
