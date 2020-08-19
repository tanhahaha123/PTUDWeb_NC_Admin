<template>
  <div>
    <md-table v-if="displayDanhSachNhanVien==true" table-header-color="green" v-model="themsttDanhSachNhanVien">
      <md-table-row slot="md-table-row" slot-scope="{ item }">
        <md-table-cell md-label="STT">{{
          item.STT
        }}</md-table-cell>
        <md-table-cell md-label="Họ tên">{{ item.TenNhanVien }}</md-table-cell>
        <md-table-cell md-label="Tên đăng nhập">{{ item.TenDangNhap }}</md-table-cell>
        <md-table-cell md-label="Giới tính">{{ item.GioiTinh }}</md-table-cell>
        <md-table-cell md-label="CMND">{{ item.SoCMND }}</md-table-cell>
        <md-table-cell md-label="Ngày sinh">{{ item.NgaySinh }}</md-table-cell>
        <md-table-cell md-label="Địa chỉ">{{ item.DiaChi }}</md-table-cell>
        <md-table-cell md-label="Chức vụ">{{ item.ChucVu }}</md-table-cell>
        <md-table-cell md-label="Ghi chú">{{ item.GhiChu }}</md-table-cell>
        <md-table-cell md-label="Hành động">
        <md-button style="height: 20px;" class="md-just-icon md-simple md-primary nofocus" @click="handlebtnEdit" >
          <md-icon>edit</md-icon>
          <md-tooltip md-direction="top">Chỉnh sửa</md-tooltip>
        </md-button>
        <md-button style="height: 20px;" class="md-just-icon md-simple md-danger nofocus" @click="handlebtnDelete" >
          <md-icon>close</md-icon>
          <md-tooltip md-direction="top">Xóa</md-tooltip>
        </md-button>
      </md-table-cell>
        <!-- <md-table-cell md-label="">{{ item.SoDu }}</md-table-cell> -->
      </md-table-row>
    </md-table>

    <!-- Chỉnh sửa thông tin nhân viên -->
    <transition name="slfade">
      <form v-if="displayDanhSachNhanVien==false" class="md-layout">
        <div class="md-layout-item md-small-size-100 md-size-100">
          <br><br>
          <div class="row" style="margin-bottom: 1rem">
            <div class="col-2"></div>
            <div class="col-10">
              <h4 style="font-weight: bold">CHỈNH SỬA THÔNG TIN NHÂN VIÊN</h4>
            </div>
          </div>
          <br>
          <div class="row" style="margin-bottom: 1rem">
            <div class="col-2"></div>
            <label class="col-2 col-form-label lb-fontsize">Họ và tên</label>
            <div class="col-5">
              <b-form-input id="edtHoTen" v-model="editRowSelected.HoTen" placeholder="Nhập tên cần chỉnh sửa" :disabled="disableHoTen" required></b-form-input>
            </div>
            <div class="col-3"></div>
          </div>
          <div class="row" style="margin-bottom: 1rem">
            <div class="col-2"></div>
            <label class="col-2 col-form-label lb-fontsize">Giới tính</label>
            <div class="col-5">
              <md-field>
                <md-select v-model="editRowSelected.GioiTinh" name="country" id="edtGioiTinh" placeholder="Giới tính">
                  <md-option value="Nam">Nam</md-option>
                  <md-option value="Nữ">Nữ</md-option>
                </md-select>
              </md-field>
              <!-- <b-form-input id="edtSoTaiKhoan" v-model="editRowSelected.SoTaiKhoanNguoiNhan" type="number" placeholder="Nhập giới tính cần chỉnh sửa" :disabled="disableSoTaiKhoanNguoiNhan" required></b-form-input> -->
            </div>
            <div class="col-3"></div>
          </div>
          <div class="row" style="margin-bottom: 1rem">
            <div class="col-2"></div>
            <label class="col-2 col-form-label lb-fontsize">Số CMND</label>
            <div class="col-5">
              <b-form-input id="edtSoCMND" v-model="editRowSelected.SoCMND" type="number" placeholder="Chỉnh sửa số CMND" :disabled="disableSoCMND" required></b-form-input>
            </div>
            <div class="col-3"></div>
          </div>
          <div class="row" style="margin-bottom: 1rem">
            <div class="col-2"></div>
            <label class="col-2 col-form-label lb-fontsize">Địa chỉ</label>
            <div class="col-5">
              <b-form-input id="edtDiaChi" :value="editRowSelected.DiaChi" :disabled="disableDiaChi"></b-form-input>
            </div>
            <div class="col-3"></div>
          </div>
          <div class="row" style="margin-bottom: 1rem">
            <div class="col-4"></div>
            <div class="col-4">
              <b-button type="submit" variant="success" @click="handleThucHienChinhSua">Thực hiện chỉnh sửa</b-button>
              &nbsp;
              <b-button variant="secondary" @click="displayDanhSachNhanVien = true">Quay trở lại</b-button>
            </div>
            <div class="col-4"></div>
          </div>
        </div>
      </form>
    </transition>
    <!-- Form xóa thông tin của một nhân viên -->
    <b-modal ref="my-modal" hide-footer title="Thông báo">
      <div class="d-block text-center" style="border-top: 1px solid #e9ecef; padding: 1rem;">
        <h3>Bạn có chắc chắn muốn xóa:</h3>
        <br>
        <strong style="color: #0069d9;font-size: 1rem">{{deleteRowSelected.HoTen}} </strong>
      </div>
      <div style="display: flex; justify-content: flex-end; border-top: 1px solid #e9ecef">
        <b-button style="margin-right:0.25rem" class="mt-3" variant="secondary" @click="handleHuyBo">Hủy bỏ</b-button>
        <b-button style="margin-left:0.25rem" class="mt-3" variant="primary" @click="handleXacNhan">Xác nhận</b-button>
      </div>
    </b-modal>
  </div>
