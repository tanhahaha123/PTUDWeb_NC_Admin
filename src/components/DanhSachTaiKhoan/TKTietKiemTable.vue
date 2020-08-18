<template>
  <div>
    <md-table v-model="listTaiKhoanTietKiem" :table-header-color="tableHeaderColor">
      <md-table-row slot="md-table-row" slot-scope="{ item }">
        <md-table-cell md-label="STT">{{ item.STT }}</md-table-cell>
        <md-table-cell md-label="Số TK">{{ item.SoTaiKhoan }}</md-table-cell>
        <md-table-cell md-label="Số dư">{{ item.SoDu }}</md-table-cell>
        <md-table-cell md-label="Ngày gửi">{{ item.NgayGui }}</md-table-cell>
        <md-table-cell md-label="Kỳ hạn gửi">{{ item.KyHanGui }}</md-table-cell>
        <md-table-cell md-label="Lãi suất">{{ item.LaiSuat }}</md-table-cell>
      </md-table-row>
    </md-table>
  </div>
</template>

<script>
export default {
  name: "tk-tiet-kiem-table",
  props: {
    tableHeaderColor: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      selected: [],
      listTaiKhoanTietKiem: [
      {"STT":1, "SoTaiKhoan": 789789789, "SoDu": "125.000", "NgayGui":"30/04/2012", "KyHanGui":"2 Năm", "LaiSuat":"2%"},
      {"STT":2, "SoTaiKhoan": 789789789, "SoDu": "5.000.000", "NgayGui":"31/05/2012", "KyHanGui":"1 tháng", "LaiSuat":"1.7%"},
      {"STT":3, "SoTaiKhoan": 789789789, "SoDu": "1.000.000", "NgayGui":"01/06/2012", "KyHanGui":"10 Năm", "LaiSuat":"5%"},
      {"STT":4, "SoTaiKhoan": 789789789, "SoDu": "200.000", "NgayGui":"13/05/2015", "KyHanGui":"7 Tuần", "LaiSuat":"2%"},
      {"STT":5, "SoTaiKhoan": 789789789, "SoDu": "1.500.000", "NgayGui":"05/04/2012", "KyHanGui":"2 Năm", "LaiSuat":"2%"},
      {"STT":6, "SoTaiKhoan": 789789789, "SoDu": "100.000", "NgayGui":"17/04/2014", "KyHanGui":"6 Tháng", "LaiSuat":"1%"}
    ]
    };
  }
};
</script>
