<template>
  <div id="app">
    <div class="container-responsive">
      <div class="container">
        <h4 class="h4 font-weight-bold">Add Passage</h4>
        Upload the passages and questions in the approved format
        <hr class="hr" />
        <br /><br />
        <div class="form-control-group m-auto">
          <label for="subjects" class="m-auto font-weight-bold"
            >Select Subject</label
          >
          <select
            name="Subjects"
            id="subjects"
            class="option px-3 m-auto border"
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
        <br /><br />
        <button
          class="btn btn-danger border-radius-none col-3 my-3"
          @click="submit"
        >
          Submit
        </button>
      </div>
      <div class="row">
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
      <div class="row">
        <div class="col-md-12">
          <table
            class="table table-striped table-hover table-condensed table-responsive"
          >
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

  // share the alternatives amongst questions
  const dividedAlternatives = divideArraysIntoNEqualParts(
    alternatives,
    questions.length
  );

  // user explanations
  let answerExplanations = Object.keys(data).map(key => {
    if (key.indexOf("userExplanation") != -1) {
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

    alert("successfully created questions... you can check your database");
  } catch (error) {
    console.log(error);
    alert("ERROR from server");
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
    this.fetchSubjects();
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
    fetchSubjects: fetchSubjects
  }
};
</script>

<style scoped>
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
</style>
