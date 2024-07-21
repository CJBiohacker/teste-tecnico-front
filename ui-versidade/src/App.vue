<script setup>
import { RouterView } from 'vue-router'
import HeaderComponent from '@/components/HeaderComponent.vue'
import { useThemeStore } from '@/stores/theme';

const { theme } = useThemeStore();
</script>

<template>
  <v-app :theme="theme.color" id="inspire">
    <HeaderComponent />
    <v-main>
      <RouterView />
    </v-main>
    <v-footer class="d-flex justify-center">Made by CJ</v-footer>
  </v-app>
</template>

<style scoped lang="scss">
#inspire {
  footer {
    max-height: 50px;
  }
}
</style>