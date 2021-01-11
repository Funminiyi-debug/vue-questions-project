<template>
  <div class="jumbotron">
    this is the end screen Quiz ended!! <br /><br />

    Score:
    <div class="btn btn-light btn-lg my-5">{{ results.score }}%</div>
    <br /><br />
    <router-link v-bind:to="getUrl" class="btn btn-success">Review</router-link>
    <div class="btn" @click="logout">Logout</div>
  </div>
</template>

<script>
import { baseUrl } from "../api/routes";
import axios from "axios";
export default {
  name: "End",
  props: ["results"],
  watch: {
    $route(to, from) {
      console.log(to.params.username);
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
      const res = await axios.post(`${baseUrl}/logout`);
      alert("log out successful");
    }
  }
};
</script>
