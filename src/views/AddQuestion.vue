<template>
  <div id="app" class="jumbotron h-screen">
    <div class="container-responsive container">
      <nav
        class="navbar navbar-expand-lg rounded navbar-dark bg-dark sticky-top"
      >
        <div class="container-fluid">
          <router-link class="navbar-brand text-capitalize" to="/admin"
            >Shemmasian</router-link
          >
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
          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
              <li class="nav-item">
                <router-link to="/admin/add-question" class="nav-link active"
                  >Add Passage</router-link
                >
              </li>
              <li class="nav-item">
                <router-link to="/admin/students" class="nav-link "
                  >Students</router-link
                >
              </li>
              <li class="nav-item">
                <router-link to="/admin/check-questions" class="nav-link "
                  >Subjects</router-link
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
      <div class="container mt-3">
        <h3 class="styled">Add Passage</h3>

        <div class="card-title">
          Upload the passages and questions in the approved format
        </div>
        <hr class="hr" />
        <label for="">Subject</label>
        <div class="row gutters col-12">
          <div class="col-xl-4 col-lg col-md-4 col-sm-4 col-12 m-auto">
            <div class="form-group">
              <select class="form-control form-control-sm" v-model="subject">
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
        </div>
        <div class="col-12">
          <button
            class="btn btn-danger btn-sm col-xl-4 col-lg col-md-4 col-sm-4 col-12 my-3 mr-4"
            @click="submit"
          >
            Submit
          </button>
        </div>
      </div>
      <div class="col-12 m-auto">
        <div class="row bg-white">
          <div class="col-md-12">
            <div
              id="drop"
              @drop="handleDrop"
              @dragover="handleDragover"
              @dragenter="handleDragover"
            >
              Drop Here
            </div>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-md-12">
          <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
            <div class="table-container">
              <div class="table-responsive">
                <table class="table custom-table m-0">
                  <thead>
                    <tr>
                      <th v-for="(item, index) in headers" v-bind:key="index">
                        {{ item }}
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(item, index) in tickets" v-bind:key="index">
                      <td v-for="(key, index) in item" v-bind:key="index">
                        <label>{{ key }}</label>
                        <p>{{ item.key }}</p>
                      </td>
                    </tr>
                  </tbody>
                  <tfoot></tfoot>
                </table>
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
import XLSX from "xlsx";
/**
 **  Disclaimer: XLSX Code comes from http://oss.sheetjs.com/js-xlsx/
 **  This is just a project to show Vue.js working in conjunction with HTML5 Drag and Drop and XLSX
 **/

/** DATA STATE **/

/** HELPERS **/
function get_header_row(sheet) {
  var headers = [],
    range = XLSX.utils.decode_range(sheet["!ref"]);
  var C,
    R = range.s.r; /* start in the first row */
  for (C = range.s.c; C <= range.e.c; ++C) {
    /* walk every column in the range */
    var cell =
      sheet[
        XLSX.utils.encode_cell({ c: C, r: R })
      ]; /* find the cell in the first row */
    var hdr = "UNKNOWN " + C; // <-- replace with your desired default
    if (cell && cell.t) hdr = XLSX.utils.format_cell(cell);
    headers.push(hdr);
  }
  return headers;
}
function fixdata(data) {
  var o = "",
    l = 0,
    w = 10240;
  for (; l < data.byteLength / w; ++l)
    o += String.fromCharCode.apply(
      null,
      new Uint8Array(data.slice(l * w, l * w + w))
    );
  o += String.fromCharCode.apply(null, new Uint8Array(data.slice(l * w)));
  return o;
}
function workbook_to_json(workbook) {
  var result = {};
  workbook.SheetNames.forEach(function(sheetName) {
    var roa = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[sheetName]);
    if (roa.length > 0) {
      result[sheetName] = roa;
    }
  });
  return result;
}
/** PARSING and DRAGDROP **/
function handleDrop(e) {
  e.stopPropagation();
  e.preventDefault();
  console.log("DROPPED");
  var files = e.dataTransfer.files,
    i,
    f;
  for (i = 0, f = files[i]; i != files.length; ++i) {
    var reader = new FileReader(),
      name = f.name;
    reader.onload = function(e) {
      var results,
        data = e.target.result,
        fixedData = fixdata(data),
        workbook = XLSX.read(btoa(fixedData), { type: "base64" }),
        firstSheetName = workbook.SheetNames[0],
        worksheet = workbook.Sheets[firstSheetName];
      state.headers = get_header_row(worksheet);
      results = XLSX.utils.sheet_to_json(worksheet);
      state.tickets = results;
    };
    reader.readAsArrayBuffer(f);
  }
}
function handleDragover(e) {
  e.stopPropagation();
  e.preventDefault();
  e.dataTransfer.dropEffect = "copy";
}

