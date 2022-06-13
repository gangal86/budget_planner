<template>
  <q-dialog v-model="isAddIncomeDialog">
    <q-card>
      <q-card-section class="q-pb-none">
        <div class="text-h6 q-px-sm">Новый доход</div>
      </q-card-section>
      <q-card-section>
        <div class="q-px-sm">
          <q-form class="q-gutter-md" @submit="addIncome" @reset="resetForm">
            <q-input
              outlined
              v-model="incomeValue"
              label="Доход"
              lazy-rules
              type="number"
              :rules="[(val) => (val && val.length > 0) || 'Введите доход']"
            />

            <q-select
              outlined
              v-model="incomeCategory"
              :options="incomeCategoriesAll"
              label="Категория"
              :rules="[(val) => (val && val.length > 0) || 'Введите категорию']"
            />
            <div>
              <q-btn label="Ok" color="primary" type="submit" />
              <q-btn label="Отмена" color="primary" flat class="q-ml-sm" type="reset" />
            </div>
          </q-form>
        </div>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import { uid } from 'quasar'
export default {
  name: 'AddIncomeDialog',
  props: {
    renderChart: {
      type: Boolean,
      default: true,
    },
    modelValue: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      incomeValue: '',
      incomeCategory: 'Зарплата',
    }
  },
  computed: {
    ...mapGetters({
      incomeCategoriesAll: 'storeBudgetPlan/getIncomeCategories',
    }),
    isAddIncomeDialog: {
      get() {
        return this.modelValue
      },
      set(val) {
        this.$emit('update:modelValue', val)
      },
    },
  },
  methods: {
    ...mapActions('storeBudgetPlan', ['addIncomeAction']),
    addIncome() {
      this.addIncomeAction({
        id: uid(),
        incomeValue: parseFloat(this.incomeValue),
        incomeCategory: this.incomeCategory,
        date: new Date().getTime(),
      })
      this.$emit('update:renderChart', false)
      this.$nextTick(() => {
        this.$emit('update:renderChart', true)
      })
      this.resetForm()
    },
    resetForm() {
      this.incomeValue = ''
      this.isAddIncomeDialog = false
    },
  },
}
</script>
