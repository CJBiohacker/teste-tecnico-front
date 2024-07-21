<script>
import { computed } from 'vue';;
import helpers from '@/helpers/helpers';
import { useDisplayStore } from '@/stores/display';

export default {
  setup() {
    const responsiveCols = computed(() => {
      let numCols;
      const { displayValues } = useDisplayStore();

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

      console.log("🚀 ~ responsiveCols ~ numCols:", numCols)

      return numCols;
    });

    return {
      responsiveCols,
    };
  },
};

</script>

<template>
  <v-container>
    <v-row class="d-flex justify-center">
      <v-col v-for="n in 24" :key="n" :cols=responsiveCols>
        <v-card color="indigo" height="280">
          <v-card-item>
            <div>
              <div class="text-overline mb-1">
                Olá
              </div>
              <div class="text-h6 mb-1">
                Headline
              </div>
              <div class="text-caption">Greyhound divisely hello coldly fonwderfully</div>
            </div>
          </v-card-item>

          <v-card-actions>
            <v-btn>
              Button
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>


<!-- 
    "id": 7,
    "email": "michael.lawson@reqres.in",
    "first_name": "Michael",
    "last_name": "Lawson",
    "avatar": "https://reqres.in/img/faces/7-image.jpg"
-->