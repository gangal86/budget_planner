<template>
  <q-page class="flex flex-center page-wrapper">
    <q-select v-model="currentMonth" :options="otherMonths" dense borderless />
    <div v-if="renderChart">
      <apexchart
        v-if="!isChart"
        type="pie"
        width="380"
        :options="chartOptionsFull"
        :series="series"
      />
      <apexchart
        v-if="isChart"
        type="pie"
        width="380"
        :options="chartOptionsEmpty"
        :series="series"
      />
    </div>
    <div class="column">
      <div class="q-mb-md q-mt-md">
        <q-banner rounded class="bg-light-blue-9 text-white text-center banner-wrapper">
          Баланс {{ balance }} грн
        </q-banner>
      </div>
      <div class="row">
        <q-page-sticky position="bottom-right" :offset="[18, 18]">
          <q-btn fab icon="remove" color="pink-13" />
        </q-page-sticky>
        <q-page-sticky position="bottom-left" :offset="[18, 18]">
          <q-btn fab icon="add" color="teal-5" />
        </q-page-sticky>
      </div>
    </div>
  </q-page>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'MainPage',
  data() {
    return {
      renderChart: true,
      isChart: true,
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
        chart: {
          width: 380,
          type: 'pie',
        },
        legend: {
          position: 'bottom',
          markers: {
            fillColors: ['#f50057', '#26a69a'],
          },
        },
        colors: ['#26a69a', '#f50057'],
        labels: ['Расход', 'Доход'],
        dataLabels: {
          formatter: function (val, opts) {
            return opts.w.config.series[opts.seriesIndex] + ' грн'
          },
        },
        responsive: [
          {
            breakpoint: 250,
            options: {
              chart: {
                width: 350,
              },
            },
          },
        ],
      },
      chartOptionsEmpty: {
        chart: {
          width: 380,
          type: 'pie',
        },
        legend: {
          show: false,
        },
        colors: ['#b0bec5', '#90a4ae'],
        responsive: [
          {
            breakpoint: 250,
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
    ...mapGetters('storeBudgetPlan', ['getIncomeSum', 'getConsumptionSum']),
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
  min-width: 300px;
}

.fixed-bottom-left {
  position: relative;
  min-width: 150px;
  @media (max-width: 370px) {
    min-width: 110px;
  }
}

.fixed-bottom-right {
  position: relative;
  min-width: 150px;
  @media (max-width: 370px) {
    min-width: 110px;
  }
}
.banner-wrapper {
  max-width: 200px;
  margin: 0 auto;
  width: 100%;
}
</style>
