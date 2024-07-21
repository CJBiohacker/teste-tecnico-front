<script>
import { defineComponent, computed } from 'vue';
import { useThemeStore } from '@/stores/theme';

export default defineComponent({
  setup() {
    const themeStore = useThemeStore();

    const themeName = computed(() => themeStore.theme.name);
    const appBarColor = computed(() => themeStore.theme.name === 'Claro' ? 'primary' : '');

    return {
      theme: themeStore.theme.color,
      name: themeName,
      toggleTheme: themeStore.toggleTheme,
      appBarColor
    };
  },
});
</script>

<template>
  <v-app-bar scroll-behavior="elevate" :color="appBarColor">
    <v-app-bar-title>UI-Versidade</v-app-bar-title>
    <v-switch :label="`${name}`" false-value="yes" true-value="no" hide-details color="primary"
      @click="toggleTheme"></v-switch>
  </v-app-bar>
</template>