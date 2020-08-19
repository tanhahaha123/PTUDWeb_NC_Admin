/* eslint-disable prettier/prettier */
import Vue from 'vue';
import Vuex from 'vuex';
import moment from 'moment';
import { router } from "../routes/routes";
import { alert } from './alert.module';
import { account } from './account.module';
Vue.use(Vuex);

import axios from 'axios';
const MyAxios = axios.create();
const axiosApiInstance = axios.create();
// Request
axiosApiInstance.interceptors.request.use(
  async config => {
    let a= JSON.parse(localStorage.getItem("user"));
    //console.log("Request: ",a);
    //const keys = JSON.parse(value)
    if(a){
      config.headers = { 
        "x-access-token": a.response.accessToken
      }
    }
    return config;
  },
  error => {
    Promise.reject(error)
});

// Response
axiosApiInstance.interceptors.response.use((response) => {
  return response
}, async function (error) {
  const originalRequest = error.config;
  //console.log("originalRequest: ", originalRequest);
  if (error.response.status === 401 && !originalRequest._retry) {
    //console.log("Here");
    originalRequest._retry = true;
    const payload = {
      "AccessToken": JSON.parse(localStorage.getItem("user")).response.accessToken,
      "RefreshToken": JSON.parse(localStorage.getItem("user")).response.refreshToken
    }
    let response;
    try {
      response = await axios.post('http://localhost:3000/api/auth/refresh-token',payload);
    }
    catch(e){
      localStorage.removeItem("user");
      router.push("login");
      // console.log("Log: ", e.response);
    }
    
    // console.log("AccessToken: ", accessToken);
    // if(response.data.err){
    //   // this.$store.dispatch()
    //   router.push("login");
    // }else{
    //   // commit('ADD_DEBT_REMINDER_SUCCESS',respone.data);
    //   // router.push("debtReminder");
    // }        
    // const localStore = JSON.parse(localStorage.getItem("user"));
    // localStore.response.accessToken = accessToken.data;
    // //console.log("localStore: ", localStore.response);
    // localStorage.setItem("user", JSON.stringify(localStore));  
    //axios.defaults.headers.common['x-access-token'] = accessToken.data;
    
    return axiosApiInstance(originalRequest);
  }
  return Promise.reject(error);
});


