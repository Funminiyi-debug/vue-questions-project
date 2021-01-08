<template
  ><div>
    <div class="about"><router-link to="/home">Start</router-link></div>
    <center>Welcome to the Examination. Goodluck!</center>
    <!-- <div v-bind:class="{"error":this.error}">An error occured... try again</div> -->
    <!-- @submit="handleSubmit" -->
    <form class="container" @submit="handleSubmit" enctype="application/json">
      <br />
      <div class="form-control-group row">
        <label for="name" class="col-2 form-control-label">Name:</label>
        <input
          type="text"
          name="name"
          id="name"
          class="form-control col-10"
          placeholder="Insert your name"
          v-model="name"
          required
        />
      </div>
      <br />
      <div class="form-control-group row">
        <label for="email" class="form-control-label col-2">Email:</label>
        <input
          type="email"
          name="email"
          id="email"
          class="form-control col-10"
          placeholder="insert your email"
          v-model="email"
          required
        />
      </div>
      <br />
      <div class="form-control-group">
        <label for="subjects" class="px-5">Select Your Subject</label>
        <select
          name="Subjects"
          id="subjects"
          class="option"
          v-model="subject"
          required
        >
          <option v-for="subject of subjects" :value="subject">{{
            subject.name
          }}</option>
        </select>
      </div>
      <br />
      <input type="submit" value="Start Quiz" class="btn btn-dark" />
    </form>
  </div>
</template>

<script>
import { baseUrl } from "../api/routes";
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
        email: this.email
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
        let res = await fetch(`${baseUrl}/users`, {
          method: "post",
          body: JSON.stringify(user),
          headers: {
            "Content-Type": "application/json"
          }
        });
        this.handleError(res);
        res = await res.json();
        success = res.success;
        this.user = res.message;
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
