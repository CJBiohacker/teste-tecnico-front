import { defineStore } from 'pinia'

export const useThemeStore = defineStore('theme', {
  state: () => ({
    theme: { color: 'light', name: 'Claro' }
  }),
  actions: {
    toggleTheme() {
      this.theme.color = this.theme.color === 'light' ? 'dark' : 'light'
      this.theme.name = this.theme.color === 'light' ? 'Claro' : 'Escuro'
    }
  }
})
