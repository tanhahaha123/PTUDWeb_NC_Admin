<template>
  <div>
    <md-table table-header-color="green" v-model="employees">
      <md-table-row slot="md-table-row" slot-scope="{ item }">
        <md-table-cell md-label="STT">{{
          item.idTaiKhoanNhanVien
        }}</md-table-cell>
        <md-table-cell md-label="Họ tên">{{ item.TenNhanVien }}</md-table-cell>
        <md-table-cell md-label="Giới tính">{{ item.GioiTinh }}</md-table-cell>
        <md-table-cell md-label="CMND">{{ item.SoCMND }}</md-table-cell>
        <md-table-cell md-label="Ngày sinh">{{ item.NgaySinh }}</md-table-cell>
        <md-table-cell md-label="Địa chỉ">{{ item.DiaChi }}</md-table-cell>
        <md-table-cell md-label="Chức vụ">{{ item.ChucVu }}</md-table-cell>
        <md-table-cell md-label="Ghi chú">{{ item.GhiChu }}</md-table-cell>
        <!-- <md-table-cell md-label="">{{ item.SoDu }}</md-table-cell> -->
      </md-table-row>
    </md-table>
  </div>
</template>

<script>
export default {
  name: "employee-table",
  props: ["employees"]
};
</script>
