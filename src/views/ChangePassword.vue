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
                    placeholder="Enter your old password"
                    v-model="oldPassword"
                    required
                  />
                </div>
                <div class="form-group">
                  <input
                    type="password"
                    class="form-control"
                    placeholder="enter new password"
                    v-model="newPassword"
                    required
                  />
                </div>
                <div class="form-group">
                  <input
                    type="password"
                    class="form-control"
                    placeholder="reenter new password"
                    v-model="newPassword2"
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
                    Submit
                  </button>
                </div>

                <hr />
                <div class="actions align-left">
                  <!-- <span class="additional-link">New here?</span> -->
                  <router-link to="/change-password" class="btn btn-dark"
                    >Change Password</router-link
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
import handleError from "../mock/handleError";
export default {
  name: "change-password",

  components: {
    Navigation
  },
  data() {
    return {
      email: "",
      oldPassword: "",
      newPassword: "",
      newPassword2: "",
      error: false,
      user: "",
      disableButton: false
    };
  },
  methods: {
    // handle error function
    handleError: handleError,
    // submit user form
    async handleSubmit(e) {
      e.preventDefault();
      this.disableButton = true;
      if (this.newPassword != this.newPassword2) {
        this.$toasted.error("Password does not match");
        return;
      }
      const newUser = {
        email: this.email,
        oldPassword: this.oldPassword,
        newPassword: this.newPassword,
        newPassword2: this.newPassword2
      };
      this.changePassword(newUser);

      return;
    },
    // add user function
    async changePassword(user) {
      let success = false;
      await axios({
        url: `${baseUrl}/users/reset-password`,
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        data: user
      })
        .then(res => {
          //   this.user = res.data.user;
          success = res.success;
          this.disableButton = false;
          return this.$router.push(`/`);
        })
        .catch(err => {
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
