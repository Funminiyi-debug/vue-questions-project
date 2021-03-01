<template>
  <div>
    <div v-if="metrics == ''">
      <div class="text-center my-5">
        <div class="spinner-border">
          <span class="sr-only">Loading...</span>
        </div>
      </div>
    </div>
    <div class="container" v-if="metrics != ''">
      <h3 class="styled">Results</h3>
      <!-- <hr class="hr" /> -->
      <div class="container my-5 name ">
        <dl class="row">
          <dt class="col-3 text-justify">Name</dt>
          <dd class="col-9 text-left">
            {{ user.name }}
          </dd>
          <dt class="col-3 text-justify">Email</dt>
          <dd class="col-9 text-left">
            {{ user.email }}
          </dd>
          <dt class="col-3 text-justify">Average Time Taken</dt>
          <dd class="col-9 text-left">
            {{ metrics.averageTimeTaken }}
          </dd>
          <dt class="col-3 text-justify">Average Percentage Correct</dt>
          <dd class="col-9 text-left">
            {{ metrics.percentCorrect }}
          </dd>
        </dl>
      </div>
      <div class="container">
        <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
          <div class="table-container">
            <div class="table-responsive">
              <table
                class="table custom-table m-0"
                v-if="user.subjects.length > 0"
              >
                <thead>
                  <th>S/N</th>
                  <th>Subject</th>
                  <th>Score</th>
                  <th>Time Taken</th>
                </thead>
                <tbody>
                  <tr
                    v-for="(subject, index) in user.subjects"
                    v-bind:key="index"
                  >
                    <td>{{ index + 1 }}</td>
                    <td class="text-info">
                      {{ subject.subject.name }}
                    </td>
                    <td>{{ subject.score.toFixed(2) }}</td>
                    <td>{{ subject.counter }}</td>
                  </tr>
                </tbody>
              </table>
              <div v-else>No Results yet</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { baseUrl } from "../api/routes";
import axios from "axios";
import handleError from "../mock/handleError";
export default {
  name: "user-student-result",
  data() {
    return {
      user: {
        name: "",
        email: "",
        subjects: [],
        subjectName: ""
      },
      metrics: ""
    };
  },
  mounted() {
    this.$nextTick(() => {
      this.user = this.$store.getters.user;
      const isLoggedIn = this.$store.getters.isLoggedIn;
      if (!isLoggedIn) return this.$router.push("/");

      //   this.fetchUser(this.$route.params.id);
      this.fetchUserMetrics(this.user._id);
    });
  },

  methods: {
    async fetchUser(id) {
      try {
        const res = await axios({
          method: "GET",
          url: `${baseUrl}/users/${id}`
        });
        this.user = res.data.user;
      } catch (error) {
        console.log(error);
        this.handleError(error);
      }
    },
    async fetchUserMetrics(userid) {
      try {
        const res = await axios({
          method: "GET",
          url: `${baseUrl}/dashboard/users/metrics?userid=${userid}`
        });
        this.metrics = res.data.response;
      } catch (error) {
        console.log(error);
        this.handleError(error);
      }
    },
    handleError: handleError
  }
};
</script>

<style scoped>
.name {
  margin-top: 3rem !important;
  margin-bottom: 3rem !important;
  margin-left: 3rem;
}

.name dd,
.name dt {
  margin-bottom: 1.5rem;
}
</style>
