<template
  ><div class="container">
    <h3 class="styled">Progress List</h3>
    <div v-if="user.subjectsSaved.length > 0">
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
                <tr v-for="(subject, index) in user.subjectsSaved" :key="index">
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
  </div>
</template>
<script>
export default {
  name: "progress-list",
  mounted() {
    // this.$nextTick(() => {
    this.user = this.$store.getters.user;
    // });
  },
  data() {
    return {
      user: ""
    };
  }
};
</script>
<style scoped></style>
