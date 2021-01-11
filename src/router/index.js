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
    path: "/login",
    name: "Login",
    component: Login
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
    path: "/",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Intro.vue")
  }
];

const router = new VueRouter({
  routes
});

export default router;
