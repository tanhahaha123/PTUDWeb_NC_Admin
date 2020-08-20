<template>
  <div class="content">
    <div class="md-layout">
      <div
        class="md-layout-item md-medium-size-50 md-xsmall-size-100 md-size-50"
      >
        <stats-card data-background-color="green">
          <template slot="header">
            <md-icon>account_balance</md-icon>
          </template>

          <template slot="content">
            <p class="category">Ngân hàng liên kết</p>
            <h3 class="title">{{ transactionsByBankName.labels.length }}</h3>
          </template>

          <!-- <template slot="footer">
            <div class="stats">
              <md-icon>date_range</md-icon>
              Last 24 Hours
            </div>
          </template> -->
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
            <p class="category">Tổng giao dịch</p>
            <h3 class="title" v-show="transactionsByBankName">
              {{
                transactionsByBankName.total.toLocaleString("it-IT", {
                  style: "currency",
                  currency: "VND"
                })
              }}
            </h3>
          </template>

          <!-- <template slot="footer">
            <div class="stats">
              <md-icon class="text-danger">warning</md-icon>
              <a href="#pablo">Get More Space...</a>
            </div>
          </template> -->
        </stats-card>
      </div>
      <div
        class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-100"
      >
        <chart-card
          v-if="isLoadingTransactionsByBankName"
          :chart-data="transactionsByBankName"
          :chart-options="dailySalesChart.options"
          :chart-type="'Bar'"
          data-background-color="blue"
        >
          <template slot="content">
            <h4 class="title">Ngân hàng liên kết</h4>
            <p class="category">
              <span class="text-success"
                ><i class="fas fa-long-arrow-alt-up"></i> 55%
              </span>
              Giao dịch với các ngân hàng liên kết.
            </p>
          </template>

          <template slot="footer">
            <div class="stats">
              <md-icon>access_time</md-icon>
              Xem chi tiết
            </div>
          </template>
        </chart-card>
      </div>
      <div
        class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-100"
      >
        <chart-card
          v-if="isLoadingTransactionsByMonth"
          :chart-data="transactionsByMonth"
          :chart-options="emailsSubscriptionChart.options"
          :chart-responsive-options="emailsSubscriptionChart.responsiveOptions"
          :chart-type="'Bar'"
          data-background-color="red"
        >
          <template slot="content">
            <h4 class="title">Tháng trong năm 2020</h4>
            <p class="category">
              Giao dịch của các tháng trong năm 2020
            </p>
          </template>
          <template slot="footer">
            <div class="stats">
              <md-icon>access_time</md-icon>
              Xem chi tiết
            </div>
          </template>
        </chart-card>
      </div>
      <div
        class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-100"
      >
        <chart-card
          v-if="isLoadingTransactionsByYear"
          :chart-data="transactionsByYear"
          :chart-options="dataCompletedTasksChart.options"
          :chart-type="'Line'"
          data-background-color="green"
        >
          <template slot="content">
            <h4 class="title">So sánh giữa các năm</h4>
            <p class="category">
              So sánh giao dịch của các năm
            </p>
          </template>

          <template slot="footer">
            <div class="stats">
              <md-icon>access_time</md-icon>
              Xem chi tiết
            </div>
          </template>
        </chart-card>
      </div>

      <!-- <div class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-50"></div> -->
    </div>
  </div>
</template>

<script>
import { StatsCard, ChartCard, NavTabsCard, NavTabsTable } from "@/components";

import { mapState } from "vuex";
export default {
  components: {
    StatsCard,
    ChartCard
  },
  data() {
    return {
      dailySalesChart: {
        options: {
          lineSmooth: this.$Chartist.Interpolation.cardinal({
            tension: 0
          }),
          chartPadding: {
            top: 0,
            right: 0,
            bottom: 0,
            left: 35
          },
          showGridBackground: false,
          showArea: true,
          axisX: {
            showGrid: false
          },
          axisY: {},
          plugins: [
            Chartist.plugins.ctPointLabels({
              textAnchor: "middle",
              labelInterpolationFnc: function(value) {
                console.log("i was called");
                return "$" + value;
              }
            }),
            Chartist.plugins.tooltip({
              currency: "$",
              class: "class1 class2",
              appendToBody: true
            })
          ],
          low: 0,
          high: 40000000
        }
      },
      dataCompletedTasksChart: {
        options: {
          lineSmooth: this.$Chartist.Interpolation.cardinal({
            tension: 0
          }),
          chartPadding: {
            top: 0,
            right: 0,
            bottom: 0,
            left: 35
          },
          plugins: [
            Chartist.plugins.tooltip({
              appendToBody: true
            })
          ]
        }
      },
      emailsSubscriptionChart: {
        options: {
          axisX: {
            showGrid: false
          },
          chartPadding: {
            top: 0,
            right: 5,
            bottom: 0,
            left: 35
          },
          plugins: [
            Chartist.plugins.ctPointLabels({
              textAnchor: "middle",
              labelInterpolationFnc: function(value) {
                console.log("i was called");
                return "$" + value;
              }
            }),
            Chartist.plugins.tooltip({
              currency: "$",
              class: "class1 class2",
              appendToBody: true
            })
          ]
        },
        responsiveOptions: [
          [
            "screen and (max-width: 640px)",
            {
              seriesBarDistance: 5,
              axisX: {
                labelInterpolationFnc: function(value) {
                  return value[0];
                }
              }
            }
          ]
        ]
      }
    };
  },
  mounted() {
    if (
      !this.isLoadingTransactionsByBankName ||
      !this.isLoadingTransactionsByMonth ||
      !this.isLoadingTransactionsByYear
    ) {
      this.$store.dispatch("getTotalTransactionsByBankName");
      this.$store.dispatch("getTotalTransactionsByMonth");
      this.$store.dispatch("getTotalTransactionsByYear");
    }
  },
  computed: {
    ...mapState([
      "transactionsByBankName",
      "isLoadingTransactionsByBankName",
      "transactionsByMonth",
      "isLoadingTransactionsByMonth",
      "transactionsByYear",
      "isLoadingTransactionsByYear"
    ])
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
