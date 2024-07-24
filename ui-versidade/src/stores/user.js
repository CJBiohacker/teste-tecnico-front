import { defineStore } from 'pinia'
import axios from 'axios'

const API_BASE_URL = import.meta.env.VITE_API_URL

export const useUserStore = defineStore('auth', {
  state: () => ({
    user: null,
    userListData: null
  }),
  actions: {
    async getUserById(userId) {
      try {
        const url = `${API_BASE_URL}/users/${userId}`
        const response = await axios.get(url)
        this.user = response.data
        return response
      } catch (error) {
        return error
      }
    },
    async listUsers(pageNumber) {
      try {
        const url = `${API_BASE_URL}/users?page=${pageNumber}`
        const response = await axios.get(url)
        this.userListData = response.data
        return response
      } catch (error) {
        return error
      }
    },
    async addUser(userData) {
      try {
        const url = `${API_BASE_URL}/users`
        const response = await axios.post(url, userData)
        return response
      } catch (error) {
        return error
      }
    },
    async editUser(userData) {
      try {
        let response
        const user = {
          name: userData.name ?? null,
          job: userData.job ?? null
        }
        const url = `${API_BASE_URL}/users/${userData.id}`

        if (user.name === null || user.job === null) response = await axios.patch(url, user)
        else response = await axios.put(url, user)
        return response
      } catch (error) {
        return error
      }
    },
    async deleteUser(userId) {
      try {
        const url = `${API_BASE_URL}/users/${userId}`
        await axios.delete(url)
        return response
      } catch (error) {
        return error
      }
    }
  }
})
