import { defineStore } from 'pinia'
import { reactive } from 'vue'
import { useDisplay } from 'vuetify'

export const useDisplayStore = defineStore('displayValues', {
  state: () => {
    return {
      displayValues: reactive(useDisplay())
    }
  }
})
