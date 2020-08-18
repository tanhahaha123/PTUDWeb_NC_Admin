import DashboardLayout from "@/pages/Layout/DashboardLayout.vue";

import Dashboard from "@/pages/Dashboard.vue";
import UserProfile from "@/pages/NhanVien.vue";
//import Login from '@/pages/Authentication/Login.vue';

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
    ]
  },
  // { path: "/login", component: Login }
];

export default routes;
