<template
  ><div class="body">
    <div class="authentication">
      <form @submit="handleSubmit" enctype="application/json" class="container">
        <div class="row justify-content-md-center">
          <div class="col-xl-4 col-lg-5 col-md-6 col-sm-12">
            <div class="login-screen">
              <div class="login-box text-justify">
                <a href="#" class="login-logo">
                  <img alt="Logo" src="../assets/brand-logo.png" class="logo" />
                </a>
                <h5>Create An Account</h5>
                <div class="form-group">
                  <input
                    type="text"
                    class="form-control"
                    placeholder="Full Name"
                    v-model="name"
                    required
                  />
                </div>
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

                <div class="actions mb-4">
                  <button type="submit" class="btn bg-red-1 text-white">
                    Register and Start Quiz
                  </button>
                </div>
                <hr />
                <div class="actions align-left">
                  <span class="additional-link">Have an Account?</span>
                  <router-link to="/" class="btn btn-dark">Login</router-link>
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
import axios from "axios";
import handleError from "../mock/handleError";
export default {
  name: "intro-screen",
  data() {
    return {
      name: "",
      email: "",
      password: "",
      error: false,
      user: ""
    };
  },
  methods: {
    handleError: handleError,
    // submit user form
    async handleSubmit(e) {
      e.preventDefault();
      this.disableButton = true;

      const newUser = {
        name: this.name,
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
        url: `${baseUrl}/register`,
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
          console.log(res.data.user);
          return this.$router.push(`/choose-exam`);
        })
        .catch(err => {
          this.disableButton = false;
          console.log(err);
          this.handleError(err);
        });

      return success;
    }
  }
};
</script>

<style scoped>
.option {
  padding: 10px;
}
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
