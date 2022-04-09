import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import HomeView from "../views/HomeView.vue";
import BeerView from "../views/BeerView.vue";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/beer/:id",
    name: "beer",
    component: BeerView,
  },
];

const router = new VueRouter({
  mode: "history",
  routes,
});

export default router;
