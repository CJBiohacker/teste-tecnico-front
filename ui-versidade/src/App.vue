<script setup>
import { RouterView } from 'vue-router'
import HeaderComponent from '@/components/HeaderComponent.vue'
import { useThemeStore } from '@/stores/theme';
import { useSnackBarStore } from './stores/snackbar';
import { computed } from 'vue';

const { theme } = useThemeStore();
const snackBar = useSnackBarStore();

const footerColor = computed(() => theme.color === 'light' ? 'green-accent-2' : 'black');
</script>

<template>
  <v-app :theme="theme.color" id="inspire">
    <HeaderComponent />
    <v-main>
      <RouterView />
      <v-snackbar :timeout="2500" v-model="snackBar.snackStatus" color="deep-purple-accent-4" elevation="24">
        {{ snackBar.message }}
      </v-snackbar>
    </v-main>
    <v-footer :class="`d-flex justify-center`" :color="footerColor">Criado por CJ Dev - {{ new Date().getFullYear()
      }}</v-footer>
  </v-app>
</template>

<style scoped lang="scss">
#inspire {
  footer {
    max-height: 50px;
  }
}
</style>