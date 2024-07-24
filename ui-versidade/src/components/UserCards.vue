<script>
import { computed, ref } from 'vue';;
import { useDisplayStore } from '@/stores/display';
import { mocks } from '@/helpers/mocks';
import helpers from '@/helpers/helpers';

export default {
  setup() {
    // Substituir os mocks pelo retorno da requisição de Get (List Users) da API
    const { listedUsers } = mocks;
    const users = listedUsers.data;
    const search = ref('');
    const { displayValues } = useDisplayStore();

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

    return {
      responsiveCols,
      responsiveSearchBar,
      listedUsers,
      users,
      search
    };
  },
};

</script>
<!-- {
  page: number
  itemsPerPage: number
  pageCount: number
  prevPage: () => void
  nextPage: () => void
  items: DataIteratorItem[]
} -->
<template>
  <v-card>
    <v-data-iterator
      :items="listedUsers.data"
      :items-per-page="listedUsers.per_page"
      :search="search"
    >

      <template v-slot:header>
        <v-toolbar class="px-2">
          <v-text-field
            v-model="search"
            density="comfortable"
            placeholder="Search"
            prepend-inner-icon="mdi-magnify"
            :style="responsiveSearchBar"
            variant="solo"
            clearable
            hide-details
          ></v-text-field>
        </v-toolbar>
      </template>

      <template v-slot:default={items}>
        <v-container class="pa-2">
          <v-row dense class="justify-center align-center" >
            <v-col
              v-for="item in items" :key="item.id" :cols=responsiveCols
              md="4"
            >
            <v-card color="indigo" height="440">
              <v-card-item>
                <p class="text-h6">ID: {{ item.raw.id }}</p>
                <div class="d-flex flex-column justify-space-around align-center">
                  <div class="text-center">
                    <v-card-title class="text-h4">
                      {{ item.raw.first_name }}
                    </v-card-title>
                    <v-card-title class="text-h5">
                      {{ item.raw.last_name }}
                    </v-card-title>
                    <v-card-subtitle>{{ item.raw.email }}</v-card-subtitle>
                  </div>
    
                  <v-avatar class="ma-3" rounded="0" size="160">
                    <v-img :src="item.raw.avatar"></v-img>
                  </v-avatar>
                </div>
              </v-card-item>
              <div class="d-flex justify-space-around">
                <v-card-actions>
                  <v-btn class="" rounded="lg" variant="flat" color="yellow">Editar</v-btn>
                </v-card-actions>
                <v-card-actions>
                  <v-btn class="" rounded="lg" variant="flat" color="#f00023">Excluir</v-btn>
                </v-card-actions>
              </div>
            </v-card>
            </v-col>
          </v-row>
        </v-container>
      </template>

      <template v-slot:footer="{ page , pageCount, prevPage, nextPage }">
        <div class="d-flex align-center justify-center pa-4">
          <v-btn
            :disabled="page === 1"
            density="comfortable"
            icon="mdi-arrow-left"
            variant="tonal"
            rounded
            @click="prevPage"
          ></v-btn>

          <div class="mx-2 text-caption">
            Page {{ page }} of {{ pageCount }}
          </div>

          <v-btn
            :disabled="page >= pageCount"
            density="comfortable"
            icon="mdi-arrow-right"
            variant="tonal"
            rounded
            @click="nextPage"
          ></v-btn>
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