/* eslint-disable prettier/prettier */
import Vue from 'vue';
import Vuex from 'vuex';
import moment from 'moment';
//import { router } from "../routes/routes";
Vue.use(Vuex);

import axios from 'axios';
const axiosApiInstance = axios.create();

// Request
// axiosApiInstance.interceptors.request.use(
//   async config => {
//     let a= JSON.parse(localStorage.getItem("user"));
//     console.log("Request: ",a);
//     //const keys = JSON.parse(value)
//     if(a){
//       config.headers = { 
//         "x-access-token": a.response.accessToken
//       }
//     }
//     return config;
//   },
//   error => {
//     Promise.reject(error)
// });

// // Response
// axiosApiInstance.interceptors.response.use((response) => {
//   return response
// }, async function (error) {
//   const originalRequest = error.config;
//   //console.log("originalRequest: ", originalRequest);
//   if (error.response.status === 401 && !originalRequest._retry) {
//     //console.log("Here");
//     originalRequest._retry = true;
//     const payload = {
//       "AccessToken": JSON.parse(localStorage.getItem("user")).response.accessToken,
//       "RefreshToken": JSON.parse(localStorage.getItem("user")).response.refreshToken
//     }
//     let response;
//     try {
//       response = await axios.post('http://localhost:3000/api/auth/refresh-token',payload);
//     }
//     catch(e){
//       localStorage.removeItem("user");
//       router.push("login");
//       // console.log("Log: ", e.response);
//     }
    
//     // console.log("AccessToken: ", accessToken);
//     // if(response.data.err){
//     //   // this.$store.dispatch()
//     //   router.push("login");
//     // }else{
//     //   // commit('ADD_DEBT_REMINDER_SUCCESS',respone.data);
//     //   // router.push("debtReminder");
//     // }        
//     // const localStore = JSON.parse(localStorage.getItem("user"));
//     // localStore.response.accessToken = accessToken.data;
//     // //console.log("localStore: ", localStore.response);
//     // localStorage.setItem("user", JSON.stringify(localStore));  
//     //axios.defaults.headers.common['x-access-token'] = accessToken.data;
    
//     return axiosApiInstance(originalRequest);
//   }
//   return Promise.reject(error);
// });


export default new Vuex.Store({
  state: {
    employees: [],
    transactionsByBankName: {
      total: null,
      labels: [],
      series: [[]]
    },
    isLoadingTransactionsByBankName: false,
    transactionsByMonth: {
      total: null,
      labels: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"],
      series: [[]]
    },
    isLoadingTransactionsByMonth: false,
    transactionsByYear: {
      labels: [],
      series: [[]]
    },
    isLoadingTransactionsByYear: false,
  },
  getters: {
  },
  mutations: {
    // ADD_DEBT_REMINDER_REQUEST(state, payload){
    //   state.status = { addDebtRemindering: true}
    // },
    // ADD_DEBT_REMINDER_SUCCESS(state, payload){
    //   state.status = { addDebtRemindered: true}
    //   //state.accountTable= payload;
    // },
    // ADD_DEBT_REMINDER_FAILED(state, payload){
    //   state.status = { addDebtReminderFailed: true}
    //   //state.accountTable= payload.err;
    // },
    GET_EMPLOYEE_SUCCESS(state, payload){
      state.employees = payload;
    },

    GET_TOTAL_TRANSACTIONS_BY_BANK_NAME(state, payload){
      state.isLoadingTransactionsByBankName = false;
    },
    GET_TOTAL_TRANSACTIONS_BY_BANK_NAME_SUCCESS(state, payload){
      // console.log("payload: ", payload[0]);
      for( var i in payload){
        state.transactionsByBankName.total += parseInt(payload[i].Total);
        state.transactionsByBankName.labels.push(payload[i].TenNganHang);
        state.transactionsByBankName.series[0 ].push(payload[i].Total);
        // console.log("transactionsByBankName: ", state.transactionsByBankName.labels);
        state.isLoadingTransactionsByBankName = true;
      }
    },

    GET_TOTAL_TRANSACTIONS_BY_MONTH(state, payload){
      state.isLoadingTransactionsByMonth = false;
    },
    GET_TOTAL_TRANSACTIONS_BY_MONTH_SUCCESS(state, payload){
      // console.log("payload: ", payload[0]);
      for( var i in payload){
        // state.transactionsByMonth.labels.push(payload[i].month);
        state.transactionsByMonth.series[0].push(payload[i].total);
        // console.log("transactionsByBankName: ", state.transactionsByBankName.labels);
        state.isLoadingTransactionsByMonth = true;
      }
    },
    GET_TOTAL_TRANSACTIONS_BY_YEAR(state, payload){
      state.isLoadingTransactionsByYear = false;
    },
    GET_TOTAL_TRANSACTIONS_BY_YEAR_SUCCESS(state, payload){
      // console.log("payload: ", payload[0]);
      for( var i in payload){
        state.transactionsByYear.labels.push(payload[i].year);
        state.transactionsByYear.series[0].push(payload[i].total);
        // console.log("transactionsByBankName: ", state.transactionsByBankName.labels);
        state.isLoadingTransactionsByYear = true;
      }
    }
    
  },
  actions: {

    async getEmployeesFromDB({commit}){
          const respone=await axiosApiInstance.get('http://localhost:3000/api/admin/employees');
          if(respone.data.err){
            commit('GET_EMPLOYEE_FAILED',respone.data);
          }else{
            commit('GET_EMPLOYEE_SUCCESS',respone.data);
            // router.push("debtReminder");
          }
    },
    async getTotalTransactionsByBankName({commit}){
      commit("GET_TOTAL_TRANSACTIONS_BY_BANK_NAME");
      const respone=await axiosApiInstance.get('http://localhost:3000/api/admin/transactions/bank-name');
      if(respone.data.err){
        commit('GET_TOTAL_TRANSACTIONS_BY_BANK_NAME_FAILED',respone.data);
      }else{
        commit('GET_TOTAL_TRANSACTIONS_BY_BANK_NAME_SUCCESS',respone.data);
        // router.push("debtReminder");
      }
    },
    async getTotalTransactionsByMonth({commit}){
      commit("GET_TOTAL_TRANSACTIONS_BY_MONTH");
      const respone=await axiosApiInstance.get('http://localhost:3000/api/admin/transactions/month');
      if(respone.data.err){
        commit('GET_TOTAL_TRANSACTIONS_BY_MONTH_FAILED',respone.data);
      }else{
        commit('GET_TOTAL_TRANSACTIONS_BY_MONTH_SUCCESS',respone.data);
        // router.push("debtReminder");
      }
    },
    async getTotalTransactionsByYear({commit}){
      commit("GET_TOTAL_TRANSACTIONS_BY_YEAR");
      const respone=await axiosApiInstance.get('http://localhost:3000/api/admin/transactions/year');
      if(respone.data.err){
        commit('GET_TOTAL_TRANSACTIONS_BY_YEAR_FAILED',respone.data);
      }else{
        commit('GET_TOTAL_TRANSACTIONS_BY_YEAR_SUCCESS',respone.data);
        // router.push("debtReminder");
      }
    }
  }
})

