<script setup>
import { RouterView } from 'vue-router'
import HeaderComponent from '@/components/HeaderComponent.vue'
import { useThemeStore } from '@/stores/theme';

const { theme } = useThemeStore();

</script>

<template>
  <v-app :theme="theme.color" id="inspire">
    <HeaderComponent />
    <main>
      <RouterView />
    </main>
  </v-app>
</template>