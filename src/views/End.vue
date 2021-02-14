<template>
  <div class="jumbotron">
    Quiz Finished <br /><br />

    Score:
    <div class="btn btn-light btn-lg my-5">
      {{ results.score != undefined ? results.score.toFixed(2) : "0.00" }}%
    </div>
    <br /><br />
    <router-link v-bind:to="getUrl" class="btn bg-red-1 text-white"
      >Review</router-link
    >
    <div class="btn" @click="logout">Logout</div>
  </div>
</template>

<script>
export default {
  name: "End",
  props: ["results"],
  watch: {
    $route(to, from) {
      this.username = to.params.username;
      this.subjectid = to.params.subjectid;
    }
  },
  created() {
    this.username = this.$route.params.username;
    this.subjectid = this.$route.params.subjectid;
  },
  computed: {
    getUrl() {
      return `/review/${this.subjectid}`;
    }
  },
  data() {
    return {
      username: "",
      subjectid: ""
    };
  },
  methods: {
    async logout() {
      this.$store.dispatch("logout");
      this.$router.push("/");
    }
  }
};
</script>
