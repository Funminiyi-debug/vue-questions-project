<template>
  <div class="container ">
    <h1 class="h4 my-3 py-5">
      Admin dashboard
    </h1>
    <hr class="hr" />
    <div class="row">
      <router-link to="/admin/add-question" class="btn btn-info mr-auto col-6">
        Add Passage</router-link
      >
      <router-link
        to="/admin/check-questions"
        class="btn btn-danger col-6 ml-auto"
        >Check Questions</router-link
      >
    </div>
    <div class="row">
      <h1 class="h5 text-center my-4 m-auto">Students</h1>
      <table class="table">
        <thead>
          <th>S/N</th>
          <th>Name</th>
          <th>Email</th>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td class="text-info">
              <router-link to="/admin/student/user_id">username</router-link>
            </td>
            <td>email</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
export default { name: "Admin" };
</script>

<style scoped>
.btn {
  border-radius: 0 !important;
}
</style>
