const state = () => ({
  budgetPlan: [
    {
      id: 'ID1',
      incomeValue: 60,
      incomeCategory: 'Зарплата',
      date: 1651856663000,
    },
    {
      id: 'ID2',
      incomeValue: 220,
      incomeCategory: 'Депозит',
      date: 1652029463000,
    },
    {
      id: 'ID3',
      consumptionValue: 40,
      consumptionCategory: 'Кафе',
      date: 1651943063000,
    },
    {
      id: 'ID4',
      consumptionValue: 80,
      consumptionCategory: 'Здоровье',
      date: 1652115863000,
    },
    {
      id: 'ID5',
      incomeValue: 90,
      incomeCategory: 'Зарплата',
      date: 1654794263000,
    },
    {
      id: 'ID6',
      incomeValue: 450,
      incomeCategory: 'Депозит',
      date: 1654880663000,
    },
    {
      id: 'ID7',
      consumptionValue: 124,
      consumptionCategory: 'Кафе',
      date: 1654967063000,
    },
    {
      id: 'ID8',
      consumptionValue: 40,
      consumptionCategory: 'Здоровье',
      date: 1655053463000,
    },
    {
      id: 'ID9',
      consumptionValue: 50,
      consumptionCategory: 'Жилье',
      date: 1654511533424,
    },
    {
      id: 'ID10',
      consumptionValue: 90,
      consumptionCategory: 'Продукты',
      date: 1654511533424,
    },
  ],
})

const mutations = {}

const actions = {}

const getters = {
  getIncomeSum: (state) => (monthNum) => {
    return state.budgetPlan
      .filter((item) => new Date(item.date).getMonth() === monthNum)
      .filter((item) => item.incomeValue !== undefined)
      .reduce((sum, item) => sum + item.incomeValue, 0)
  },
  getConsumptionSum: (state) => (monthNum) => {
    return state.budgetPlan
      .filter((item) => new Date(item.date).getMonth() === monthNum)
      .filter((item) => item.consumptionValue !== undefined)
      .reduce((sum, item) => sum + item.consumptionValue, 0)
  },
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
}
