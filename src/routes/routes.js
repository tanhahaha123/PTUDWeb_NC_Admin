import store from "../store/index.js";
import VueRouter from "vue-router";
import DashboardLayout from "@/pages/Layout/DashboardLayout.vue";

import Dashboard from "@/pages/Dashboard.vue";
import UserProfile from "@/pages/NhanVien.vue";
import HistoryTransaction from "@/pages/HistoryTransaction.vue";
import Login from '@/pages/Authentication/Login.vue';

const routes = [
  {
    path: "/",
    component: DashboardLayout,
    redirect: "/dashboard",
    children: [
      {
        path: "dashboard",
        name: "Trang chủ",
        component: Dashboard
      },
      {
        path: "user",
        name: "Nhân viên",
        component: UserProfile
      },
      {
        path: "history-transactions",
        name: "Lịch sử giao dịch",
        component: HistoryTransaction
      },
    ]
  },
  { path: "/login", component: Login }
];

// configure router
const router = new VueRouter({
  routes, // short for routes: routes
  linkExactActiveClass: "nav-item active"
});

router.beforeEach((to, from, next) => {
  //Page cho phép
  const publicPages = ["/login"];
  // Page can quyen login de truy cap
  const authRequired = !publicPages.includes(to.path);

  //Kiểm tra đã login trong localStorage
  const loggedIn = localStorage.getItem("user");

  if (!authRequired && loggedIn) return next("/dashboard");
  if (authRequired && !loggedIn) {
    return next("/login");
  }
  next();
});

export { router };
