<template>
  <div class="container bg-dark">
    <div id="particles-js"></div>
    <div class="countdown-bg"></div>

    <div class="error-screen">
      <h1>404</h1>
      <h5>We're sorry!<br />The page you have requested cannot be found.</h5>
      <router-link to="/" class="btn btn-primary"
        >Go back to Dashboard</router-link
      >
    </div>
  </div>
</template>
<script>
export default {
  name: "NotFound",
  mounted() {
    this.$nextTick(() => {
      const particlejs = document.createElement("script");
      const jquery = document.createElement("script");
      // const bootstrap = document.createElement("script");
      const particlesError = document.createElement("script");
      const moment = document.createElement("script");
      jquery.setAttribute("src", "../assets/js/jquery.min.js");
      // bootstrap.setAttribute("src", "../assets/js/bootstrap.bundle.min.js");
      moment.setAttribute("src", "../assets/js/moment");
      particlesError.setAttribute(
        "src",
        "../assets/vendor/particles/particles-custom-error.js"
      );
      particlejs.setAttribute(
        "src",
        "../assets/vendor/particles/particles.min.js"
      );
      particlejs.async = true;
      particlesError.async = true;
      jquery.async = true;
      // bootstrap.async = true;
      moment.async = true;
      document.head.appendChild(particlesError);
      document.head.appendChild(jquery);
      // document.head.appendChild(bootstrap);
      document.head.appendChild(moment);
      document.head.appendChild(particlejs);
    });
  }
};
</script>

<style scoped>
@import url("../assets/vendor/particles/particles.css");
</style>
<style scoped>
.container {
  margin-top: 20%;
  /* margi: auto; */
}
</style>
