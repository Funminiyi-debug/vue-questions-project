<template
  ><div>
    <div v-if="users.length == 0">
      Loading...
    </div>
    <!-- change this area later when network comes -->
    <div class="container " v-if="users.length > 0">
      <!-- to here back to greater than -->
      <h1 class="h4 my-3 py-5">
        Admin dashboard
      </h1>
      <hr class="hr" />
      <div class="row">
        <router-link
          to="/admin/add-question"
          class="btn btn-info mr-auto col-6"
        >
          Add Passage</router-link
        >
        <router-link
          to="/admin/check-questions"
          class="btn btn-danger col-6 ml-auto"
          >Subjects</router-link
        >
      </div>
      <div class="row">
        <h1 class="h5 text-center my-4 m-auto">Students</h1>
        <table class="table">
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
                  :to="{ name: 'student-result', params: { id: user._id } }"
                  >{{ user.name }}</router-link
                >
              </td>
              <td>{{ user.email }}</td>
            </tr>
          </tbody>
        </table>
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
      this.fetchUsers();
    });
  },
  data() {
    return {
      users: []
    };
  },
  methods: {
    async fetchUsers() {
      try {
        const res = await axios.get(`${baseUrl}/users`);
        this.$store.commit("getAllUsers", res.data.users);
        this.users = [...res.data.users];
      } catch (error) {
        console.log(error);
      }
    }
  }
};
</script>

<style scoped>
.btn {
  border-radius: 0 !important;
}
</style>