function divideArraysIntoNEqualParts(items, n) {
  const result = new Array(Math.ceil(items.length / n))
    .fill()
    .map(_ => items.splice(0, n));
  return result;
}

function arrangeData(data) {
  const passage = {
    passage: data.passage,
    passagename: data.passagename,
    subject: this.subject._id
    // subject: this.subject
  };

  // questions
  let questions = Object.keys(data).map(key => {
    if (key.indexOf("question") != -1) {
      const returnValue = {
        description: data[key]
      };
      return returnValue;
    }
  });

  questions = questions.filter(value => value != undefined);

  // alternatives
  let alternatives = Object.keys(data).map(key => {
    if (key.indexOf("alternative") != -1) {
      const returnValue = {
        text: data[key]
      };

      return returnValue;
    }
  });

  alternatives = alternatives.filter(value => value != undefined);

  // is corr""ect
  let isCorrect = Object.keys(data).map(key => {
    if (key.indexOf("isCorrect") != -1) {
      const returnValue = {
        isCorrect: data[key]
      };
      return returnValue;
    }
  });

  // console.log("iscORRECTS ", isCorrect);
  isCorrect = isCorrect.filter(value => value != undefined);

  // link isCorrect with alternatives
  alternatives = alternatives.map((element, index) => {
    return {
      text: element.text,
      isCorrect: isCorrect[index].isCorrect
    };
  });

  const division = alternatives.length / questions.length;
  // share the alternatives amongst questions
  const dividedAlternatives = divideArraysIntoNEqualParts(
    alternatives,
    division
  );

  // user explanations
  let answerExplanations = Object.keys(data).map(key => {
    if (key.indexOf("answerExplanation") != -1) {
      return data[key];
    }
  });

  answerExplanations = answerExplanations.filter(exp => exp != undefined);
  passage.questions = questions.map((element, index) => {
    element.alternatives = [...dividedAlternatives[index]];
    element.answerExplanation = answerExplanations[index];
    return element;
  });
  return passage;
}
// end of long code

async function submit() {
  try {
    const res = await axios.post(`${baseUrl}/passages/add-many-passages`, {
      passages: this.arrangedData
    });

    this.$toasted.success(
      "successfully created questions... you can check your database"
    );
  } catch (error) {
    console.log(error);
    this.$toasted.error("ERROR from server");
  }
}

async function fetchSubjects() {
  try {
    const res = await axios.get(`${baseUrl}/subjects`);

    this.subjects = [...res.data.subjects];
  } catch (error) {
    console.log(error);
  }
}
var state = {
  tickets: [{ name: "test" }],
  headers: ["Test header"],
  subject: "",
  subjects: [],
  arrangedData: []
};

export default {
  name: "add-question",
  data() {
    return state;
  },
  mounted() {
    this.$nextTick(() => {
      const isAdmin = this.$store.getters.isAdmin;
      if (!isAdmin) {
        this.$router.push("/admin-login");
      }
      this.fetchSubjects();
    });
  },
  watch: {
    tickets(to, from) {
      this.arrangedData = to.map(element => {
        const payload = this.arrangeData(element);
        return payload;
      });
    }
  },
  methods: {
    handleDragover: handleDragover,
    handleDrop: handleDrop,
    arrangeData: arrangeData,
    submit: submit,
    fetchSubjects: fetchSubjects,
    logout() {
      this.$store.commit("isAdmin", false);
      this.$router.push("/admin-login");
    }
  }
};
</script>
<style scoped></style>
<style scoped>
@import "../assets/css/main.css";
@import url("../assets/fonts/style.css");
.form-group label {
  font-weight: bold;
}
#drop {
  border: 2px dashed #bbb;
  -moz-border-radius: 5px;
  -webkit-border-radius: 5px;
  border-radius: 5px;
  padding: 25px;
  text-align: center;
  font: 20pt bold, "Vollkorn";
  color: #bbb;
}
.navbar {
  margin-top: -2rem;
}
</style>
<style scoped>
.cursor {
  cursor: pointer;
}
</style>
