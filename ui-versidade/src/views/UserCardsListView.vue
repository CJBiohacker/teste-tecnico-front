<script>
import { defineComponent, ref, reactive, computed } from 'vue';;
import { useDisplayStore } from '@/stores/display';
import SingleUserCard from '@/components/SingleUserCard.vue';
import userService from '@/services/user.service';
import helpers from '@/helpers/helpers';

export default defineComponent({
  components: {
    SingleUserCard
  },
  props: {
    
  },
  async setup() {
    const { displayValues } = useDisplayStore();
    const search = ref('');
    const isLoading = reactive({ value: false })

    const responsiveCols = computed(() => {
      let numCols;

      const responsiveColValues = {
        xxl: 2,
        xl: 3,
        lg: 4,
        md: 6,
        sm: 10,
        xs: 12,
      };

      const trueKeys = helpers.getTrueKeys(displayValues);
      numCols = trueKeys.map(key => responsiveColValues[key]).join('');

      if (trueKeys.join('') === 'md') {
        numCols = displayValues.width >= 960 && displayValues.width < 1280 ? 6 : 4;
      }

      return numCols;
    });

    const responsiveSearchBar = computed(() => {
      if (displayValues.width <= 428) return 'max-width: 100%'
      return 'max-width: 40%'
    })

    const listUsers = async () => {
      isLoading.value = !isLoading.value
      const response = await userService.listUsers();
      isLoading.value = !isLoading.value

      return response;
    }

    const listedUsers = await listUsers();

    return {
      responsiveCols,
      responsiveSearchBar,
      listedUsers,
      search,
      isLoading,
    };
  },
}
);

</script>
<template>
  <v-card>
    <v-data-iterator :items="listedUsers.data" :items-per-page="listedUsers.per_page" :search="search"
      :loading="isLoading.value">

      <template v-slot:header>
        <v-toolbar class="px-2">
          <v-text-field v-model="search" density="comfortable" placeholder="Search" prepend-inner-icon="mdi-magnify"
            :style="responsiveSearchBar" variant="solo" clearable hide-details></v-text-field>
        </v-toolbar>
      </template>

      <template v-slot:default={items}>
        <v-container class="pa-2">
          <v-row dense class="justify-center align-center">
            <v-col v-for="item in items" :key="item.id" :cols=responsiveCols md="4">
               <SingleUserCard 
                :id="item.raw.id"
                :firstName="item.raw.first_name"
                :lastName="item.raw.last_name"
                :email="item.raw.email"
                :avatarUrl="item.raw.avatar"
               />
            </v-col>
          </v-row>
        </v-container>
      </template>

      <template v-slot:footer="{ page, pageCount, prevPage, nextPage }">
        <div class="d-flex align-center justify-center pa-4">
          <v-btn :disabled="page === 1" density="comfortable" text="Anterior" variant="tonal" rounded
            @click="prevPage"></v-btn>

          <div class="mx-3 text-h6">
            Página {{ page }} de {{ pageCount }}
          </div>

          <v-btn :disabled="page >= pageCount" density="comfortable" text="Próxima" variant="tonal" rounded
            @click="nextPage"></v-btn>
        </div>
      </template>
    </v-data-iterator>
  </v-card>
</template>

<style lang="scss" scoped>
::v-deep .v-data-iterator {
  .v-toolbar {
    .v-toolbar__content {
      justify-content: center;

    }
  }
}
</style>