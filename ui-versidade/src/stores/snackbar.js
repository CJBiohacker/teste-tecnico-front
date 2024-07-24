import { defineStore } from 'pinia'

export const useSnackBarStore = defineStore('snackBar', {
  state: () => ({
    message: '',
    snackStatus: false
  }),
  actions: {
    updateMessage(text) {
        this.message = text;
        this.snackStatus = !this.snackStatus;
    },
  }
})
