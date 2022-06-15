<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-toolbar-title> Budget Planner </q-toolbar-title>
        <q-btn flat round dense icon="more_vert">
          <q-menu auto-close>
            <q-list class="menu-options" dense>
              <q-item to="/settings" dense clickable>
                <q-item-section class="text-caption text-weight-bold text-primary">
                  Настройки
                </q-item-section>
              </q-item>
              <q-item @click="isAboutProgram = !isAboutProgram" dense clickable>
                <q-item-section class="text-caption text-weight-bold text-primary">
                  О программе
                </q-item-section>
              </q-item>
            </q-list>
          </q-menu>
        </q-btn>
      </q-toolbar>
    </q-header>
    <q-page-container>
      <router-view />
    </q-page-container>
    <AboutProgramDialog v-model="isAboutProgram" />
  </q-layout>
</template>

<script>
import AboutProgramDialog from '../components/AboutProgramDialog.vue'
export default {
  name: 'MainLayout',
  components: {
    AboutProgramDialog,
  },
  data() {
    return {
      isAboutProgram: false,
    }
  },
}
</script>

<style lang="scss" scoped>
.menu-options {
  min-width: 140px;
}
</style>
