import { defineStore } from 'pinia'
import axios from 'axios'

const API_BASE_URL = import.meta.env.VITE_API_URL

export const useResourceStore = defineStore('resource', {
  state: () => ({
    resource: null,
    resourceListData: null
  }),
  actions: {
    async getResourceById(resourceId) {
      try {
        const url = `${API_BASE_URL}/unknown/${resourceId}`
        const response = await axios.get(url)
        this.resource = response.data
        return response
      } catch (error) {
        return error
      }
    },
    async listResources() {
      try {
        const urlOne = `${API_BASE_URL}/unknown?page=1`
        const responseOne = await axios.get(urlOne)
        const urlTwo = `${API_BASE_URL}/unknown?page=2`
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
    async addResource(resourceData) {
      try {
        const url = `${API_BASE_URL}/unknown`
        const response = await axios.post(url, resourceData)
        return response
      } catch (error) {
        return error
      }
    },
    async editResource(resourceData) {
      try {
        let response
        const resource = {
          name: resourceData.name ?? null,
          job: resourceData.job ?? null
        }
        const url = `${API_BASE_URL}/unknown/${resourceData.id}`

        if (resource.name === null || resource.job === null) response = await axios.patch(url, resource)
        else response = await axios.put(url, resource)
        return response
      } catch (error) {
        return error
      }
    },
    async deleteResource(resourceId) {
      try {
        const url = `${API_BASE_URL}/unknown/${resourceId}`
        const response = await axios.delete(url)
        return response
      } catch (error) {
        return error
      }
    }
  }
})
