<template>
  <div class="content">
    <div class="md-layout" v-if="!displayThemNhanVien">
      <!-- <div
        class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-33"
      >
        <info
          icon="icon-lg pe-7f-1"
          bgclass="my-background-color-1"
          symbol="▩"
          :counter="accountsList.length"
          title="Tổng số tài khoản"
        >
        </info>
      </div>
      <div
        class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-33"
      >
        <info
          icon="icon-lg pe-7f-2"
          bgclass="my-background-color-2"
          symbol="▨"
          :counter="userPaymentDetail.length"
          title="Tài khoản thanh toán"
        >
        </info>
      </div> -->
      <div
        class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-100"
      >
        <md-card style="margin: 50px 0;">
          <md-card-header data-background-color="red">
            <h4 class="title">Danh sách Nhân Viên</h4>
            <p class="category">Tổng hợp danh sách nhân viên ở công ty</p>
            <b-button style="position: absolute; margin: 0; right: 40px; top: 15px;transform: translateY(-45%); z-index: 1;" variant="dark" @click="handleThemNhanVien">
              <md-icon style="color: #fff;">add</md-icon>
              Thêm mới
            </b-button>
          </md-card-header>
          <md-card-content>
            <employee-table></employee-table>
          </md-card-content>
        </md-card>
      </div>
    </div>
    <transition name="slfade">
      <div class="md-layout" v-if="displayThemNhanVien">
        <div class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-100">
          <md-card>
            <md-card-header data-background-color="green">
              <h5 class="title">Thêm nhân viên</h5>
            </md-card-header>
            <md-card-content>

              
              <div class="md-layout">
                <form>
                  <div class="md-layout-item md-small-size-100 md-size-100">
                    <br>
                  </div>
                  <!-- Thông tin cơ bản của nhân viên -->
                  <fieldset class="md-layout-item md-small-size-100 md-size-100" style="border: 2px solid #007bff!important;padding: .5rem!important">
                    <legend style="width: auto!important; color: #007bff!important">Thông tin nhân viên </legend>
                    <div class="md-layout">
                      <div class="md-layout-item md-small-size-100 md-size-40">
                        <md-field class="md-layout-item md-small-size-100 md-size-100" :class="getValidationClass('TenNhanVien')">
                          <label>Họ tên nhân viên</label>
                          <md-input type="text" v-model="input.TenNhanVien"></md-input>
                          <span class="md-error" v-if="!$v.input.TenNhanVien.required">Tên nhân viên không thể bỏ trống</span>
                        </md-field>
                      </div>
                      <div class="md-layout-item md-small-size-100 md-size-60">
                        <md-field class="md-layout-item md-small-size-100 md-size-100" :class="getValidationClass('Email')">
                          <label>Email</label>
                          <md-input type="text" v-model="input.Email"></md-input>
                          <span class="md-error" v-if="!$v.input.Email.required">Email không thể bỏ trống</span>
                          <span class="md-error" v-else-if="!$v.input.Email.email">Email không đúng định dạng</span>
                        </md-field>
                      </div>
                      <div class="md-layout-item md-small-size-100 md-size-20">
                        <md-field :class="getValidationClass('GioiTinh')">
                        <label>Giới tính</label>
                        <md-select v-model="input.GioiTinh" >
                            <md-option value="Nam">Nam</md-option>
                            <md-option value="Nữ">Nữ</md-option>
                            <md-option value="Khác">Khác</md-option>
                        </md-select>
                        <span class="md-error" v-if="!$v.input.GioiTinh.required">Giới tính không thể bỏ trống</span>
                        </md-field>
                      </div>
                      <div class="md-layout-item md-small-size-100 md-size-20">
                        <md-field class="md-layout-item md-small-size-100 md-size-100" :class="getValidationClass('SoDienThoai')">
                          <label>Số điện thoại</label>
                          <md-input type="text" v-model="input.SoDienThoai"></md-input>
                          <span class="md-error" v-if="!$v.input.SoDienThoai.required">Số điện thoại không thể bỏ trống</span>
                          <span class="md-error" v-else-if="!$v.input.SoDienThoai.phone">Số điện thoại sai định dạng</span>
                        </md-field>
                      </div>
                      <div class="md-layout-item md-small-size-100 md-size-20">
                        <md-field class="md-layout-item md-small-size-100 md-size-100" :class="getValidationClass('SoCMND')">
                          <label>Số CMND</label>
                          <md-input type="text" v-model="input.SoCMND"></md-input>
                          <span class="md-error" v-if="!$v.input.SoCMND.required">Số CMND không thể bỏ trống</span>
                          <span class="md-error" v-else-if="!$v.input.SoCMND.indentity">Số CMND sai định dạng bao gồm 10 số, không kí tự</span>
                        </md-field>
                      </div>
                      <div class="md-layout-item md-small-size-100 md-size-40" >
                          <md-datepicker v-model="input.NgaySinh" :class="getValidationClass('NgaySinh')">
                            <label>Ngày sinh</label>
                            <span class="md-error" v-if="!$v.input.NgaySinh.required">Ngày sinh không thể bỏ trống</span>
                            <span class="md-error" v-else-if="!$v.input.NgaySinh.day">Ngày sinh không hợp lệ</span>
                          </md-datepicker>
                      </div>
                      <div class="md-layout-item md-small-size-100 md-size-100">
                        <md-field class="md-layout-item md-small-size-100 md-size-100" :class="getValidationClass('DiaChi')">
                          <label>Địa chỉ</label>
                          <md-input type="text" v-model="input.DiaChi"></md-input>
                          <span class="md-error" v-if="!$v.input.DiaChi.required">Địa chỉ không thể bỏ trống</span>
                        </md-field>
                      </div>
                      <div class="md-layout-item md-small-size-100 md-size-100">
                        <md-field class="md-layout-item md-small-size-100 md-size-100" :class="getValidationClass('ChucVu')">
                          <label>Chức vụ</label>
                          <md-select v-model="input.ChucVu" >
                            <md-option value="Giao dịch viên">Giao dịch viên</md-option>
                            <md-option value="Quản trị viên">Quản trị viên</md-option>
                        </md-select>
                          <span class="md-error" v-if="!$v.input.ChucVu.required">Chức vụ không thể bỏ trống</span>
                        </md-field>
                      </div>
                      <div class="md-layout-item md-small-size-100 md-size-100">
                        <md-field class="md-layout-item md-small-size-100 md-size-100" :class="getValidationClass('GhiChu')">
                          <label>Ghi chú</label>
                          <md-input type="text" v-model="input.GhiChu"></md-input>
                        </md-field>
                      </div>
                    </div>
                  </fieldset>

                   <!-- Thông tin tài khoản nhân viên   -->
                  <div class="md-layout-item md-small-size-100 md-size-100">
                    <br>
                  </div>
                  <fieldset class="md-layout-item md-small-size-100 md-size-100" style="border: 2px solid #007bff!important;padding: .5rem!important">
                    <legend style="width: auto!important; color: #007bff!important">Thông tin tài khoản </legend>
                    <div class="md-layout">
                      <div class="md-layout-item md-small-size-100 md-size-50">
                        <md-field :class="getValidationClass('TenDangNhap')">
                          <label>Tên tài khoản</label>
                          <md-input type="text" v-model="input.TenDangNhap"></md-input>
                          <span class="md-error" v-if="!$v.input.TenDangNhap.required">Tên tài khoản không thể bỏ trống</span>
                        </md-field>
                      </div>
                      <div class="md-layout-item md-small-size-100 md-size-50">
                        <md-field :class="getValidationClass('MatKhau')">
                          <label>Mật khẩu</label>
                          <md-input type="text" v-model="input.MatKhau"></md-input>
                          <span class="md-error" v-if="!$v.input.MatKhau.required">Mật khẩu không thể bỏ trống</span>
                        </md-field>
                      </div>
                      <div class="md-layout-item md-small-size-100 md-size-50">
                        <md-field :class="getValidationClass('XacNhanMatKhau')">
                          <label>Nhập lại mật khẩu</label>
                          <md-input type="text" v-model="input.XacNhanMatKhau"></md-input>
                          <span class="md-error" v-if="!$v.input.XacNhanMatKhau.required">Nhập lại mật khẩu</span>
                          <span class="md-error" v-else-if="!$v.input.XacNhanMatKhau.sameAsPassword">Mật khẩu không giống</span>
                        </md-field>
                      </div>
                    </div>
                  </fieldset>
                  <div class="md-layout-item md-small-size-100 md-size-100">
                    <br>
                  </div>
                  <div class="md-layout-item md-size-100 text-left"  style="margin-bottom: 1rem">
                    <b-button type="submit" variant="success" @click="handleGuiYeuCau">Thêm mới</b-button>
                    <b-button style="margin-left: 10px;" variant="secondary" @click="handleQuayLai">Quay lại</b-button>
                    <b-spinner style="margin-left: 0.5rem;" v-if="LoadingGoiYeuCau" variant="primary" small label="Small Spinner" type="grow"></b-spinner>
                  </div>
                  <div class="md-layout-item md-small-size-100 md-size-100">
                    <br>
                  </div>
                </form>
              </div>
            </md-card-content>
          </md-card>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
