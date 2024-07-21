<script>
import { defineComponent, computed } from 'vue';
import { useThemeStore } from '@/stores/theme';

export default defineComponent({
  setup() {
    const themeStore = useThemeStore();

    const themeName = computed(() => themeStore.theme.name);

    return {
      theme: themeStore.theme.color,
      name: themeName,
      toggleTheme: themeStore.toggleTheme,
    };
  },
});
</script>

<template>
  <v-app-bar scroll-behavior="elevate" extended class="">
    <v-app-bar-nav-icon></v-app-bar-nav-icon>
    <v-app-bar-title>UI-Versidade</v-app-bar-title>
    <v-btn :prepend-icon="theme === 'light' ? 'mdi-weather-sunny' : 'mdi-weather-night'" :text="name" slim
      @click="toggleTheme">{{ name }}</v-btn>
  </v-app-bar>
</template>

<!-- Lembrar de ajustar a config dos ícones mdi do vuetify -->