<template>
  <div class="body">
    <div class="authentication" v-if="subjects.length > 0">
      <form @submit="handleSubmit" enctype="application/json" class="container">
        <div class="row justify-content-md-center">
          <div class="col-xl-4 col-lg-5 col-md-6 col-sm-12">
            <div class="login-screen">
              <div class="login-box text-justify">
                <a href="#" class="login-logo">
                  <img alt="Logo" src="../assets/brand-logo.png" class="logo" />
                </a>
                <h5>Welcome back,<br />Please Login to your Account.</h5>
                <div class="form-group">
                  <input
                    type="text"
                    class="form-control"
                    placeholder="Email Address"
                    v-model="email"
                    required
                  />
                </div>
                <div class="form-group">
                  <input
                    type="password"
                    class="form-control"
                    placeholder="Password"
                    v-model="password"
                    required
                  />
                </div>
                <div>
                  <div class="form-group">
                    <select class="form-control" v-model="subject">
                      <option
                        v-for="(subject, index) of subjects"
                        :value="subject"
                        v-bind:key="index"
                      >
                        {{ subject.name }}</option
                      >
                    </select>
                  </div>
                </div>
                <div class="actions mb-4">
                  <button type="submit" class="btn bg-red-1 text-white">
                    Login
                  </button>
                </div>

                <hr />
                <div class="actions align-left">
                  <span class="additional-link">New here?</span>
                  <router-link to="/signup" class="btn btn-dark"
                    >Create an Account</router-link
                  >
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
    <div v-if="subjects.length == 0">
      <div class="text-center my-5">
        <div class="spinner-border">
          <span class="sr-only">Loading...</span>
        </div>
      </div>
    </div>
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
/* .background {
  background-color: rgb(49, 49, 49);
  margin: 0;
  height: 100vh;
  width: 100%;
} */
.logo {
  margin: 0 auto;
}

.authentication {
  height: 100vh;
}
.body {
  min-height: 100%;
}
</style>
<style scoped>
@import "../assets/css/main.css";
</style>
