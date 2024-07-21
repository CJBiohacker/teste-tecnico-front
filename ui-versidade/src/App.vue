<script setup>
import { RouterView } from 'vue-router'
import HeaderComponent from '@/components/HeaderComponent.vue'
import { useThemeStore } from '@/stores/theme';
import { computed } from 'vue';

const { theme } = useThemeStore();
const footerColor = computed(() => theme.color === 'light' ? 'green-accent-2' : 'black');
</script>

<template>
  <v-app :theme="theme.color" id="inspire">
    <HeaderComponent />
    <v-main>
      <RouterView />
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