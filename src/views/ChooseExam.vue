<template>
  <div class="body h-screen">
    <div class="authentication" v-if="subjects.length > 0 && user != ''">
      <form @submit="handleSubmit" enctype="application/json" class="container">
        <div class="row justify-content-md-center">
          <div class="col-xl-8 col-lg-8 col-md-8 col-sm-12">
            <div class="bg-white container login-screen">
              <div class="login-box text-justify">
                <a href="#" class="login-logo">
                  <img alt="Logo" src="../assets/brand-logo.png" class="logo" />
                </a>
                <h5>
                  Hi <span class="text-red-1">{{ user.name }}</span>
                </h5>
                <div>
                  <h5 class="h5">Continue where you left off</h5>
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
                </div>
                <div>
                  <h5 class="h5">
                    <span v-if="user.subjectsSaved > 0">or</span> Start New Exam
                  </h5>

                  <div class="form-group">
                    <select class="form-control" v-model="subject" required>
                      <option
                        v-for="(subject, index) of subjects"
                        :value="subject"
                        v-bind:key="index"
                      >
                        {{ subject.name }}</option
                      >
                    </select>
                  </div>
                </div>
                <div class="actions mb-4">
                  <button
                    type="submit"
                    class="btn bg-red-1 text-white"
                    :disabled="disableButton"
                  >
                    Proceed to Exam
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
    <div v-if="subjects.length == 0 || user == ''">
      <div class="text-center my-5">
        <div class="spinner-border">
          <span class="sr-only">Loading...</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { baseUrl } from "../api/routes";
import Navigation from "../components/Navigation.vue";
import axios from "axios";

export default {
  name: "choose-exam",
  mounted() {
    this.$nextTick(async () => {
      await this.fetchSubjects();
      this.user = this.$store.getters.user;
      // await this.fetchSubjectsForPassages();
    });
  },
  components: {
    Navigation
  },
  data() {
    return {
      subjects: [],
      subject: "",
      error: false,
      user: "",
      disableButton: false,
      chooseProgress: false
    };
  },
  methods: {
    async fetchSubjectsForPassages() {
      this.subjects.map(item => {
        return this.fetchPassagesForSubject(item);
      });
    },
    async fetchPassagesForSubject(subject) {
      try {
        let res = await axios.get(
          `${baseUrl}/passages/get-by-subject/${subject._id}?count=true`
        );
        console.log(res.data.response.passages);
        return res.data.response.passages;
      } catch (error) {
        console.log(error);
        return [];
      }
    },
    async fetchSubjects() {
      try {
        let res = await fetch(`${baseUrl}/subjects`);
        this.handleError(res);
        res = await res.json();
        this.subjects = [...res.subjects];
      } catch (error) {
        console.log(error);
      }
    },
    // handle error function
    handleError(error) {
      if (error.status == 409) {
        alert("Oops! User already exist");
        return;
      }
      if (error.status == 500) {
        alert("Server Error, please try again");
        return;
      }

      if (error.status == 401) {
        alert("Password or username incorrect");
      }

      if (error.status == 400) {
        alert("Ensure all fields are filled");
        return;
      }
      if (error.status == 404) {
        alert("not found");
      }
    },

    // submit user form
    async handleSubmit(e) {
      e.preventDefault();
      this.disableButton = true;
      this.chooseProgress = false;
      this.$store.commit("addChoiceProgress", this.chooseProgress);
      return this.$router.push(`Home/${this.subject._id}`);
    },

    continueProgress(subject) {
      this.subject = subject.subject;
      this.chooseProgress = true;
      this.$store.commit("addChoiceProgress", this.chooseProgress);
      this.$store.commit("addProgress", subject);
      return this.$router.push(`Home/${this.subject._id}`);
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
