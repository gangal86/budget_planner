<template>
  <q-page class="flex flex-center page-wrapper">
    <apexchart type="pie" width="380" :options="chartOptions" :series="series" />
    <div class="column">
      <div class="q-mb-md q-mt-md">
        <q-banner rounded class="bg-light-blue-9 text-white text-center banner-wrapper">
          Баланс 60 грн
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
export default {
  name: 'MainPage',
  data() {
    return {
      series: [60, 40],
      chartOptions: {
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
            return val + ' грн'
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
    }
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
