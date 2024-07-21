<script>
import { computed } from 'vue';;
import { useDisplayStore } from '@/stores/display';
import { mocks } from '@/helpers/mocks';
import helpers from '@/helpers/helpers';

export default {
  setup() {
    // Substituir os mocks pelo retorno da requisição de Get (List Users) da API
    const { listedUsers } = mocks;
    const users = listedUsers.data;

    const responsiveCols = computed(() => {
      let numCols;
      const { displayValues } = useDisplayStore();
      const { width } = displayValues;

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
        numCols = width >= 960 && width < 1280 ? 6 : 4;
      }

      return numCols;
    });

    return {
      responsiveCols,
      users
    };
  },
};

</script>

<template>
  <v-container>
    <v-row class="d-flex justify-center">
      <v-col v-for="item in users" :key="item.id" :cols=responsiveCols>
        <v-card color="indigo" height="400">
          <v-card-item>
            {{ item.id }}
            <div class="d-flex flex-column justify-space-around align-center">
              <div class="text-center">
                <v-card-title class="text-h5">
                  {{ item.first_name }}
                </v-card-title>
                <v-card-title class="text-h5">
                  {{ item.last_name }}
                </v-card-title>
                <v-card-subtitle>{{ item.email }}</v-card-subtitle>
              </div>

              <v-avatar class="ma-3" rounded="0" size="160">
                <v-img :src="item.avatar"></v-img>
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