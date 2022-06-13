<template>
  <q-page class="flex flex-center page-wrapper">
    <q-select v-model="currentMonth" :options="otherMonths" dense borderless />
    <div v-if="renderChart">
      <apexchart
        v-if="!isChart"
        type="pie"
        width="400"
        :options="chartOptionsFull"
        :series="series"
      />
      <apexchart
        v-if="isChart"
        type="pie"
        width="370"
        :options="chartOptionsEmpty"
        :series="series"
      />
    </div>
    <div class="column">
      <div class="q-mb-md q-mt-md">
        <q-banner rounded class="bg-yellow-10 text-white text-center banner-wrapper">
          Баланс {{ balance }} {{ getCurrency }}
        </q-banner>
      </div>
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
</template>

<script>
import { mapGetters } from 'vuex'
import AddIncomeDialog from '../components/AddIncomeDialog'
import AddConsumptionDialog from '../components/AddConsumptionDialog'

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
    ]),
    series() {
      let monthNum = 0
      switch (this.currentMonth) {
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
  max-width: 200px;
  margin: 0 auto;
  width: 100%;
}
</style>
