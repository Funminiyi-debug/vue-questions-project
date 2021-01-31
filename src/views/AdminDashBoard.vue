<template
  ><div>
    <div v-if="users.length == 0">
      <div class="text-center my-5">
        <div class="spinner-border">
          <span class="sr-only">Loading...</span>
        </div>
      </div>
    </div>
    <!-- change this area later when network comes -->
    <div class=" container" v-if="users.length > 0">
      <h1 class="styled">Dashboard</h1>
      <div class="row gutters">
        <div class="col-md-6 col-sm-6 col-12">
          <router-link to="/admin/add-question">
            <div class="info-stats4 icons">
              <div class="info-icon">
                <i class="fa fa-book fa-lg text-red-1 " aria-hidden="true"></i>
              </div>
              <div class="sale-num mx-3">
                <h5 class="text-danger">Add Passages</h5>
                <!-- <p>Orders</p> -->
              </div>
            </div>
          </router-link>
        </div>
        <div class=" col-md-6 col-sm-6 col-12">
          <router-link to="/admin/check-questions">
            <div class="info-stats4 icons">
              <div class="info-icon">
                <i
                  class="fa fa-columns fa-lg text-red-1"
                  aria-hidden="true"
                ></i>
              </div>
              <div class="sale-num mx-3 hover:text-white">
                <h5 class="text-danger">Subjects</h5>
              </div>
            </div>
          </router-link>
        </div>
      </div>

      <h3 class="styled">Students</h3>
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
  name: "Admin",
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
    }
  }
};
</script>
<style scoped>
@import url("../assets/fonts/style.css");
</style>
<style scoped>
.btn {
  border-radius: 0 !important;
}
.icons:hover,
.icons p:hover {
  background-color: rgb(172, 168, 168);
  text-decoration: none;
}

.icons p {
  color: black !important;
}

.icons p:hover {
  color: white;
}

a {
  text-decoration: none !important;
}
</style>
