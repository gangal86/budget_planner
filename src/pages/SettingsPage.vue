<template>
  <transition appear enter-active-class="animated zoomIn">
    <div class="column q-pa-md card-wrapper">
      <q-card flat bordered>
        <q-card-section class="row items-center q-pb-none">
          <router-link style="text-decoration: none; color: inherit" to="/">
            <q-icon name="arrow_back" size="24px" color="primary" />
          </router-link>
          <div class="text-h6 q-px-sm">Настройки</div>
        </q-card-section>
        <q-card-section>
          <q-card class="q-px-sm q-mb-md" flat bordered>
            <q-card-section class="q-pb-none">
              <div class="q-px-sm">Категории дохода</div>
            </q-card-section>
            <q-card-section class="row q-gutter-sm items-center">
              <div v-for="{ id, title } in getIncomeCategoriesSettings" :key="id">
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
              <div v-for="{ id, title } in getСonsumptionCategoriesSettings" :key="id">
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
            <q-card-section class="row q-gutter-sm items-center q-pb-sm">
              <q-input v-model="currency" color="primary" outline label="Валюта" />
            </q-card-section>
            <q-card-section>
              <q-btn
                @click="deleteData"
                class="q-my-sm"
                color="red"
                label="удалить данные"
                rounded
              />
            </q-card-section>
          </q-card>
        </q-card-section>
      </q-card>
    </div>
  </transition>
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
      'getIncomeCategoriesSettings',
      'getСonsumptionCategoriesSettings',
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
    deleteData() {
      this.$q
        .dialog({
          title: 'Удалить данные',
          message: 'Это действие необратимо',
          cancel: {
            flat: true,
            label: 'отмена',
          },
          persistent: true,
        })
        .onOk(() => {
          this.$store.dispatch('storeBudgetPlan/deleteDataAction')
        })
    },
  },
}
</script>

<style lang="scss" scoped>
.card-wrapper {
  width: 100%;
  max-width: 400px;
  min-width: 250px;
  margin: 0 auto;
}
</style>
