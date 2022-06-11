const state = () => ({
  currency: '$',
  incomeCategories: [
    { id: 'ID1', title: 'Зарплата' },
    { id: 'ID2', title: 'Депозит' },
    { id: 'ID3', title: 'Сбережения' },
  ],
  consumptionCategories: [
    { id: 'ID1', title: 'Здоровье' },
    { id: 'ID2', title: 'Кафе' },
    { id: 'ID3', title: 'Жилье' },
  ],
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

const mutations = {
  addIncomeMutation(state, payload) {
    state.budgetPlan.push(payload)
  },
  addСonsumptionMutation(state, payload) {
    state.budgetPlan.push(payload)
  },
  addIncomeCategoryMutation(state, payload) {
    state.incomeCategories.push(payload)
  },
  addConsumptionCategoryMutation(state, payload) {
    state.consumptionCategories.push(payload)
  },
  addCurrencyMutation(state, payload) {
    state.currency = payload
  }
}

const actions = {
  addIncomeAction({ commit }, payload) {
    commit('addIncomeMutation', payload)
  },
  addСonsumptionAction({ commit }, payload) {
    commit('addСonsumptionMutation', payload)
  },
  addIncomeCategoryAction({ commit }, payload) {
    commit('addIncomeCategoryMutation', payload)
  },
  addConsumptionCategoryAction({ commit }, payload) {
    commit('addConsumptionCategoryMutation', payload)
  },
  addCurrencyAction({ commit }, payload) {
    commit('addCurrencyMutation', payload)
  }
}

const getters = {
  getIncomeSum: (state) => (monthNum) => {
    return state.budgetPlan
      .filter((item) => new Date(item.date).getMonth() === monthNum && item.incomeValue !== undefined)
      .reduce((sum, item) => sum + item.incomeValue, 0)
  },
  getConsumptionSum: (state) => (monthNum) => {
    return state.budgetPlan
      .filter((item) => new Date(item.date).getMonth() === monthNum && item.consumptionValue !== undefined)
      .reduce((sum, item) => sum + item.consumptionValue, 0)
  },
  getIncomeCategories(state) {
    return state.incomeCategories
  },
  getСonsumptionCategories(state) {
    return state.consumptionCategories
  },
  getCurrency(state) {
    return state.currency
  },
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
}
