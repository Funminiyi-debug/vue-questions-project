<template
  ><div>
    <div v-if="subjects.length > 0">
      <div class="about"></div>
      <center>Welcome to the Examination. Goodluck!</center>
      <!-- <div v-bind:class="{"error":this.error}">An error occured... try again</div> -->
      <!-- @submit="handleSubmit" -->
      <form
        class="container m-auto px-5"
        @submit="handleSubmit"
        enctype="application/json"
      >
        <br />
        <div class="form-control-group row m-4">
          <label for="name" class="col-md-2 col-12 form-control-label"
            >Name:</label
          >
          <input
            type="text"
            name="name"
            id="name"
            class="form-control col-md-10 col-12"
            placeholder="Insert your name"
            v-model="name"
            required
          />
        </div>
        <br />
        <div class="form-control-group row m-4">
          <label for="email" class="form-control-label col-md-2 col-12"
            >Email:</label
          >
          <input
            type="email"
            name="email"
            id="email"
            class="form-control col-md-10 col-12"
            placeholder="insert your email"
            v-model="email"
            required
          />
        </div>
        <br />
        <div class="form-control-group row m-4">
          <label for="email" class="form-control-label col-md-2 col-12"
            >Password:</label
          >
          <input
            type="password"
            name="password"
            id="password"
            class="form-control col-md-10 col-12"
            placeholder="insert your password"
            v-model="password"
            required
          />
        </div>
        <br />
        <div class="form-control-group">
          <label for="subjects" class="px-5">Select Your Subject</label>
          <select
            name="Subjects"
            id="subjects"
            class="option border p-2"
            v-model="subject"
            required
          >
            <!-- <option selected>Open this select menu</option> -->
            <option
              v-for="(subject, index) of subjects"
              :value="subject"
              v-bind:key="index"
              >{{ subject.name }}</option
            >
          </select>
        </div>
        <br />
        <input
          type="submit"
          value="Register and Start Quiz"
          class="btn btn-dark bg-red-1"
        />
      </form>
      <br />
      <p>or <router-link to="/login">Login</router-link></p>
    </div>
    <div v-if="subjects.length == 0">Loading...</div>
  </div>
</template>

<script>
import { baseUrl } from "../api/routes";
import axios from "axios";
export default {
  name: "intro-screen",
  async created() {
    await this.fetchSubjects();
  },
  data() {
    return {
      subjects: [],
      name: "",
      email: "",
      subject: "",
      password: "",
      error: false,
      passages: [],
      user: ""
    };
  },
  methods: {
    async fetchSubjects() {
      try {
        let res = await fetch(`${baseUrl}/subjects`);
        this.handleError(res);
        res = await res.json();
        this.subjects = [...res.subjects];
      } catch (error) {
        console.log(error);
      }
    },
    // handle error functiono
    handleError(error) {
      if (error.status == 409) {
        alert("Oops! User already exist");
        return;
      }
      if (error.status == 500) {
        alert("Server Error, please try again");
        return;
      }
      if (error.status == 400) {
        alert("Ensure all fields are filled");
        return;
      }
      if (error.status == 404) {
        alert("not found");
      }
    },

    // submit user form
    async handleSubmit(e) {
      e.preventDefault();
      const newUser = {
        name: this.name,
        email: this.email,
        password: this.password
      };
      const success = await this.addUser(newUser);

      if (success) {
        return this.$router.push(`Home/${this.subject._id}`);
      }
      return;
    },
    // add user function
    async addUser(user) {
      let success = false;
      console.log("sending user");
      try {
        let res = await axios.post(`${baseUrl}/register`, {
          ...user
        });
        this.handleError(res);
        success = res.data.success;
        this.user = res.data.user;
      } catch (error) {
        console.log(error);
      }
      return success;
    }
  }
};
</script>

<style scoped>
.option {
  padding: 10px;
}
</style>
