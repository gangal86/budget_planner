<template>
  <transition appear enter-active-class="animated zoomIn">
    <q-page
      class="flex flex-center page-wrapper"
      :class="{ 'balance-details': !isHideCharts }"
    >
      <q-select v-model="currentMonth" :options="otherMonths" dense borderless />
      <div v-if="renderChart">
        <apexchart
          v-if="!isChart && isHideCharts"
          type="pie"
          width="400"
          :options="chartOptionsFull"
          :series="series"
        />
        <apexchart
          v-if="isChart && isHideCharts"
          type="pie"
          width="370"
          :options="chartOptionsEmpty"
          :series="series"
        />
      </div>
      <div class="column">
        <div @click="showBalanceDetails" class="q-mb-md q-mt-md">
          <q-banner rounded class="bg-yellow-10 text-white text-center banner-wrapper">
            <div class="row items-center justify-center justify-around">
              <div>
                <q-icon name="dehaze" color="white" size="25px" />
              </div>
              <div class="text-subtitle1">Баланс {{ balance }} {{ getCurrency }}</div>
              <div>
                <q-icon name="dehaze" color="white" size="25px" />
              </div>
            </div>
          </q-banner>
        </div>
        <transition appear enter-active-class="animated zoomIn">
          <q-list
            v-if="!isHideCharts && !isChart"
            class="balance-details-wrapper"
            separator
            bordered
          >
            <q-item
              v-for="item in budgetPlanCurrentMonth"
              :key="item.id"
              class="q-mr-md"
              clickable
              v-ripple
              dense
            >
              <q-item-section class="col-1">
                <q-icon
                  v-if="item.incomeValue !== undefined"
                  name="circle"
                  color="teal-5"
                  size="11px"
                />
                <q-icon
                  v-if="item.consumptionValue !== undefined"
                  name="circle"
                  color="pink-13"
                  size="11px"
                />
              </q-item-section>
              <q-item-section
                v-if="item.incomeValue !== undefined"
                class="col-3 text-teal-5"
              >
                {{ item.incomeValue }} {{ getCurrency }}
              </q-item-section>
              <q-item-section
                v-if="item.consumptionValue !== undefined"
                class="col-3 text-pink-13"
              >
                {{ item.consumptionValue }} {{ getCurrency }}
              </q-item-section>
              <q-item-section
                v-if="item.incomeValue !== undefined"
                class="col-4 text-teal-5"
              >
                {{ item.incomeCategory }}
              </q-item-section>
              <q-item-section
                v-if="item.consumptionValue !== undefined"
                class="col-4 text-pink-13"
              >
                {{ item.consumptionCategory }}
              </q-item-section>
              <q-item-section
                v-if="item.incomeValue !== undefined"
                class="col-4 text-teal-5"
              >
                {{ formatDate(item.date) }}
              </q-item-section>
              <q-item-section
                v-if="item.consumptionValue !== undefined"
                class="col-4 text-pink-13"
              >
                {{ formatDate(item.date) }}
              </q-item-section>
            </q-item>
          </q-list>
        </transition>
        <div class="row">
          <q-page-sticky position="bottom-right" :offset="[18, 18]">
            <q-btn
              @click="isAddConsumptionDialog = !isAddConsumptionDialog"
              fab
              icon="remove"
              color="pink-13"
            />
          </q-page-sticky>
          <q-page-sticky position="bottom-left" :offset="[18, 18]">
            <q-btn
              @click="isAddIncomeDialog = !isAddIncomeDialog"
              fab
              icon="add"
              color="teal-5"
            />
          </q-page-sticky>
        </div>
      </div>
      <AddIncomeDialog
        v-model="isAddIncomeDialog"
        :renderChart="renderChart"
        @update:renderChart="renderChart = $event"
      />
      <AddConsumptionDialog
        v-model="isAddConsumptionDialog"
        :renderChart="renderChart"
        @update:renderChart="renderChart = $event"
      />
    </q-page>
  </transition>
</template>

<script>
import { mapGetters } from 'vuex'
import { date } from 'quasar'
import AddIncomeDialog from '../components/AddIncomeDialog'
import AddConsumptionDialog from '../components/AddConsumptionDialog'

