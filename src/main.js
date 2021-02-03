import Vue from "vue";
import App from "./App.vue";
import "@fortawesome/fontawesome-free/css/all.css";
import "@fortawesome/fontawesome-free/js/all.js";
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import router from "./router";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";
import * as Cookies from "js-cookie";
import axios from "axios";
import { baseUrl } from "./api/routes";
import { BootstrapVue, IconsPlugin } from "bootstrap-vue";

// Import Bootstrap an BootstrapVue CSS files (order is important)
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";

// Make BootstrapVue available throughout your project
Vue.use(BootstrapVue);
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin);
const getDefaultState = () => {
  return {
    user: "",
    results: "",
    allUsers: [],
    passages: [],
    userVisitedQuestions: {
      userVisitedQuestions: {
        username: "",
        email: "",
        questionsAttempted: [],
        questionsAnswered: [],
        score: 0
      }
    },
    isAdmin: false,
    allSubjects: [],
    chooseProgress: false,
    progress: {}
  };
};
Vue.use(Vuex);
Vue.config.productionTip = false;

const store = new Vuex.Store({
  state: getDefaultState(),
  getters: {
    user: state => state.user,
    results: state => state.results,
    allUsers: state => state.allUsers,
    userVisitedQuestions: state => state.userVisitedQuestions,
    passages: state => state.passages,
    isAdmin: state => state.isAdmin,
    allSubjects: state => state.allSubjects,
    chooseProgress: state => state.chooseProgress,
    progress: state => state.progress
  },
  actions: {
    async logout() {
      try {
        const res = await axios.post(`${baseUrl}/logout`);
        localStorage.clear();
        this.commit("resetState");
        alert("log out successful");
        this.$route.push("/");
      } catch (error) {
        console.log(error);
      }
    }
  },
  mutations: {
    resetState(state) {
      Object.assign(state, getDefaultState());
    },
    addUser(state, payload) {
      state.user = payload;
    },
    addResults(state, payload) {
      state.results = payload;
    },
    getAllUsers(state, payload) {
      state.allUsers = [...payload];
    },
    getAllSubjects(state, payload) {
      state.allSubjects = [...payload];
    },
    userVisitedQuestions(state, payload) {
      state.userVisitedQuestions = payload;
    },
    passages(state, payload) {
      state.passages = payload;
    },
    isAdmin(state, payload) {
      state.isAdmin = true;
    },
    addChoiceProgress(state, payload) {
      state.chooseProgress = payload;
    },
    addProgress(state, payload) {
      state.progress = payload;
    }
  },
  plugins: [
    createPersistedState({
      getState: key => Cookies.getJSON(key),
      setState: (key, state) =>
        Cookies.set(key, state, { expires: 3, secure: true })
    })
  ]
});

new Vue({
  router,
  store: store,
  render: h => h(App)
}).$mount("#app");
