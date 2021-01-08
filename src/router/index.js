import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Quiz.vue";
import End from "../views/End.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/home/:subjectid",
    name: "Home",
    component: Home
  },
  {
    path: "/end",
    name: "End",
    component: End
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
