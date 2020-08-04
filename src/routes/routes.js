import DashboardLayout from "@/pages/Layout/DashboardLayout.vue";

import Dashboard from "@/pages/Dashboard.vue";
import UserProfile from "@/pages/UserProfile.vue";
import AccountsList from "@/pages/AccountsList.vue";
import TranferList from "@/pages/TranferList.vue";
import MoneyTranfer from "@/pages/MoneyTranfer.vue";
import DebtReminder from "@/pages/DebtReminder.vue";
import Notifications from "@/pages/Notifications.vue";
import TransactionsHistory from "@/pages/TransactionsHistory.vue";

const routes = [
  {
    path: "/",
    component: DashboardLayout,
    redirect: "/dashboard",
    children: [
      {
        path: "dashboard",
        name: "Dashboard",
        component: Dashboard
      },
      {
        path: "user",
        name: "User Profile",
        component: UserProfile
      },
      {
        path: "accounts",
        name: "Accounts List",
        component: AccountsList
      },
      {
        path: "tranferList",
        name: "Tranfer List",
        component: TranferList
      },
      {
        path: "moneyTranfer",
        name: "Money Tranfer",
        component: MoneyTranfer
      },
      {
        path: "debtReminder",
        name: "Debt Reminder",
        meta: {
          hideFooter: true
        },
        component: DebtReminder
      },
      {
        path: "notifications",
        name: "Notifications",
        component: Notifications
      },
      {
        path: "transactions",
        name: "Transactions History",
        component: TransactionsHistory
      }
    ]
  }
];

export default routes;