export default new Vuex.Store({
  modules:{
    alert,
    account
  },
  
  state: {
    //create account employee
    statusRes:{
      stat:"",
      mess:""
    },
    DanhSachNhanVien: [],
    selectedTaiKhoanThanhToan: null,
    transactionsByBankName: {
      total: 0,
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


    tranferHisTable: [],
    //search query
    tranferQuery:'ALL',
    NgayBatDau:  315594000000,
    NgayKetThuc: 1609347600000
  },
  getters: {
    themsttDanhSachNhanVien(state){
      let ds = JSON.parse(JSON.stringify(state.DanhSachNhanVien));
      ds.forEach((ite,idx)=>{
        ite.STT = idx + 1;
      });
      return ds;
    },
    tranferFilter(state) {
      // console.log("-------------------------");
      // console.log(state.tranferQuery);
      // console.log(state.NgayBatDau);
      // console.log(state.NgayKetThuc);
      if (state.tranferQuery === "ALL") {
        return state.tranferHisTable;
      }
      const BankName = state.tranferQuery;
      const NgayBatDau = state.NgayBatDau;
      const NgayKetThuc = state.NgayKetThuc;
      return state.tranferHisTable
      .filter(t =>
        t.TenNganHang === BankName && Date.parse(t.NgayGiaoDich) >= NgayBatDau && Date.parse(t.NgayGiaoDich) <= NgayKetThuc
      )
    },
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
      for(const i in payload){
        payload[i].NgaySinh=moment(payload[i].NgaySinh, 'YYYY-MM-DD').format('DD/MM/YYYY');
      }
      state.DanhSachNhanVien = payload;
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
    },
    DELETE_DANH_SACH_NHAN_VIEN(state, payload){
      let arr = state.DanhSachNhanVien.filter(function(el) { return el.TenDangNhap != payload; });
      state.DanhSachNhanVien = JSON.parse(JSON.stringify(arr));
    },
    ADD_NHAN_VIEN(state, payload){
      // console.log("success: ", payload);
      state.statusRes.stat="success";
      state.statusRes.mess = "Tạo tài khoản thành công";
      state.DanhSachNhanVien.push(payload);
    },
    ADD_NHAN_VIEN_FAILED(state,payload){
      // console.log("failed: ", payload);
        state.statusRes.stat="danger";
        state.statusRes.mess = payload;
    },
    GET_TRANFER_HISTORY(state, payload) {
      for (const i in payload) {
        payload[i].NgayGiaoDich = moment(
          payload[i].NgayGiaoDich,
          "YYYY-MM-DD"
        ).format("DD-MM-YYYY");
      }
      state.tranferHisTable = payload;
      // state.tranferHisTable=payload.map(t=>{
      //   t.NgayGiaoDich=moment(t.NgayGiaoDich, 'YYYY-MM-DD').format('DD/MM/YYYY');
      // });
    },
    UPDATE_TRANFER_QUERY(state, payload) {
      state.tranferQuery = payload;
    },
    UPDATE_TRANFER_QUERY_NGAY_KET_THUC(state, payload) {
      state.NgayKetThuc = Date.parse(payload);
    },
    UPDATE_TRANFER_QUERY_NGAY_BAT_DAU(state, payload) {
      state.NgayBatDau = Date.parse(payload);
    },  
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
    },
    // Cập nhật nhân viên
    async updateDanhSachNhanVien(ctx, payload){
      // let res1 = await MyAxios({
      //   method: 'get',
      //   url: 'https://bank25.herokuapp.com/api/internal/account-customer/my-account-customer/payment-account',
      //   params: {
      //     "idTaiKhoanKhachHang": ctx.state.idTaiKhoanKhachHang
      //   }
      // });
      let res2 = await MyAxios({
        method: 'patch',
        url: 'https://bank25.herokuapp.com/api/internal/account-bank/my-account-number/receiver-info',
        // headers: {}, 
        data: {
          "MyAccountNumber": payload.SoTaiKhoan,
          "TenGoiNho": payload.TenGoiNho,
          "SoTaiKhoanNguoiNhan": payload.SoTaiKhoanNguoiNhan,
          "TenNganHang": payload.TenNganHang
        }
      });
      ctx.commit('UPDATE_DANH_SACH_NGUOI_THU_HUONG',payload);
    },
    async deleteDanhSachNhanVien(ctx, TenDangNhap){//Xóa nhan vien
      // let res1 = await MyAxios({
      //   method: 'get',
      //   url: 'https://bank25.herokuapp.com/api/internal/account-customer/my-account-customer/payment-account',
      //   params: {
      //     "idTaiKhoanKhachHang": ctx.state.idTaiKhoanKhachHang
      //   }
      // });
      let res2 = await MyAxios({
        method: 'delete',
        url: 'http://localhost:3000/api/admin/employees',
        // headers: {}, 
        data: {
          "TenDangNhap": TenDangNhap
        }
      });
      ctx.commit('DELETE_DANH_SACH_NHAN_VIEN',TenDangNhap);
    },
    async createAccountEmployee(ctx, input){//Thêm nhân viên
      let rowTaiKhoanNhanVien={
        "TenDangNhap": input.TenDangNhap,
        "MatKhau": input.MatKhau,
        "Email": input.Email,
        "SoDienThoai": input.SoDienThoai,
        "TenNhanVien": input.TenNhanVien,
        "GioiTinh": input.GioiTinh,
        "SoCMND": input.SoCMND,
        "NgaySinh": input.NgaySinh,
        "DiaChi": input.DiaChi,
        "ChucVu": input.ChucVu,
        "GhiChu":input.GhiChu
      }
      let res2 = await MyAxios({
        method: 'post',
        url: 'http://localhost:3000/api/admin/employees',
        // headers: {}, 
        data: rowTaiKhoanNhanVien
      }).then(response => {
        ctx.commit('ADD_NHAN_VIEN',input);
      }).catch(err=>{
        // console.log("err: ", err.response)
        ctx.commit('ADD_NHAN_VIEN_FAILED',err.response.data.err);
      })
      // console.log("Sắp nhận lỗi:", res2.data);
      // if(res2.data.err){
      //   console.log("nhận lỗi:", res2.data.err);
      //   ctx.commit('ADD_NHAN_VIEN_FAILED',res2.data.err);
      // }
      // console.log("Thànhcoong:");
      // ctx.commit('ADD_NHAN_VIEN',input);
      // console.log("Kết thúc:");
    },
    async getLichSuGiaoDich(ctx) {
      const respone = await axiosApiInstance.get(
        "http://localhost:3000/api/admin/transactions/all"
      );
      ctx.commit("GET_TRANFER_HISTORY", Object.values(respone.data));
    },
    //lay chuoi tim kiem lich su chuyen khoan
    updateSearchBankQuery(ctx, term) {
      ctx.commit("UPDATE_TRANFER_QUERY", term);
    },
    updateSearchNgayBatDau(ctx, term) {
      ctx.commit("UPDATE_TRANFER_QUERY_NGAY_BAT_DAU", term);
    },
    updateSearchNgayKetThuc(ctx, term) {
      ctx.commit("UPDATE_TRANFER_QUERY_NGAY_KET_THUC", term);
    },
  }
})

