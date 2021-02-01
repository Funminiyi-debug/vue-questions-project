<template>
  <div class="body">
    <div class="authentication">
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
                <div></div>
                <div class="actions mb-4">
                  <button
                    type="submit"
                    class="btn bg-red-1 text-white"
                    :disabled="disableButton"
                  >
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
  </div>
</template>

<script>
import { baseUrl } from "../api/routes";
import Navigation from "../components/Navigation.vue";
import axios from "axios";
export default {
  name: "login-screen",

  components: {
    Navigation
  },
  data() {
    return {
      email: "",
      password: "",
      error: false,
      user: "",
      disableButton: false
    };
  },
  methods: {
    // handle error function
    handleError(err) {
      alert(err.message);
    },
    // submit user form
    async handleSubmit(e) {
      e.preventDefault();
      this.disableButton = true;
      const newUser = {
        email: this.email,
        password: this.password
      };
      this.addUser(newUser);

      return;
    },
    // add user function
    async addUser(user) {
      let success = false;
      await axios({
        url: `${baseUrl}/login`,
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        data: user
      })
        .then(res => {
          this.user = res.data.user;
          success = res.success;
          this.disableButton = false;
          this.$emit("user", this.user);
          return this.$router.push(`/choose-exam`);
        })
        .catch(err => {
          console.log(err);
          this.disableButton = false;
          this.handleError(err);
        });
      return success;
    }
  }
};
</script>
<style scoped>
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
