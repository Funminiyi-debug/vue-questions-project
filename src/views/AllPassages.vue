<template>
  <div class=" h-screen">
    <div class="container">
      <h3 class="styled my-5">{{ subject }}</h3>
      <div class="table-container">
        <div class="table-responsive">
          <table class="table custom-table m-0">
            <thead>
              <th>S/N</th>
              <th>Name</th>
              <th>Add Image</th>
              <th>Add Title</th>
              <th></th>
            </thead>
            <tbody>
              <tr v-for="(passage, index) in passages" v-bind:key="index">
                <td>{{ index + 1 }}</td>
                <td>{{ passage.passagename }}</td>
                <td>
                  <div class="mb-3">
                    <input
                      class="form-control form-control-sm"
                      type="file"
                      :id="`image_${passage._id}`"
                      accept=".jpg, .jpeg, .png"
                    />
                  </div>
                </td>
                <td>
                  <div class="form-group mx-sm-3 mb-3 row">
                    <label for="inputPassword2" class="sr-only"
                      >Enter Title</label
                    >
                    <input
                      type="text"
                      class="form-control form-control-sm"
                      :id="`title_${passage._id}`"
                      placeholder="Enter Image Title"
                    />
                  </div>
                </td>

                <td>
                  <button
                    type="submit"
                    class="btn btn-info btn-sm mx-2"
                    @click="uploadImagesForPassage(passage._id)"
                  >
                    Add Image
                  </button>
                  <button
                    class="btn btn-danger btn-sm"
                    @click="handleDelete(passage._id)"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import { baseUrl } from "../api/routes";
export default {
  name: "all-passages",
  mounted() {
    this.$nextTick(() => {
      const isAdmin = this.$store.getters.isAdmin;
      if (!isAdmin) {
        this.$router.push("/admin-login");
      }
      this.fetchPassages();
      this.fetchSubject(this.$route.params.subjectid);
    });
  },
  data() {
    return {
      passages: [],
      subject: ""
    };
  },
  watch: {
    $route(to, from) {
      this.fetchPassages();
    }
  },
  methods: {
    async fetchPassages() {
      try {
        const res = await axios.get(
          `${baseUrl}/passages/get-by-subject/${this.$route.params.subjectid}`
        );
        this.passages = [...res.data.response.passages];
      } catch (error) {
        console.log(error);
      }
    },
    async fetchSubject(id) {
      try {
        const res = await axios.get(
          `${baseUrl}/subjects/${this.$route.params.subjectid}`
        );
        this.subject = res.data.subject.name;
      } catch (error) {
        console.log(error);
      }
    },
    async handleDelete(id) {
      try {
        const res = await axios.delete(`${baseUrl}/passages/${id}`);
      } catch (error) {
        console.log(error);
      }
      this.passages = this.passages.filter(element => element._id != id);
    },
    async uploadImagesForPassage(id) {
      let titleElement = document.getElementById(`title_${id}`);
      let fileElement = document.getElementById(`image_${id}`);

      let title = titleElement.value;

      if (fileElement.files.length == 0 || title == "") {
        this.$toasted.error("Please fill in all fields");
        return;
      }
      let file = fileElement.files[0];
      const formData = new FormData();
      // for (let i = 0; i < files.length; i++) {
      formData.append("passageImages", file);
      formData.append("passageTitle", title);
      // }
      try {
        const res = await axios({
          url: `${baseUrl}/passages/add-images/${id}`,
          method: "POST",
          data: formData,
          headers: { "Content-Type": "multipart/form-data" }
        });

        if (res.data.success == true) {
          this.$toasted.success("Image Uploaded");
          title = "";
          // fileElement.files = [];
        }
      } catch (error) {
        this.$toasted.error("Server error. Please try again");
        console.log(error);
        title = "";
        // fileElement.files = [];
      }
    }
  }
};
</script>
