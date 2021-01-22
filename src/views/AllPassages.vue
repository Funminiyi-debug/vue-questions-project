<template>
  <div>
    <h3 class="h3 my-5">{{ subject }}</h3>
    <table class="table">
      <thead>
        <th>S/N</th>
        <th>Name</th>
        <th>Add Images</th>
        <th></th>
      </thead>
      <tbody>
        <tr v-for="(passage, index) in passages" v-bind:key="index">
          <td>{{ index + 1 }}</td>
          <!-- <td class="text-info">
            <router-link
              :to="{ name: 'student-result', params: { id: user._id } }"
              >{{ user.name }}</router-link
            > 
          </td> -->
          <td>{{ passage.passagename }}</td>
          <td>
            <input
              type="file"
              name="image"
              :id="`id_${passage._id}`"
              multiple
            />
            <button
              class="btn btn-success"
              @click="uploadImagesForPassage(passage._id)"
            >
              Add
            </button>
          </td>
          <td>
            <button class="btn btn-danger" @click="handleDelete(passage._id)">
              Delete
            </button>
          </td>
        </tr>
      </tbody>
    </table>
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
        this.passages = [...res.data.passages];
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
      const files = document.getElementById(`id_${id}`).files;
      const formData = new FormData();
      for (let i = 0; i < files.length; i++) {
        formData.append("passageImages", files[i]);
      }
      try {
        const res = await axios({
          url: `${baseUrl}/passages/add-images/${id}`,
          method: "POST",
          data: formData,
          headers: { "Content-Type": "multipart/form-data" }
        });

        if (res.data.success == true) {
          alert("Images Uploaded");
        }
      } catch (error) {
        console.log(error);
      }
    }
  }
};
</script>
