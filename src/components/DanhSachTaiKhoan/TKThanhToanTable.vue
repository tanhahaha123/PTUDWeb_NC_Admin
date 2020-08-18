<template>
  <div>
    <md-table v-model="listTaiKhoanThanhToan" :table-header-color="tableHeaderColor">
      <md-table-row slot="md-table-row" slot-scope="{ item }">
        <md-table-cell md-label="STT">{{ item.key }}</md-table-cell>
        <md-table-cell md-label="Số TK">{{ item.SoTaiKhoan }}</md-table-cell>
        <md-table-cell md-label="Số dư">{{ item.SoDu }}</md-table-cell>
      </md-table-row>
    </md-table>
  </div>
</template>

<script>
export default {
  name: "tk-thanh-toan-table",
  props: {
    tableHeaderColor: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      selected: [],
      listTaiKhoanThanhToan: [
        {"STT":1, "SoTaiKhoan": 789789789, "SoDu": "125.000"}
      ]
    };
  }
};
</script>
