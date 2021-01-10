<template>
  <div id="app">
    <router-view
      v-on:user="getUser"
      v-bind:user="user"
      v-on:results="addResults"
      v-bind:results="results"
    />
  </div>
</template>

<script>
export default {
  name: "app",
  data() {
    return {
      user: "",
      results: ""
    };
  },
  created() {
    this.user = this.$store.getters.user;
    this.results = this.$store.getters.results;
  },

  methods: {
    getUser(userSent) {
      this.$store.commit("addUser", userSent);
      this.user = userSent;
    },
    addResults(resultGotten) {
      this.$store.commit("addResults", resultGotten);
      this.results = resultGotten;
    }
  }
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
