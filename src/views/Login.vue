<template
  ><div>
    <div v-if="subjects.length > 0">
      <div class="about"></div>
      <center>Welcome to the Examination. Goodluck!</center>
      <!-- <div v-bind:class="{"error":this.error}">An error occured... try again</div> -->
      <!-- @submit="handleSubmit" -->
      <form
        class="container px-5"
        @submit="handleSubmit"
        enctype="application/json"
      >
        <br />

        <br />
        <div class="form-control-group row">
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
        <div class="form-control-group row">
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
            >
              {{ subject.name }}</option
            >
          </select>
        </div>
        <br />
        <input type="submit" value="Continue" class="btn btn-dark bg-red-1" />
      </form>
    </div>
    <div v-if="subjects.length == 0">Loading...</div>
  </div>
</template>

<script>
import { baseUrl } from "../api/routes";
import Navigation from "../components/Navigation.vue";

export default {
  name: "login-screen",
  async created() {
    await this.fetchSubjects();
  },
  components: {
    Navigation
  },
  data() {
    return {
      subjects: [],
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
    // handle error function
    handleError(error) {
      if (error.status == 409) {
        alert("Oops! User already exist");
        return;
      }
      if (error.status == 500) {
        alert("Server Error, please try again");
        return;
      }

      if (error.status == 401) {
        alert("Password or username incorrect");
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
        email: this.email,
        password: this.password
      };
      const success = await this.addUser(newUser);

      if (success) {
        this.$emit("user", this.user);
        return this.$router.push(`Home/${this.subject._id}`);
      }
      return;
    },
    // add user function
    async addUser(user) {
      let success = false;
      try {
        let res = await fetch(`${baseUrl}/login`, {
          method: "post",
          body: JSON.stringify(user),
          headers: {
            "Content-Type": "application/json"
          }
        });
        this.handleError(res);
        res = await res.json();
        success = res.success;
        this.user = res.user;
      } catch (error) {}
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
