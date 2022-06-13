import { LocalStorage } from 'quasar'

const currencyDefault = '$'

const state = () => ({
  //currency: '$',
  currency: LocalStorage.has('currency') ? LocalStorage.getItem('currency') : currencyDefault,
  // incomeCategories: [
  //   { id: 'ID1', title: 'Зарплата', default: true },
  //   { id: 'ID2', title: 'Депозиты', default: true },
  //   { id: 'ID3', title: 'Сбережения', default: true },
  // ],
  incomeCategories: LocalStorage.has('incomeCategories')
    ? LocalStorage.getItem('incomeCategories')
    : [
        { id: 'ID1', title: 'Зарплата', default: true },
        { id: 'ID2', title: 'Депозиты', default: true },
        { id: 'ID3', title: 'Сбережения', default: true },
      ],
  // consumptionCategories: [
  //   { id: 'ID1', title: 'Гигиена', default: true },
  //   { id: 'ID2', title: 'Еда', default: true },
  //   { id: 'ID3', title: 'Жилье', default: true },
  //   { id: 'ID4', title: 'Здоровье', default: true },
  //   { id: 'ID5', title: 'Кафе', default: true },
  //   { id: 'ID6', title: 'Машина', default: true },
  //   { id: 'ID7', title: 'Одежда', default: true },
  //   { id: 'ID8', title: 'Питомцы', default: true },
  //   { id: 'ID9', title: 'Подарки', default: true },
  //   { id: 'ID10', title: 'Развлечения', default: true },
  //   { id: 'ID11', title: 'Связь', default: true },
  //   { id: 'ID12', title: 'Спорт', default: true },
  //   { id: 'ID13', title: 'Счета', default: true },
  //   { id: 'ID14', title: 'Такси', default: true },
  //   { id: 'ID15', title: 'Транспорт', default: true },
  // ],
  consumptionCategories: LocalStorage.has('consumptionCategories')
    ? LocalStorage.getItem('consumptionCategories')
    : [
        { id: 'ID1', title: 'Гигиена', default: true },
        { id: 'ID2', title: 'Еда', default: true },
        { id: 'ID3', title: 'Жилье', default: true },
        { id: 'ID4', title: 'Здоровье', default: true },
        { id: 'ID5', title: 'Кафе', default: true },
        { id: 'ID6', title: 'Машина', default: true },
        { id: 'ID7', title: 'Одежда', default: true },
        { id: 'ID8', title: 'Питомцы', default: true },
        { id: 'ID9', title: 'Подарки', default: true },
        { id: 'ID10', title: 'Развлечения', default: true },
        { id: 'ID11', title: 'Связь', default: true },
        { id: 'ID12', title: 'Спорт', default: true },
        { id: 'ID13', title: 'Счета', default: true },
        { id: 'ID14', title: 'Такси', default: true },
        { id: 'ID15', title: 'Транспорт', default: true },
      ],
  // budgetPlan: [
  //   {
  //     id: 'ID1',
  //     incomeValue: 60,
  //     incomeCategory: 'Зарплата',
  //     date: 1651856663000,
  //   },
  //   {
  //     id: 'ID2',
  //     incomeValue: 220,
  //     incomeCategory: 'Депозит',
  //     date: 1652029463000,
  //   },
  //   {
  //     id: 'ID3',
  //     consumptionValue: 40,
  //     consumptionCategory: 'Кафе',
  //     date: 1651943063000,
  //   },
  //   {
  //     id: 'ID4',
  //     consumptionValue: 80,
  //     consumptionCategory: 'Здоровье',
  //     date: 1652115863000,
  //   },
  //   {
  //     id: 'ID5',
  //     incomeValue: 90,
  //     incomeCategory: 'Зарплата',
  //     date: 1654794263000,
  //   },
  //   {
  //     id: 'ID6',
  //     incomeValue: 450,
  //     incomeCategory: 'Депозит',
  //     date: 1654880663000,
  //   },
  //   {
  //     id: 'ID7',
  //     consumptionValue: 124,
  //     consumptionCategory: 'Кафе',
  //     date: 1654967063000,
  //   },
  //   {
  //     id: 'ID8',
  //     consumptionValue: 40,
  //     consumptionCategory: 'Здоровье',
  //     date: 1655053463000,
  //   },
  //   {
  //     id: 'ID9',
  //     consumptionValue: 50,
  //     consumptionCategory: 'Жилье',
  //     date: 1654511533424,
  //   },
  //   {
  //     id: 'ID10',
  //     consumptionValue: 90,
  //     consumptionCategory: 'Продукты',
  //     date: 1654511533424,
  //   },
  // ],
  budgetPlan: LocalStorage.has('budgetPlan') ? LocalStorage.getItem('budgetPlan') : [],
})

const mutations = {
  addIncomeMutation(state, payload) {
    state.budgetPlan.push(payload)
    LocalStorage.set('budgetPlan', state.budgetPlan)
  },
  addСonsumptionMutation(state, payload) {
    state.budgetPlan.push(payload)
    LocalStorage.set('budgetPlan', state.budgetPlan)
  },
  addIncomeCategoryMutation(state, payload) {
    state.incomeCategories.push(payload)
    LocalStorage.set('incomeCategories', state.incomeCategories)
  },
  addConsumptionCategoryMutation(state, payload) {
    state.consumptionCategories.push(payload)
    LocalStorage.set('consumptionCategories', state.consumptionCategories)
  },
  addCurrencyMutation(state, payload) {
    state.currency = payload
    LocalStorage.set('currency', state.currency)
  },
  deleteDataMutation(state) {
    state.budgetPlan = []
    state.currency = currencyDefault
    state.incomeCategories = state.incomeCategories.filter((item) => item.default === true)
    state.consumptionCategories = state.consumptionCategories.filter((item) => item.default === true)
    LocalStorage.set('budgetPlan', state.budgetPlan)
    LocalStorage.set('currency', state.currency)
    LocalStorage.set('incomeCategories', state.incomeCategories)
    LocalStorage.set('consumptionCategories', state.consumptionCategories)
  },
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
  },
  deleteDataAction({ commit }) {
    commit('deleteDataMutation')
  },
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
    return state.incomeCategories.map((item) => item.title)
  },
  getСonsumptionCategories(state) {
    return state.consumptionCategories.map((item) => item.title)
  },
  getIncomeCategoriesSettings(state) {
    return state.incomeCategories
  },
  getСonsumptionCategoriesSettings(state) {
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