// import { PaymentAccountsTable, SavingAccountsTable } from "@/components";
import { EmployeeTable } from "@/components";
import { mapState } from "vuex";
const moment=require('moment');
import { validationMixin } from 'vuelidate'
import {
  required,
  email,
  sameAs,
  minLength,
  maxLength
} from 'vuelidate/lib/validators';
const day = (value, vm) => {
  return moment(value,"YYYY-MM-DD").isValid();
};
const phone = (value, vm) => {
  var phoneno = /^\d{9}$/;
  return phoneno.test(value);
};
const indentity = (value, vm) => {
  var phoneno = /^\d{10}$/;
  return phoneno.test(value);
};
export default {
  components: {
    EmployeeTable
  },
  mixins: [validationMixin],
  data() {
    let date = moment().format("YYYY-MM-DD");
    return {
      displayThemNhanVien: false, 
      addRowEmployee : null,
      LoadingGoiYeuCau: false,
      input:{ 
        TenNhanVien:null,
        Email:null,
        SoDienThoai:null,
        GioiTinh:null,
        SoCMND:null,
        NgaySinh:date,
        DiaChi:null,
        GhiChu:null,
        ChucVu:null,
        TenDangNhap:null,
        MatKhau:null,
        XacNhanMatKhau:null
      },
    };
  },
  validations:{
    input:{
        TenNhanVien:{
          required
        },
        Email:{
          required,
          email
        },
        GioiTinh: {
          required
        },
        SoDienThoai:{
          required,
          phone
        },
        SoCMND: {
          required,
          indentity
        },
        NgaySinh:{
          required, 
          day
        },
        DiaChi:{
          required
        },
        ChucVu:{
          required
        },
        GhiChu:{

        },
        TenDangNhap: {
          required
        },
        MatKhau: {
          required
        },
        XacNhanMatKhau:{
          required,
          sameAsPassword: sameAs('MatKhau')
        },
    }
  },
  created() {
    this.$store.dispatch("getEmployeesFromDB");
  },
  methods:{
    getValidationClass (fieldName) {
      const field = this.$v.input[fieldName]

      if (field) {
        return {
          'md-invalid': field.$invalid && field.$dirty
        }
      }
    },
    handleThemNhanVien(){
      this.displayThemNhanVien = true;
    },
    handleGuiYeuCau(){
      event.preventDefault();//ngăn chặn sự kiện mặc định của nút submit gửi request
      this.$v.$touch()
      if (!this.$v.$invalid) {
        this.LoadingGoiYeuCau = true
        this.$store.dispatch('createAccountEmployee',this.input).then(res=>{
          //Hiển thị thông báo
          this.$notify({ 
            message:
            this.$store.state.statusRes.mess,
            icon: "add_alert",
            horizontalAlign: "center",
            verticalAlign: "bottom",
            type: this.$store.state.statusRes.stat
          });
          if(this.$store.state.statusRes.stat== "danger")
            {
              this.displayThemNhanVien = true;
              this.LoadingGoiYeuCau = false;
            }
            else if(this.$store.state.statusRes.stat== "success") 
            {
              this.displayThemNhanVien = false;
              this.LoadingGoiYeuCau = false;
            }
        });
      }
    },
    handleQuayLai(){
        this.displayThemNhanVien = false;
    },
  }
};
</script>
<style>
.my-background-color-1 {
  background: linear-gradient(60deg, #707dc1, #5c6bc6);
}
.my-background-color-2 {
  background: linear-gradient(60deg, #f05350, #e43935);
}
.my-background-color-3 {
  background: linear-gradient(60deg, #66ba6a, #43a147);
}
.icon-lg {
  font-size: 4.68em;
}
.pe-7f-1:before {
  content: "\e698";
}
.pe-7f-2:before {
  content: "\e6e5";
}
.pe-7f-3:before {
  content: "\e63b";
}
</style>
