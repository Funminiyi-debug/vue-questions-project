<template>
  <div class="container">
    <h3 class="h3 font-weight-bold pt-5 text-justify ml-5">Results</h3>
    <!-- <hr class="hr" /> -->
    <div class="container my-5 name">
      <dl class="row">
        <dt class="col-3">Name</dt>
        <dd class="col-9">
          {{ user.name }}
        </dd>
        <dt class="col-3">Email</dt>
        <dd class="col-9">
          {{ user.email }}
        </dd>
      </dl>
    </div>
    <div>
      <table class="table">
        <thead>
          <th>S/N</th>
          <th>Subject</th>
          <th>Score</th>
          <th>Time Taken</th>
        </thead>
        <tbody>
          <tr v-for="(subject, index) in user.subjects" v-bind:key="index">
            <td>{{ index + 1 }}</td>
            <td class="text-info">
              {{ subject.subject }}
            </td>
            <td>{{ subject.score }}</td>
            <td>{{ subject.counter }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  name: "studentresult",
  data() {
    return {
      user: {
        name: "",
        email: "",
        subjects: []
      }
    };
  },
  mounted() {
    this.user = this.$store.getters.allUsers.find(
      user => user._id == this.$route.params.id
    );
  },
  watch: {
    $route(to, from) {
      this.user = this.$store.getters.allUsers.find(
        user => user._id == to.params.id
      );
    }
  }
};
</script>

<style scoped>
.name {
  margin-top: 3rem !important;
  margin-bottom: 3rem !important;
}

.name dd,
.name dt {
  margin-bottom: 1.5rem;
}
</style>
