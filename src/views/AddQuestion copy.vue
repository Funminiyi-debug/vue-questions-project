<template>
  <div class="container my-5">
    <h4 class="h4 text-justify mt-5">Add Passage</h4>
    <hr class="hr mb-5" />
    <form id="passage">
      <div class="form-group">
        <label for="exampleFormControlInput1">Passage Name</label>
        <input
          type="text"
          class="form-control"
          id="exampleFormControlInput1"
          placeholder="enter passage name"
        />
      </div>
      <div class="form-group">
        <label for="exampleFormControlTextarea1">Passage</label>
        <textarea
          class="form-control"
          id="exampleFormControlTextarea1"
          rows="5"
        ></textarea>
      </div>
      <div class="form-control-group">
        <label for="subjects" class="px-5">Select Your Subject</label>
        <select
          name="Subjects"
          id="subjects"
          class="option"
          v-model="subject"
          required
        >
          <!-- <option selected>Open this select menu</option> -->

          <option
            v-for="(subject, index) of subjects"
            :value="subject"
            v-bind:key="index"
          >
            {{ subject.name }}</option
          >
        </select>
      </div>
    </form>
    <hr class="hr my-5 bg-danger" />
    <form>
      <center class="h4 font-weight-bold text-danger">Questions</center>
      <div class="form-group">
        <label for="exampleFormControlTextarea1">Description</label>
        <textarea
          class="form-control"
          id="exampleFormControlTextarea1"
          rows="3"
        ></textarea>
      </div>

      <label class="font-weight-bold text-danger">Choices</label>
      <div class="row">
        <div class="col-8">
          <input type="text" class="form-control" placeholder="Choice" />
        </div>
        <div class="form-check form-check-inline col-2">
          <input
            class="form-check-input"
            type="checkbox"
            id="inlineCheckbox1"
            value="option1"
          />
          <label class="form-check-label" for="inlineCheckbox1">1</label>
        </div>
        <button class="btn btn-dark">Add Choice</button>
      </div>

      <!-- alternatives  -->
    </form>
  </div>
</template>

<script>
import axios from "axios";
import { baseUrl } from "../api/routes";
import xlsx from "xlsx";
export default {
  name: "add-question",
  data() {
    return { subjects: [] };
  },
  mounted() {
    this.$nextTick(() => {
      this.fetchSubjects();
    });
  },
  methods: {
    async fetchSubjects() {
      try {
        const res = await axios.get(`${baseUrl}/subjects`);
        this.subjects = [...res.data.subjects];
      } catch (error) {
        console.log(error);
      }
    }
  }
};
</script>
<style scoped>
.form-group label {
  font-weight: bold;
}
</style>