const switchMonth = function (currentMonth, monthNum = 0) {
  switch (currentMonth) {
    case 'Январь':
      monthNum = 0
      break
    case 'Февраль':
      monthNum = 1
      break
    case 'Март':
      monthNum = 2
      break
    case 'Апрель':
      monthNum = 3
      break
    case 'Май':
      monthNum = 4
      break
    case 'Июнь':
      monthNum = 5
      break
    case 'Июль':
      monthNum = 6
      break
    case 'Август':
      monthNum = 7
      break
    case 'Сентябрь':
      monthNum = 8
      break
    case 'Октябрь':
      monthNum = 9
      break
    case 'Ноябрь':
      monthNum = 10
      break
    case 'Декабрь':
      monthNum = 11
      break
  }
  return monthNum
}

export default {
  name: 'MainPage',
  components: {
    AddIncomeDialog,
    AddConsumptionDialog,
  },
  data() {
    return {
      renderChart: true,
      isChart: true,
      isHideCharts: true,
      isAddIncomeDialog: false,
      isAddConsumptionDialog: false,
      currentMonth: (function () {
        let currentMonth = new Date().toLocaleString('ru-RU', { month: 'long' })
        currentMonth = currentMonth.charAt(0).toUpperCase() + currentMonth.slice(1)
        return currentMonth
      })(),
      otherMonths: [
        'Январь',
        'Февраль',
        'Март',
        'Апрель',
        'Май',
        'Июнь',
        'Июль',
        'Август',
        'Сентябрь',
        'Октябрь',
        'Ноябрь',
        'Декабрь',
      ],
      chartOptionsFull: {
        legend: {
          position: 'bottom',
          markers: {
            fillColors: ['#f50057', '#26a69a'],
          },
        },
        colors: ['#26a69a', '#f50057'],
        labels: ['Расход', 'Доход'],
        dataLabels: {
          formatter: (val, opts) => {
            return opts.w.config.series[opts.seriesIndex] + ' ' + this.getCurrency
          },
        },
        responsive: [
          {
            breakpoint: 270,
            options: {
              chart: {
                width: 380,
              },
            },
          },
        ],
      },
      chartOptionsEmpty: {
        legend: {
          show: false,
        },
        colors: ['#b0bec5', '#90a4ae'],
        responsive: [
          {
            breakpoint: 270,
            options: {
              chart: {
                width: 350,
              },
            },
          },
        ],
      },
    }
  },
  computed: {
    ...mapGetters('storeBudgetPlan', [
      'getIncomeSum',
      'getConsumptionSum',
      'getCurrency',
      'getBudgetPlan',
    ]),
    budgetPlanCurrentMonth() {
      let monthNum = switchMonth(this.currentMonth)
      return this.getBudgetPlan(monthNum)
    },
    series() {
      let monthNum = switchMonth(this.currentMonth)
      let income = this.getIncomeSum(monthNum)
      let consumption = this.getConsumptionSum(monthNum)
      if (income === 0 && consumption === 0) {
        this.$nextTick(() => {
          this.isChart = true
        })
        return [50, 50]
      } else {
        this.$nextTick(() => {
          this.isChart = false
        })
        return [income, consumption]
      }
    },
    balance() {
      return this.series[0] - this.series[1]
    },
  },
  watch: {
    currentMonth() {
      this.renderChart = false
      this.$nextTick(() => {
        this.renderChart = true
      })
    },
  },
  methods: {
    showBalanceDetails() {
      this.isHideCharts = !this.isHideCharts
    },
    formatDate(timeStamp) {
      return date.formatDate(timeStamp, 'DD.MM.YYYY')
    },
  },
}
</script>

<style lang="scss" scoped>
.page-wrapper {
  position: relative;
  margin: 0 auto;
  width: 100%;
  max-width: 400px;
  min-width: 250px;
}

.balance-details {
  flex-direction: column;
  justify-content: flex-start;
}

.fixed-bottom-left {
  position: relative;
  min-width: 150px;
  @media (max-width: 370px) {
    min-width: 110px;
  }
  @media (max-width: 290px) {
    min-width: 90px;
  }
}

.fixed-bottom-right {
  position: relative;
  min-width: 150px;
  @media (max-width: 370px) {
    min-width: 110px;
  }
  @media (max-width: 290px) {
    min-width: 90px;
  }
}
.banner-wrapper {
  max-width: 250px;
  width: 100%;
  margin: 0 auto;
}
.q-select {
  max-width: 80px;
  width: 100%;
  margin: 0 auto;
  padding-top: 10px;
}
.balance-details-wrapper {
  max-width: 250px;
  width: 100%;
  margin: 0 auto;
  font-size: 11px;
  word-break: break-all;
}
</style>
