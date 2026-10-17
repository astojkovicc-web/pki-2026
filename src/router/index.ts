import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import AboutView from "@/views/AboutView.vue";
import DetailsView from "@/views/DetailsView.vue";
import LoginView from "@/views/LoginView.vue";
import UserView from "@/views/UserView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      component: HomeView,
    },
    {
      path: "/about",
      component: AboutView,
    },
    {
      path: "/details/:id",
      component: DetailsView,
    },
    {
      path: "/login",
      component: LoginView,
    },
    {
      path: "/user",
      component: UserView,
    },
  ],
});

export default router;
