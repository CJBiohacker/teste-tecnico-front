import { defineStore } from 'pinia'
import axios from 'axios'

const API_BASE_URL = import.meta.env.VITE_API_URL

export const useUserStore = defineStore('user', {
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
    async listUsers() {
      try {
        const urlOne = `${API_BASE_URL}/users?page=1`
        const responseOne = await axios.get(urlOne)
        const urlTwo = `${API_BASE_URL}/users?page=2`
        const responseTwo = await axios.get(urlTwo)

        const response = {
          data: [...responseOne.data.data, ...responseTwo.data.data],
          page: responseOne.data.page,
          per_page: responseOne.data.per_page,
          total: responseOne.data.total,
          total_pages: responseOne.data.total_pages
        }
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
        const response =await axios.delete(url)
        return response
      } catch (error) {
        return error
      }
    }
  }
})
