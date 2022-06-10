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
            <q-chip color="primary" outline> Зарплата </q-chip>
            <q-chip color="primary" outline> Депозит </q-chip>
            <q-chip color="primary" outline> Сбережения </q-chip>
            <q-btn outline round color="primary" icon="add" />
          </q-card-section>
        </q-card>
        <q-card class="q-px-sm q-mb-md" flat bordered>
          <q-card-section class="q-pb-none">
            <div class="q-px-sm">Категории расхода</div>
          </q-card-section>
          <q-card-section class="row q-gutter-sm items-center">
            <q-chip color="primary" outline> Здоровье </q-chip>
            <q-chip color="primary" outline> Кафе </q-chip>
            <q-chip color="primary" outline> Жилье </q-chip>
            <q-btn outline round color="primary" icon="add" />
          </q-card-section>
        </q-card>
        <q-card class="q-px-sm q-mb-md" flat bordered>
          <q-card-section class="row q-gutter-sm items-center">
            <q-input color="primary" outline label="Валюта" />
            <q-btn outline rounded color="primary" label="Сохранить" />
          </q-card-section>
        </q-card>
      </q-card-section>
    </q-card>
  </div>
</template>

<script>
export default {}
</script>