</template>

<script>
import { mapState,mapGetters } from 'vuex';
export default {
  name: "employee-table",
  props: {
      tableHeaderColor: {
        type: String,
        default: ""
      }
  },
  data() {
      return {
        displayDanhSachNhanVien: true,
        selected: [],
        editRowSelected: {},
        deleteRowSelected: {},
        originalHoTen: null,
        originalSoTaiKhoanNguoiNhan: null,
        disableHoTen: false,
        disableGioiTinh: false,
        disableSoCMND: false,
        disableDiaChi: false,
      };
  },
  computed: {
    ...mapState(['selectedTaiKhoanThanhToan','DanhSachNhanVien']),
    ...mapGetters(['themsttDanhSachNhanVien'])
  },
  methods: {
    handlebtnEdit(e){
        let element = e.target.closest('tr').getElementsByTagName('td');
        let rowSelected = {};
        rowSelected.SoTaiKhoan = this.selectedTaiKhoanThanhToan;
        rowSelected.STT = element[0].textContent;
        rowSelected.HoTen = element[1].textContent;
        rowSelected.GioiTinh = element[2].textContent;
        rowSelected.SoCMND = element[3].textContent;
        rowSelected.NgaySinh = element[4].textContent;
        rowSelected.DiaChi = element[5].textContent;
        rowSelected.ChucVu = element[6].textContent;
        this.editRowSelected = rowSelected;
        this.originalHoTen = rowSelected.HoTen;
        this.originalSoTaiKhoanNguoiNhan = rowSelected.SoTaiKhoanNguoiNhan;
        this.displayDanhSachNhanVien = false;
    },
    handleThucHienChinhSua(event){
        if (
        !document.getElementById('edtHoTen').checkValidity() ||
        !document.getElementById('edtSoCMND').checkValidity() ||
        !document.getElementById('edtGioiTinh').checkValidity() ||
        !document.getElementById('edtDiaChi').checkValidity()
        ) return false;//Nếu chưa validate sẽ hiện thông báo của thuộc tính "required trong form"
        event.preventDefault();//ngăn chặn sự kiện mặc định của nút submit gửi request

        this.$store.dispatch('updateDanhSachNhanVien',this.editRowSelected);
        this.displayDanhSachThuHuong = true;
        this.disableTenGoiNho = false;
        this.disableSoTaiKhoanNguoiNhan = false;
    },
    handlebtnDelete(e){
        this.$refs['my-modal'].show();
        let element = e.target.closest('tr').getElementsByTagName('td');
        let rowSelected = {};
        rowSelected.SoTaiKhoan = this.selectedTaiKhoanThanhToan;
        rowSelected.HoTen = element[1].textContent;
        rowSelected.TenDangNhap = element[2].textContent;
        // rowSelected.TenNganHang = element[3].textContent;
        this.deleteRowSelected = rowSelected;
    },
    handleHuyBo() {
        this.deleteRowSelected = {};
        this.$refs['my-modal'].hide();
      },
    handleXacNhan(){
      this.$store.dispatch('deleteDanhSachNhanVien',this.deleteRowSelected.TenDangNhap);
      this.$refs['my-modal'].hide();
    },
  }
};
</script>


<style lang="scss" scoped>
 ::v-deep {
   @import 'bootstrap/scss/bootstrap.scss';
 }
</style>

<style scoped>
  .lb-fontsize {
    font-size: 1.1rem;
  }
  .form-control {
    background-image: unset;
    background-size: unset;
    background-repeat: unset;
    background-position: unset;
    float: unset;
    box-shadow: unset;
  }
  .nofocus {
    outline: none!important;
  }




  .bounce-enter-active {
    animation: bounce-in .5s;
  }

  @keyframes bounce-in {
    0% {
      transform: scale(0);
    }
    50% {
      transform: scale(1.5);
    }
    100% {
      transform: scale(1);
    }
  }

  .slfade-enter-active {
    transition: all .3s ease;
  }
  .slfade-enter, .slfade-leave-to
  /* .slide-fade-leave-active below version 2.1.8 */ {
    transform: translateX(10px);
    opacity: 0;
  }
</style>