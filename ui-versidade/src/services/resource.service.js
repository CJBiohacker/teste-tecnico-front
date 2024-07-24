import { useResourceStore } from '@/stores/resource'

const resourceService = {
  async getResourceById(userId) {
    const resourceStore = useResourceStore()
    return resourceStore.getResourceById(userId)
  },
  async listResources() {
    const resourceStore = useResourceStore()
    return resourceStore.listResources()
  },
  async addResource(userData) {
    const resourceStore = useResourceStore()
    return resourceStore.addResource(userData)
  },
  async editResource(userData) {
    const resourceStore = useResourceStore()
    return resourceStore.editResource(userData)
  },
  async deleteResource(userId) {
    const resourceStore = useResourceStore()
    return resourceStore.deleteResource(userId)
  }
}

export default resourceService
