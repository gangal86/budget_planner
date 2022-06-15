<template>
  <q-dialog v-model="isAddСonsumptionDialog">
    <q-card>
      <q-card-section class="q-pb-none">
        <div class="text-h6 q-px-sm">Новый расход</div>
      </q-card-section>
      <q-card-section>
        <div class="q-px-sm">
          <q-form class="q-gutter-md" @submit="addConsumption" @reset="resetForm">
            <q-input
              outlined
              v-model="consumptionValue"
              label="Расход"
              lazy-rules
              type="number"
              :rules="[(val) => (val && val.length > 0) || 'Введите расход']"
            />

            <q-select
              outlined
              v-model="consumptionCategory"
              :options="consumptionCategoriesAll"
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
  name: 'AddConsumptionDialog',
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
      consumptionValue: '',
      consumptionCategory: 'Здоровье',
    }
  },
  computed: {
    ...mapGetters({
      consumptionCategoriesAll: 'storeBudgetPlan/getСonsumptionCategories',
    }),
    isAddСonsumptionDialog: {
      get() {
        return this.modelValue
      },
      set(val) {
        this.$emit('update:modelValue', val)
      },
    },
  },
  methods: {
    ...mapActions('storeBudgetPlan', ['addСonsumptionAction']),
    addConsumption() {
      this.addСonsumptionAction({
        id: uid(),
        consumptionValue: parseFloat(this.consumptionValue),
        consumptionCategory: this.consumptionCategory,
        date: new Date().getTime(),
      })
      this.$emit('update:renderChart', false)
      this.$nextTick(() => {
        this.$emit('update:renderChart', true)
      })
      this.resetForm()
    },
    resetForm() {
      this.consumptionValue = ''
      this.isAddСonsumptionDialog = false
    },
  },
}
</script>
