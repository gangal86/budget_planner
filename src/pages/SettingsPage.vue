<template>
  <div class="column q-pa-md">
    <q-card flat bordered>
      <q-card-section class="q-pb-none">
        <div class="text-h6 q-px-sm">Настройки</div>
      </q-card-section>
      <q-card-section>
        <q-card class="q-px-sm q-mb-md" flat bordered>
          <q-card-section class="q-pb-none">
            <div class="q-px-sm">Категории дохода</div>
          </q-card-section>
          <q-card-section class="row q-gutter-sm items-center">
            <div v-for="{ id, title } in getIncomeCategories" :key="id">
              <q-chip color="primary" outline> {{ title }} </q-chip>
            </div>
            <q-btn
              @click="isAddIncomeCategoryDialog = !isAddIncomeCategoryDialog"
              outline
              round
              color="primary"
              icon="add"
            />
          </q-card-section>
        </q-card>
        <q-card class="q-px-sm q-mb-md" flat bordered>
          <q-card-section class="q-pb-none">
            <div class="q-px-sm">Категории расхода</div>
          </q-card-section>
          <q-card-section class="row q-gutter-sm items-center">
            <div v-for="{ id, title } in getСonsumptionCategories" :key="id">
              <q-chip color="primary" outline> {{ title }} </q-chip>
            </div>
            <q-btn
              @click="isAddConsumptionCategoryDialog = !isAddConsumptionCategoryDialog"
              outline
              round
              color="primary"
              icon="add"
            />
          </q-card-section>
        </q-card>
        <q-card class="q-px-sm q-mb-md" flat bordered>
          <q-card-section class="row q-gutter-sm items-center">
            <q-input v-model="currency" color="primary" outline label="Валюта" />
          </q-card-section>
        </q-card>
      </q-card-section>
    </q-card>
  </div>
  <q-dialog v-model="isAddIncomeCategoryDialog">
    <q-card>
      <q-card-section class="q-pb-none">
        <div class="text-h6 q-px-sm">Категория дохода</div>
      </q-card-section>
      <q-card-section>
        <div class="q-px-sm">
          <q-form
            class="q-gutter-md"
            @submit="addIncomeCategory"
            @reset="resetFormIncomeCategory"
          >
            <q-input
              outlined
              v-model="incomeCategory"
              lazy-rules
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
  <q-dialog v-model="isAddConsumptionCategoryDialog">
    <q-card>
      <q-card-section class="q-pb-none">
        <div class="text-h6 q-px-sm">Категория расхода</div>
      </q-card-section>
      <q-card-section>
        <div class="q-px-sm">
          <q-form
            class="q-gutter-md"
            @submit="addConsumptionCategory"
            @reset="resetFormConsumptionCategory"
          >
            <q-input
              outlined
              v-model="сonsumptionCategory"
              lazy-rules
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
import { mapGetters } from 'vuex'
import { uid } from 'quasar'
export default {
  name: 'SettingsPage',
  data() {
    return {
      incomeCategory: '',
      сonsumptionCategory: '',
      isAddIncomeCategoryDialog: false,
      isAddConsumptionCategoryDialog: false,
    }
  },
  computed: {
    ...mapGetters('storeBudgetPlan', [
      'getIncomeCategories',
      'getСonsumptionCategories',
      'getCurrency',
    ]),
    currency: {
      get() {
        return this.getCurrency
      },
      set(val) {
        this.$store.dispatch('storeBudgetPlan/addCurrencyAction', val)
      },
    },
  },
  methods: {
    addIncomeCategory() {
      this.$store.dispatch('storeBudgetPlan/addIncomeCategoryAction', {
        id: uid(),
        title: this.incomeCategory,
      })
      this.resetFormIncomeCategory()
    },
    resetFormIncomeCategory() {
      this.incomeCategory = ''
      this.isAddIncomeCategoryDialog = false
    },
    addConsumptionCategory() {
      this.$store.dispatch('storeBudgetPlan/addConsumptionCategoryAction', {
        id: uid(),
        title: this.сonsumptionCategory,
      })
      this.resetFormConsumptionCategory()
    },
    resetFormConsumptionCategory() {
      this.сonsumptionCategory = ''
      this.isAddConsumptionCategoryDialog = false
    },
  },
}
</script>
