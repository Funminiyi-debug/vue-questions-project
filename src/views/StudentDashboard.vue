<template
  ><div>
    <div v-if="metrics == ''">
      <div class="text-center my-5">
        <div class="spinner-border">
          <span class="sr-only">Loading...</span>
        </div>
      </div>
    </div>
    <!-- change this area later when network comes -->

    <div class="banner-area" v-if="metrics != ''">
      <div class="container">
        <div class="row">
          <div class="col-12">
            <nav class="navbar navbar-expand-lg rounded navbar-dark bg-dark">
              <div class="container-fluid">
                <span class="navbar-brand text-capitalize">Shemmasian</span>
                <button
                  class="navbar-toggler"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#navbarSupportedContent"
                  aria-controls="navbarSupportedContent"
                  aria-expanded="false"
                  aria-label="Toggle navigation"
                >
                  <span class="navbar-toggler-icon"></span>
                </button>
                <div
                  class="collapse navbar-collapse"
                  id="navbarSupportedContent"
                >
                  <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                    <li class="nav-item">
                      <router-link
                        :to="{
                          name: 'user-student-result',
                          params: { id: user._id }
                        }"
                        class="nav-link"
                        >Results</router-link
                      >
                    </li>
                    <li class="nav-item">
                      <router-link to="/progress-list" class="nav-link"
                        >Progress</router-link
                      >
                    </li>
                  </ul>
                  <ul class="navbar-nav ml-auto mb-2 mb-lg-0 text-white">
                    <li class="nav-item cursor">
                      <span v-on:click="logout()">Logout</span>
                    </li>
                  </ul>
                </div>
              </div>
            </nav>
          </div>
          <!-- Content goes here  -->
          <div class="container mt-5">
            <h3 class="styled">Welcome</h3>
            <div class="row">
              <div class="col-xl-3 col-lg-3 col-md-6 col-sm-6 col-12">
                <div class="info-stats4">
                  <div class="info-icon">
                    <i
                      class="fa fa-book fa-lg text-red-1 "
                      aria-hidden="true"
                    ></i>
                  </div>
                  <div class="sale-num">
                    <h3>{{ metrics.percentCorrect }}%</h3>
                    <p>Percentage Correct</p>
                  </div>
                </div>
              </div>

              <div class="col-xl-3 col-lg-3 col-md-6 col-sm-6 col-12">
                <div class="info-stats4">
                  <div class="info-icon">
                    <i class="icon-eye1"></i>
                  </div>
                  <div class="sale-num">
                    <h3>{{ metrics.averageTimeTaken }}</h3>
                    <p>Average Time Taken</p>
                  </div>
                </div>
              </div>

              <router-link
                to="/choose-exam"
                class="col-xl-3 col-lg-3 col-md-6 col-sm-6 col-12"
              >
                <div class="info-stats4">
                  <div class="info-icon">
                    <i class="icon-eye1"></i>
                  </div>
                  <div class="sale-num">
                    <h3 class="title">Start Exam</h3>
                    <!-- <p>Average Time Taken</p> -->
                  </div>
                </div>
              </router-link>
            </div>
            <!-- <div v-if="user.subjectsSaved.length > 0">
              <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                <div class="table-container">
                  <div class="table-responsive">
                    <table class="table custom-table m-0">
                      <thead>
                        <th>S/N</th>
                        <th>Subject</th>
                        <th>Action</th>
                      </thead>
                      <tbody>
                        <tr
                          v-for="(subject, index) in user.subjectsSaved"
                          :key="index"
                        >
                          <td>{{ index + 1 }}</td>
                          <td class="text-info">
                            {{ subject.subject.name }}
                          </td>
                          <td>
                            <button
                              class="btn btn-sm btn-success text-center"
                              @click="continueProgress(subject)"
                            >
                              Continue
                            </button>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div> -->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { baseUrl } from "../api/routes";
import handleError from "../mock/handleError";

export default {
  name: "Admin",
  mounted() {
    this.$nextTick(() => {
      const user = this.$store.getters.user;
      const isLoggedIn = this.$store.getters.isLoggedIn;
      if (!isLoggedIn || user._id == undefined) {
        this.$router.push("/");
      }
      this.user = user;
      this.fetchSubjects();
      this.fetchUserMetrics(user._id);
    });
  },
  data() {
    return {
      user: "",
      users: [],
      metrics: "",
      subjects: []
    };
  },
  methods: {
    handleError: handleError,
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
    handleError: handleError,
    async fetchSubjects() {
      await axios
        .get(`${baseUrl}/subjects`)
        .then(res => {
          this.subjects = [...res.data.subjects];
        })
        .catch(err => this.handleError(err));
    },
    logout() {
      this.$store.dispatch("logout");
      this.$toasted.success("Logged out successfully!");
      this.$router.push("/");
    }
  }
};
</script>
<style scoped>
@import url("../assets/fonts/style.css");
</style>
<style scoped>
.cursor {
  cursor: pointer;
}
.btn {
  border-radius: 0 !important;
}
/* .icons:hover,
.icons p:hover {
  background-color: rgb(172, 168, 168);
  text-decoration: none;
} */

nav a:hover {
  opacity: 0.6;
}
.card {
  overflow-y: auto;
  height: 300px;
}
/* .icons p {
  color: black !important;
}

.icons p:hover {
  color: white;
} */

a {
  text-decoration: none !important;
}

/* menu=========== */
.menu-area {
  position: static;
}

.mega-area {
  position: absolute;
  left: 0;
  right: 0;
  width: 100%;
  z-index: 1;
  padding: 10px;
}

.font-weight-bold {
  font-weight: bolder;
}

.navbar {
  margin-top: 2%;
}

.mega-area p {
  padding: 5px;
}

.mega-area h5 {
  font-family: Cabin;
}

.mega-area p:hover {
  background-color: rgb(51, 51, 56);
  color: white;
}

/* banner styles */
.banner-area {
  background: rgb(226, 226, 236);
  background-size: cover;
  background-position: center center;
  height: 100vh;
}

.banner-text {
  margin-top: 20%;
  padding: 20px;
  border: 1px white solid;
  background-color: rgb(13, 13, 14);
  color: white;
  opacity: 0.8;
  width: 60vw;
  margin-left: auto;
  margin-right: auto;
  font-size: 1.1rem;
}

.title {
  font-size: 1.5rem;
  color: black;
}
/* breakpoints  */

@media (max-width: 768px) {
  p,
  button.btn {
    font-size: 0.8rem;
  }

  .banner-area {
    height: 60vh;
  }
}
</style>
