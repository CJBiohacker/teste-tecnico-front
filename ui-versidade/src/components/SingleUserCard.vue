<script>
import { defineComponent } from 'vue';
import { useSnackBarStore } from '@/stores/snackbar';
import userService from '@/services/user.service';

export default defineComponent({
    props: {
      id: {
        type: Number,
        required: true
      },
      firstName: {
        type: String,
        required: true
      },
      lastName: {
        type: String,
        required: true
      },
      email: {
        type: String,
        required: true
      },
      avatarUrl: {
        type: String,
        required: true
      }
    },
    setup() {;
        const deleteCardView = async (id) => {
            const snackStore = useSnackBarStore();
            const response = await userService.deleteUser(id);
            if ([200, 204].includes(response.status) ) {
                snackStore.updateMessage("Usuário deletado !")
            } else {
                snackStore.updateMessage("Houve um erro no processo, tente outra vez.")
            }
        }

        return {
            deleteCardView,
        }
    } 
        
})


</script>

<template>
    <v-card color="indigo" height="420">
        <v-card-item>
          <p class="text-h6">ID: {{ id }}</p>
          <div class="d-flex flex-column justify-space-around align-center">
            <div class="text-center">
              <v-card-title class="text-h4">
                {{ firstName }}
              </v-card-title>
              <v-card-title class="text-h5">
                {{ lastName }}
              </v-card-title>
              <v-card-subtitle>{{ email }}</v-card-subtitle>
            </div>

            <v-avatar class="ma-3" rounded="0" size="160">
              <v-img :src="avatarUrl"></v-img>
            </v-avatar>
          </div>
          <div class="d-flex justify-space-around">
            <v-card-actions>
              <v-btn class="" rounded="lg" variant="flat" color="yellow" @click="goToEditCardView(id)">Editar</v-btn>
            </v-card-actions>
            <v-card-actions>
              <v-btn class="" rounded="lg" variant="flat" color="#f00023" @click="deleteCardView(id)">Excluir</v-btn>
            </v-card-actions>
          </div>
        </v-card-item>
      </v-card>
</template>