<template>
  <div class="body">
    <div class="authentication">
      <form @submit="submit" enctype="application/json" class="container">
        <div class="row justify-content-md-center">
          <div class="col-xl-4 col-lg-5 col-md-6 col-sm-12">
            <div class="login-screen">
              <div class="login-box text-justify">
                <a class="login-logo">
                  <img alt="Logo" src="../assets/brand-logo.png" class="logo" />
                </a>
                <h5>Admin Only</h5>
                <div class="form-group">
                  <input
                    type="text"
                    class="form-control"
                    placeholder="Username"
                    v-model="username"
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
                  <button type="submit" class="btn bg-red-1 text-white">
                    Proceed to Dashboard
                  </button>
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
export default {
  name: "admin-login",
  data() {
    return {
      username: "",
      password: "",
      adminPassword: "$elephantslovetoridedonkeys504",
      adminEmail: "superadmin123"
    };
  },
  methods: {
    submit(e) {
      e.preventDefault();

      if (
        this.username == this.adminEmail &&
        this.password == this.adminPassword
      ) {
        this.$store.commit("isAdmin", true);
        this.$router.push("/admin");
        return;
      } else {
        alert("Password or email is incorrect");
      }
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
