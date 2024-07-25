<script>
import { defineComponent, computed, reactive } from 'vue';
import { useThemeStore } from '@/stores/theme';
import { useRoute, useRouter } from 'vue-router';

export default defineComponent({
  setup() {
    const route = useRoute();
    const router = useRouter();
    const themeStore = useThemeStore();

    const condition = reactive(() => [undefined, false, null, 'home'].includes(route.name));

    const themeName = computed(() => themeStore.theme.name);
    const appBarColor = computed(() => themeStore.theme.name === 'Claro' ? 'primary' : '');
    return {
      route,
      router,
      condition,
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
    <v-btn v-if="!condition()" @click="router.back()">
      Voltar
    </v-btn>
    <v-app-bar-title class="text-center">UI-Versidade</v-app-bar-title>
    <v-switch :label="`${name}`" false-value="yes" true-value="no" hide-details color="primary"
      @click="toggleTheme"></v-switch>
  </v-app-bar>
</template>