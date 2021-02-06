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
                      <router-link to="/admin/add-question" class="nav-link"
                        >Add Passage</router-link
                      >
                    </li>
                    <li class="nav-item">
                      <router-link to="/admin/students" class="nav-link"
                        >Students</router-link
                      >
                    </li>
                    <li class="nav-item">
                      <router-link to="/admin/check-questions" class="nav-link "
                        >Subjects</router-link
                      >
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
                    <h3>{{ metrics.percentageCorrectOverall }}%</h3>
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
            </div>
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
      const isAdmin = this.$store.getters.isAdmin;
      if (!isAdmin) {
        this.$router.push("/admin-login");
      }

      this.fetchMetrics();
    });
  },
  data() {
    return {
      users: [],
      metrics: ""
    };
  },
  methods: {
    handleError: handleError,
    async fetchMetrics() {
      await axios
        .get(`${baseUrl}/dashboard/metrics`)
        .then(res => {
          this.metrics = res.data.response;
        })
        .catch(err => {
          console.log(err);
          this.handleError(err);
        });
    }
  }
};
</script>
<style scoped>
@import url("../assets/fonts/style.css");
</style>
<style scoped>
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
