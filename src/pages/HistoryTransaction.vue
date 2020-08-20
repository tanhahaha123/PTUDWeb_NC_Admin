<template>
  <div class="content">
    <div class="md-layout">
      <div
        class="md-layout-item md-medium-size-50 md-xsmall-size-100 md-size-50"
      >
        <stats-card data-background-color="green">
          <template slot="header">
            <md-icon>store</md-icon>
          </template>

          <template slot="content">
            <p class="category">Tổng số giao dịch</p>
            <h5 class="title">{{ tranferFilter.length }}</h5>
            <p class="category">Tổng số giao dịch nộp tiền</p>
            <h5 class="title">{{ tranferFilter.filter(x => x.LoaiGiaoDich=== "nhận tiền").length }}</h5>
            <p class="category">Tổng số giao dịch chuyển khoản</p>
            <h5 class="title">{{ tranferFilter.filter(x => x.LoaiGiaoDich=== "chuyển khoản").length }}</h5>
          </template>
        </stats-card>
      </div>
      <div
        class="md-layout-item md-medium-size-50 md-xsmall-size-100 md-size-50"
      >
        <stats-card data-background-color="orange">
          <template slot="header">
            <md-icon>content_copy</md-icon>
          </template>

          <template slot="content">
            <p class="category">Tổng số tiền giao dịch</p>
            <h5 class="title">{{
                totalSoTienGiaoDich.toLocaleString("it-IT", {
                  style: "currency",
                  currency: "VND"
                })
              }}
            </h5>
            <p class="category">Tổng số tiền đã nạp</p>
            <h5 class="title">{{
                totalSoTienDaNap.toLocaleString("it-IT", {
                  style: "currency",
                  currency: "VND"
                })
              }}
            </h5>
            <p class="category">Tổng số tiền đã chuyển khoản</p>
            <h5 class="title">{{
                totalSoTienChuyenKhoan.toLocaleString("it-IT", {
                  style: "currency",
                  currency: "VND"
                })
              }}
            </h5>
          </template>

          <!-- <template slot="footer">
            <div class="stats">
              <md-icon class="text-danger">warning</md-icon>
              <a href="#pablo">Get More Space...</a>
            </div>
          </template> -->
        </stats-card>
      </div>
      <div class="md-layout-item md-small-size-100 md-size-20">
        <md-field class="md-layout-item md-small-size-100 md-size-100">
          <md-select v-model="BankQuery" placeholder= "Tất cả">
              <md-option value="AGRIBANK">AGRIBANK</md-option>
              <md-option value="GO">GO</md-option>
              <md-option value="37Bank">37BANK</md-option>
              <md-option value="30Bank">30BANK</md-option>
              <md-option value="25Bank">25BANK</md-option>
              <md-option value="ALL">Tất cả</md-option>
          </md-select>
          <!-- <md-input type="text" placeholder="Nhập thông tin người cần tìm" v-model="BankQuery" @input="tranferTableSearch"></md-input> -->
        </md-field>
      </div>
      <div class="md-layout-item md-small-size-100 md-size-40" >
          <md-datepicker v-model="NgayBatDau">
            <label>Ngày bắt đầu</label>
            <!-- <span class="md-error" v-if="!$v.input.NgaySinh.required">Ngày sinh không thể bỏ trống</span>
            <span class="md-error" v-else-if="!$v.input.NgaySinh.day">Ngày sinh không hợp lệ</span> -->
          </md-datepicker>
      </div>
      <div class="md-layout-item md-small-size-100 md-size-40" >
          <md-datepicker v-model="NgayKetThuc">
            <label>Ngày kết thúc</label>
            <!-- <span class="md-error" v-if="!$v.input.NgaySinh.required">Ngày sinh không thể bỏ trống</span>
            <span class="md-error" v-else-if="!$v.input.NgaySinh.day">Ngày sinh không hợp lệ</span> -->
          </md-datepicker>
      </div>
      <div class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-100">
        <md-card>
          <md-card-header data-background-color="blue">
            <h4 class="title">Lịch sử giao dịch</h4>
          </md-card-header>
          <md-card-content>
            <tranfer-history-table :tranferFilter="tranferFilter"></tranfer-history-table>
          </md-card-content>
        </md-card>
      </div>
    </div>
  </div>
</template>

<script>
import { StatsCard, NavTabsCard, TranferHistoryTable } from "@/components";

import { mapState, mapGetters } from "vuex";
export default {
  components: {
    StatsCard,
    TranferHistoryTable,
  },
  data() {
    return {
      BankQuery:'ALL',
      NgayBatDau: "1980-1-1",
      NgayKetThuc: "2020-12-31"
    }
  },
  mounted() {
    if (
      !this.isLoadingTransactionsByBankName ||
      !this.isLoadingTransactionsByMonth ||
      !this.isLoadingTransactionsByYear) 
    {
      this.$store.dispatch("getTotalTransactionsByBankName");
      this.$store.dispatch("getTotalTransactionsByMonth");
      this.$store.dispatch("getTotalTransactionsByYear");
    }
    this.$store.dispatch('getLichSuGiaoDich');
  },
  computed: {
    ...mapState([
      "transactionsByBankName",
      "isLoadingTransactionsByBankName",
      "transactionsByMonth",
      "isLoadingTransactionsByMonth",
      "transactionsByYear",
      "isLoadingTransactionsByYear",
      "tranferHisTable",
      "totalSoTienGiaoDich",
      "totalSoTienDaNap",
      "totalSoTienChuyenKhoan"
    ]),
    ...mapGetters(["tranferFilter", "totalFilter"])
  },
  methods:{
    tranferTableSearch () {
      this.$store.dispatch('updateSearch',this.BankQuery);
    },
    onChange(event) {
      console.log(event.target.value)
    }
  },
  watch: {
      'BankQuery': function(newValue,oldValue){
        this.$store.dispatch('updateSearchBankQuery',this.BankQuery);
      },
      'NgayBatDau': function(newValue,oldValue){
        this.$store.dispatch('updateSearchNgayBatDau',this.NgayBatDau);
      },
      'NgayKetThuc': function(newValue,oldValue){
        this.$store.dispatch('updateSearchNgayKetThuc',this.NgayKetThuc);
      }
    }
};
</script>

<style scoped>
.chartist-tooltip {
  opacity: 0;
  position: absolute;
  margin: 20px 0 0 10px;
  background: rgba(0, 0, 0, 0.8);
  color: #fff;
  padding: 5px 10px;
  border-radius: 4px;
}

.chartist-tooltip.tooltip-show {
  opacity: 1;
}
</style>
