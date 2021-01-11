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
const getDefaultState = () => {
  return {
    user: "",
    results: "",
    allUsers: []
  };
};
Vue.use(Vuex);
Vue.config.productionTip = false;

const store = new Vuex.Store({
  state: getDefaultState(),
  getters: {
    user: state => state.user,
    results: state => state.results,
    allUsers: state => state.allUsers
  },
  actions: {
    async logout() {
      const res = await axios.post(`${baseUrl}/logout`);
      localStorage.clear();
      this.commit("resetState");
      alert("log out successful");
      this.$route.push("/login");
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
