import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Quiz.vue";
import End from "../views/End.vue";
import Login from "../views/Login.vue";
import Reviewed from "../views/Reviewed.vue";
import AdminDashboard from "../views/AdminDashBoard.vue";
import AddQuestion from "../views/AddQuestion.vue";
import CheckQuestions from "../views/CheckQuestions.vue";
import StudentResult from "../views/StudentResult.vue";
import AllPassages from "../views/AllPassages.vue";
import NotFound from "../views/NotFound.vue";
import AdminLogin from "../views/AdminLogin";
import Intro from "../views/Intro";
Vue.use(VueRouter);

const routes = [
  {
    path: "/home/:subjectid",
    name: "Home",
    component: Home
  },
  {
    path: "/end/:subjectid",
    name: "End",
    component: End
  },
  {
    path: "/signup",
    name: "Signup",
    component: Intro
  },
  { path: "/review/:subjectid", name: "Review", component: Reviewed },
  {
    path: "/admin",
    name: "Admin",
    component: AdminDashboard
  },
  {
    path: "/admin/student/:id",
    name: "student-result",
    component: StudentResult
  },
  { path: "/admin/add-question", name: "add-question", component: AddQuestion },
  {
    path: "/admin/check-questions",
    name: "check-questions",
    component: CheckQuestions
  },
  {
    path: "/admin/all-passages/:subjectid",
    name: "all-passages",
    component: AllPassages
  },
  {
    path: "/admin-login",
    name: "admin-login",
    component: AdminLogin
  },
  {
    path: "/",
    name: "Intro",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Login.vue")
  },
  {
    path: "*",
    name: "NotFound",
    component: NotFound
  }
];

const router = new VueRouter({
  routes
});

export default router;
